import React, { useState, useMemo, Component } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import Dashboard from '../templates/food/App';
import { reportData as sampleData } from '../templates/food/data';

// Deep merge: AI data + sample defaults for missing fields
function deepMergeDefaults(defaults: any, source: any): any {
  if (source === undefined || source === null) return defaults;
  if (typeof defaults !== 'object' || defaults === null) return source;
  if (Array.isArray(defaults)) {
    return Array.isArray(source) && source.length > 0 ? source : defaults;
  }

  const result: any = {};
  const allKeys = new Set([
    ...Object.keys(defaults),
    ...Object.keys(source || {}),
  ]);

  for (const key of allKeys) {
    const hasInSource = source && key in source && source[key] !== undefined;
    const hasInDefaults = key in defaults;

    if (hasInSource && hasInDefaults) {
      if (
        typeof defaults[key] === 'object' &&
        !Array.isArray(defaults[key]) &&
        defaults[key] !== null
      ) {
        result[key] = deepMergeDefaults(defaults[key], source[key]);
      } else {
        result[key] = source[key];
      }
    } else if (hasInSource) {
      result[key] = source[key];
    } else {
      result[key] = defaults[key];
    }
  }
  return result;
}

// Error Boundary to catch rendering crashes
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class DashboardErrorBoundary extends Component<
  { children: React.ReactNode; dataTs: string },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-white rounded-lg border-2 border-red-200 p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-700 mb-2">
            대시보드 렌더링 실패
          </h3>
          <p className="text-sm text-red-500 mb-2">
            {this.state.error?.message || '컴포넌트 렌더링 중 오류가 발생했습니다.'}
          </p>
          <p className="text-xs text-gray-500 mb-4">
            데이터 구조가 올바르지 않을 수 있습니다. 다시 생성해주세요.
          </p>
          <details className="text-left">
            <summary className="cursor-pointer text-sm text-gray-500">원본 코드 보기</summary>
            <pre className="mt-2 text-xs bg-gray-50 p-3 rounded border overflow-x-auto max-h-64 overflow-y-auto">
              <code>{this.props.dataTs}</code>
            </pre>
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

interface PreviewFrameProps {
  dataTs: string | null;
  isLoading?: boolean;
}

function parseDashboardData(dataTs: string): typeof sampleData | null {
  try {
    // Extract the object literal from "export const reportData = { ... };"
    const match = dataTs.match(/=\s*(\{[\s\S]*\})\s*;?\s*$/);
    if (!match) return null;

    const fn = new Function(`return ${match[1]}`);
    const rawData = fn();

    if (!rawData || typeof rawData !== 'object') return null;

    // Deep merge with sample data as defaults for any missing fields
    const merged = deepMergeDefaults(sampleData, rawData);
    return merged;
  } catch (e) {
    console.error('Failed to parse dashboard data:', e);
    return null;
  }
}

export function PreviewFrame({ dataTs, isLoading = false }: PreviewFrameProps) {
  const dashboardData = useMemo(() => {
    if (!dataTs) return null;
    return parseDashboardData(dataTs);
  }, [dataTs]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border-2 border-gray-200 p-8 flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 text-slate-600 animate-spin mb-4" />
        <p className="text-gray-600 font-medium">데이터 생성 중...</p>
      </div>
    );
  }

  if (!dataTs) {
    return (
      <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
        <AlertCircle className="w-12 h-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          미리보기 준비되지 않음
        </h3>
        <p className="text-sm text-gray-500 max-w-md">
          입력 탭에서 보고서를 입력하고 "보고서 생성" 버튼을 클릭하면
          여기에 대시보드 미리보기가 표시됩니다.
        </p>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="bg-white rounded-lg border-2 border-red-200 p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
        <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
        <h3 className="text-lg font-semibold text-red-700 mb-2">
          데이터 파싱 실패
        </h3>
        <p className="text-sm text-red-500 max-w-md">
          생성된 데이터를 파싱할 수 없습니다. 다시 생성해주세요.
        </p>
        <details className="mt-4 w-full text-left">
          <summary className="cursor-pointer text-sm text-gray-500">원본 코드 보기</summary>
          <pre className="mt-2 text-xs bg-gray-50 p-3 rounded border overflow-x-auto max-h-64 overflow-y-auto">
            <code>{dataTs}</code>
          </pre>
        </details>
      </div>
    );
  }

  return (
    <DashboardErrorBoundary dataTs={dataTs}>
      <div className="bg-slate-50 rounded-lg border-2 border-slate-200/30 overflow-hidden">
        <Dashboard overrideData={dashboardData} />
      </div>
    </DashboardErrorBoundary>
  );
}
