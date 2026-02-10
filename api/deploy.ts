import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  getTemplatePackageJSON,
  TEMPLATE_VITE_CONFIG,
  TEMPLATE_TSCONFIG,
  TEMPLATE_MAIN_TSX,
  TEMPLATE_VITE_ENV,
  getTemplateIndexHTML,
  getTemplateIndexCSS,
  readTemplateFile,
} from './template-files';

interface DeployRequestBody {
  dataTs: string;
  metadata: {
    handle: string;
    platform: string;
    profileUrl: string;
    category: string;
    productStoreUrl: string;
    campaignPlanUrl: string;
    channelReportUrl: string;
  };
}

interface VercelFile {
  file: string;
  data: string;
}

function sanitizeHandle(handle: string): string {
  return handle
    .replace(/^@/, '')
    .replace(/[^a-zA-Z0-9_-]/g, '-')
    .toLowerCase()
    .slice(0, 50);
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { dataTs, metadata } = req.body as DeployRequestBody;

    if (!dataTs || !metadata) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: dataTs, metadata',
      });
    }

    if (!metadata.handle) {
      return res.status(400).json({
        success: false,
        error: 'Missing required metadata field: handle',
      });
    }

    const deployToken = process.env.VERCEL_DEPLOY_TOKEN;
    if (!deployToken) {
      return res.status(500).json({
        success: false,
        error: 'Server configuration error: Missing VERCEL_DEPLOY_TOKEN',
      });
    }

    const teamId = process.env.VERCEL_TEAM_ID;
    const sanitizedHandle = sanitizeHandle(metadata.handle);
    const projectPrefixes: Record<string, string> = {
      '뷰티': 'celebeauty-report',
      '푸드': 'celebfood-report',
    };
    const prefix = projectPrefixes[metadata.theme] || 'celebfood-report';
    const projectName = `${prefix}-${sanitizedHandle}`;

    // Read template files
    const appTsx = readTemplateFile('App.tsx');
    const typesTsx = readTemplateFile('types.ts');
    const themeTs = readTemplateFile('theme.ts');
    const iconsTsx = readTemplateFile('components/Icons.tsx');
    const logoTsx = readTemplateFile('components/Logo.tsx');

    const files: VercelFile[] = [
      { file: 'index.html', data: getTemplateIndexHTML(metadata.theme) },
      { file: 'package.json', data: getTemplatePackageJSON(metadata.theme) },
      { file: 'vite.config.ts', data: TEMPLATE_VITE_CONFIG },
      { file: 'tsconfig.json', data: TEMPLATE_TSCONFIG },
      { file: 'src/main.tsx', data: TEMPLATE_MAIN_TSX },
      { file: 'src/vite-env.d.ts', data: TEMPLATE_VITE_ENV },
      { file: 'src/index.css', data: getTemplateIndexCSS() },
      { file: 'src/App.tsx', data: appTsx },
      { file: 'src/types.ts', data: typesTsx },
      { file: 'src/theme.ts', data: themeTs },
      { file: 'src/data.ts', data: dataTs },
      { file: 'src/components/Icons.tsx', data: iconsTsx },
      { file: 'src/components/Logo.tsx', data: logoTsx },
    ];

    const deploymentBody: Record<string, unknown> = {
      name: projectName,
      files,
      projectSettings: {
        framework: 'vite',
        buildCommand: 'npm run build',
        outputDirectory: 'dist',
        installCommand: 'npm install',
      },
      target: 'production',
    };

    let deployUrl = 'https://api.vercel.com/v13/deployments';
    if (teamId) {
      deployUrl += `?teamId=${teamId}`;
    }

    const deployResponse = await fetch(deployUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${deployToken}`,
      },
      body: JSON.stringify(deploymentBody),
    });

    const deployResult = await deployResponse.json();

    if (!deployResponse.ok) {
      console.error('Vercel deploy error:', deployResult);
      const errorMsg = deployResult.error?.message || deployResult.message || 'Vercel API error';
      return res.status(deployResponse.status).json({
        success: false,
        error: `배포 실패: ${errorMsg}`,
      });
    }

    const deploymentUrl = deployResult.url
      ? `https://${deployResult.url}`
      : null;

    return res.status(200).json({
      success: true,
      deploymentUrl,
      projectName,
    });
  } catch (error) {
    console.error('Deploy API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return res.status(500).json({
      success: false,
      error: `배포 중 오류 발생: ${errorMessage}`,
    });
  }
}
