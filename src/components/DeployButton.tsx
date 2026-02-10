import { useState } from 'react';
import { Copy, Check, FileCode, Rocket, Loader2, ExternalLink, AlertCircle } from 'lucide-react';
import { deployReportDashboard } from '../lib/api';

type DeployStatus = 'idle' | 'deploying' | 'success' | 'error';

interface Metadata {
  handle: string;
  platform: 'instagram' | 'youtube';
  profileUrl: string;
  category: '일반' | '뷰티' | '푸드';
  theme: '뷰티' | '푸드';
  productStoreUrl: string;
  campaignPlanUrl: string;
  channelReportUrl: string;
}

interface DeployButtonProps {
  dataTs: string | null;
  metadata: Metadata;
  disabled?: boolean;
}

export default function DeployButton({ dataTs, metadata, disabled = false }: DeployButtonProps) {
  const [copied, setCopied] = useState(false);
  const [deployStatus, setDeployStatus] = useState<DeployStatus>('idle');
  const [deploymentUrl, setDeploymentUrl] = useState<string | null>(null);
  const [deployError, setDeployError] = useState<string | null>(null);

  const handleCopy = async () => {
    if (!dataTs) return;

    try {
      await navigator.clipboard.writeText(dataTs);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDeploy = async () => {
    if (!dataTs || !metadata.handle) return;

    setDeployStatus('deploying');
    setDeployError(null);
    setDeploymentUrl(null);

    try {
      const response = await deployReportDashboard({ dataTs, metadata });

      if (!response.success || !response.deploymentUrl) {
        throw new Error(response.error || '배포에 실패했습니다.');
      }

      setDeploymentUrl(response.deploymentUrl);
      setDeployStatus('success');
    } catch (err) {
      const message = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
      setDeployError(message);
      setDeployStatus('error');
    }
  };

  const isDisabled = disabled || !dataTs;

  return (
    <div className="space-y-4">
      {/* Deploy Button */}
      <button
        onClick={handleDeploy}
        disabled={isDisabled || deployStatus === 'deploying'}
        className={`
          w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg
          font-semibold text-lg transition-all
          ${
            isDisabled || deployStatus === 'deploying'
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : deployStatus === 'success'
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-olive-600 text-white shadow-lg hover:shadow-xl hover:bg-olive-700'
          }
        `}
      >
        {deployStatus === 'deploying' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            배포 중...
          </>
        ) : deployStatus === 'success' ? (
          <>
            <Check className="w-5 h-5" />
            배포 완료!
          </>
        ) : (
          <>
            <Rocket className="w-5 h-5" />
            자동 배포
          </>
        )}
      </button>

      {/* Deployment Status */}
      {deployStatus === 'deploying' && (
        <div className="bg-olive-50 border border-olive-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-olive-800">
            <Loader2 className="w-4 h-4 animate-spin" />
            <p className="text-sm font-medium">Vercel에 대시보드를 배포하고 있습니다...</p>
          </div>
          <p className="text-xs text-olive-600 mt-1">빌드 완료까지 1-2분 소요될 수 있습니다.</p>
        </div>
      )}

      {/* Success */}
      {deployStatus === 'success' && deploymentUrl && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800 font-semibold mb-2">배포가 완료되었습니다!</p>
          <a
            href={deploymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
          >
            <ExternalLink className="w-4 h-4" />
            대시보드 열기
          </a>
          <p className="text-xs text-green-600 mt-2 break-all">{deploymentUrl}</p>
          <p className="text-xs text-green-500 mt-1">
            * Vercel 빌드가 완료된 후 접속 가능합니다 (보통 1-2분).
          </p>
        </div>
      )}

      {/* Error */}
      {deployStatus === 'error' && deployError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-red-800 font-medium text-sm">배포 실패</p>
              <p className="text-red-600 text-xs mt-1">{deployError}</p>
            </div>
          </div>
          <button
            onClick={handleDeploy}
            className="mt-2 text-sm text-red-700 hover:text-red-900 underline"
          >
            다시 시도
          </button>
        </div>
      )}

      {/* Divider */}
      {dataTs && (
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-xs text-gray-400">또는</span>
          </div>
        </div>
      )}

      {/* Copy Button (secondary) */}
      {dataTs && (
        <button
          onClick={handleCopy}
          disabled={isDisabled}
          className={`
            w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg
            text-sm font-medium transition-all border
            ${
              copied
                ? 'bg-green-50 text-green-700 border-green-200'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }
          `}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              복사 완료!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              data.ts 코드 복사 (수동 배포용)
            </>
          )}
        </button>
      )}

      {/* Code Preview */}
      {dataTs && (
        <details className="bg-gray-50 rounded-lg border border-gray-200">
          <summary className="cursor-pointer px-4 py-3 flex items-center gap-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
            <FileCode className="w-4 h-4" />
            코드 미리보기
          </summary>
          <div className="px-4 py-3 border-t border-gray-200">
            <pre className="text-xs bg-white p-3 rounded border border-gray-200 overflow-x-auto max-h-64 overflow-y-auto">
              <code>{dataTs}</code>
            </pre>
          </div>
        </details>
      )}
    </div>
  );
}
