import { useState } from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';
import ReportInput from './components/ReportInput';
import { MetadataForm } from './components/MetadataForm';
import { LoadingState } from './components/LoadingState';
import DeployButton from './components/DeployButton';
import { PreviewFrame } from './components/PreviewFrame';
import { extractReportData } from './lib/api';

type Tab = 'input' | 'preview' | 'deploy';
type LoadingStep = 1 | 2 | 3;

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

function App() {
  // Input state
  const [reportText, setReportText] = useState('');
  const [metadata, setMetadata] = useState<Metadata>({
    handle: '',
    platform: 'youtube',
    profileUrl: '',
    category: '푸드',
    theme: '푸드',
    productStoreUrl: '',
    campaignPlanUrl: '',
    channelReportUrl: ''
  });

  // Output state
  const [dataTs, setDataTs] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // UI state
  const [activeTab, setActiveTab] = useState<Tab>('input');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<LoadingStep>(1);

  const canGenerate = reportText.trim().length > 100 && metadata.handle.trim();

  const handleGenerate = async () => {
    if (!canGenerate) return;

    setIsLoading(true);
    setError(null);
    setDataTs(null);
    setLoadingStep(1);

    try {
      // Step 1: Extract data
      setLoadingStep(1);
      const response = await extractReportData({
        reportText,
        metadata,
      });

      if (!response.success || !response.dataTs) {
        throw new Error(response.error || '데이터 추출에 실패했습니다.');
      }

      // Step 2: Generate preview
      setLoadingStep(2);
      await new Promise(resolve => setTimeout(resolve, 500));

      setDataTs(response.dataTs);

      // Step 3: Complete
      setLoadingStep(3);
      await new Promise(resolve => setTimeout(resolve, 300));

      setActiveTab('preview');
    } catch (err) {
      const message = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setReportText('');
    setMetadata({
      handle: '',
      platform: 'youtube',
      profileUrl: '',
      category: '푸드',
      theme: '푸드',
      productStoreUrl: '',
      campaignPlanUrl: '',
      channelReportUrl: ''
    });
    setDataTs(null);
    setError(null);
    setActiveTab('input');
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: 'input', label: '입력' },
    { id: 'preview', label: '미리보기' },
    { id: 'deploy', label: '배포' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Haarpeer Report Generator
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                매칭 리포트를 자동으로 생성합니다
              </p>
            </div>
            {dataTs && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                새로 시작
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-olive-600 text-olive-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                {tab.id === 'preview' && dataTs && (
                  <span className="ml-2 inline-flex items-center justify-center w-2 h-2 bg-green-500 rounded-full" />
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Loading Overlay */}
        {isLoading && (
          <div className="mb-8">
            <LoadingState currentStep={loadingStep} />
          </div>
        )}

        {/* Error Message */}
        {error && !isLoading && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 font-medium">오류 발생</p>
            <p className="text-red-600 text-sm mt-1">{error}</p>
            <button
              onClick={handleGenerate}
              className="mt-3 text-sm text-red-700 hover:text-red-900 underline"
            >
              다시 시도
            </button>
          </div>
        )}

        {/* Tab Content */}
        {!isLoading && (
          <>
            {/* Input Tab */}
            {activeTab === 'input' && (
              <div className="space-y-8 animate-fade-in">
                <section>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    보고서 내용
                  </h2>
                  <ReportInput value={reportText} onChange={setReportText} />
                </section>

                <section>
                  <MetadataForm metadata={metadata} onChange={setMetadata} />
                </section>

                <section className="pt-4">
                  <button
                    onClick={handleGenerate}
                    disabled={!canGenerate}
                    className={`
                      flex items-center justify-center gap-2 px-8 py-4 rounded-lg
                      font-semibold text-lg transition-all
                      ${
                        canGenerate
                          ? 'bg-olive-600 text-white shadow-lg hover:shadow-xl hover:bg-olive-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }
                    `}
                  >
                    <Sparkles className="w-5 h-5" />
                    보고서 생성
                  </button>
                  {!canGenerate && (
                    <p className="text-sm text-gray-500 mt-2">
                      * 보고서 100자 이상 입력하고 핸들을 입력해주세요
                    </p>
                  )}
                </section>
              </div>
            )}

            {/* Preview Tab */}
            {activeTab === 'preview' && (
              <div className="animate-fade-in">
                <PreviewFrame dataTs={dataTs} isLoading={isLoading} />
              </div>
            )}

            {/* Deploy Tab */}
            {activeTab === 'deploy' && (
              <div className="max-w-lg animate-fade-in">
                <DeployButton dataTs={dataTs} metadata={metadata} />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
