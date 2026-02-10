import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  FOOD_EXTRACT_SYSTEM_PROMPT,
  buildFoodExtractPrompt,
} from './food-extract.js';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers
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
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Use POST.'
    });
  }

  try {
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: 'Server configuration error: GOOGLE_AI_API_KEY not set'
      });
    }

    const { reportText, metadata } = req.body;

    if (!reportText || typeof reportText !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Invalid request: reportText is required and must be a string'
      });
    }

    if (!metadata || typeof metadata !== 'object') {
      return res.status(400).json({
        success: false,
        error: 'Invalid request: metadata is required and must be an object'
      });
    }

    const requiredFields = ['handle', 'platform', 'profileUrl', 'category', 'theme', 'productStoreUrl', 'campaignPlanUrl', 'channelReportUrl'];
    for (const field of requiredFields) {
      if (!metadata[field]) {
        return res.status(400).json({
          success: false,
          error: `Invalid request: metadata.${field} is required`
        });
      }
    }

    if (!['instagram', 'youtube'].includes(metadata.platform)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request: metadata.platform must be "instagram" or "youtube"'
      });
    }

    if (!['일반', '뷰티', '푸드'].includes(metadata.category)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request: metadata.category must be "일반", "뷰티", or "푸드"'
      });
    }

    if (!['뷰티', '푸드'].includes(metadata.theme)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request: metadata.theme must be "뷰티" or "푸드"'
      });
    }

    // Initialize Gemini AI with JSON output
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-pro',
      systemInstruction: FOOD_EXTRACT_SYSTEM_PROMPT,
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });

    const prompt = buildFoodExtractPrompt(reportText, metadata);
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Parse JSON response
    let aiData: unknown;
    try {
      aiData = JSON.parse(responseText);
    } catch {
      return res.status(500).json({
        success: false,
        error: 'AI response was not valid JSON'
      });
    }

    // Build externalLinks programmatically with theme-based colors
    const linkColors: Record<string, { primary: string; secondary: string; tertiary: string }> = {
      '뷰티': {
        primary: 'text-purple-600 bg-purple-50 border-purple-200 hover:bg-purple-100',
        secondary: 'text-indigo-600 bg-indigo-50 border-indigo-200 hover:bg-indigo-100',
        tertiary: 'text-purple-600 bg-purple-50 border-purple-200 hover:bg-purple-100',
      },
      '푸드': {
        primary: 'text-olive-600 bg-olive-50 border-olive-200 hover:bg-olive-100',
        secondary: 'text-emerald-600 bg-emerald-50 border-emerald-200 hover:bg-emerald-100',
        tertiary: 'text-olive-600 bg-olive-50 border-olive-200 hover:bg-olive-100',
      },
    };
    const colors = linkColors[metadata.theme] || linkColors['푸드'];

    const externalLinks = [
      {
        label: "제품 스토어",
        url: metadata.productStoreUrl,
        icon: "ShoppingBag",
        color: colors.primary
      },
      {
        label: "캠페인 기획안",
        url: metadata.campaignPlanUrl,
        icon: "FileSpreadsheet",
        color: colors.secondary
      },
      {
        label: "채널 분석 보고서",
        url: metadata.channelReportUrl,
        icon: "LayoutDashboard",
        color: colors.tertiary
      }
    ];

    // Merge AI data with programmatic externalLinks and reportTheme
    const fullData = { ...(aiData as object), externalLinks, reportTheme: metadata.theme };

    // Generate dataTs code
    const dataTs = `import type { CelebProfile, MatchPoint, ContentIdea, MatchScore, ProductDefinition, StrategicPillar, ExternalLink } from './types';

export const reportData = ${JSON.stringify(fullData, null, 2)};`;

    return res.status(200).json({
      success: true,
      dataTs
    });

  } catch (error) {
    console.error('Error in extract endpoint:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return res.status(500).json({
      success: false,
      error: `추출 중 오류 발생: ${errorMessage}`
    });
  }
}
