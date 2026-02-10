import type { ExtractRequest, ExtractResponse, DeployRequest, DeployResponse } from './types';

const API_BASE_URL = import.meta.env.PROD
  ? '/api'
  : 'http://localhost:3000/api';

const REQUEST_TIMEOUT = 180000; // 180 seconds
const MAX_RETRIES = 1;

class ApiError extends Error {
  statusCode?: number;
  isRetryable: boolean;

  constructor(message: string, statusCode?: number, isRetryable: boolean = false) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.isRetryable = isRetryable;
  }
}

function isRetryableError(error: unknown): boolean {
  if (error instanceof ApiError) {
    return error.isRetryable;
  }
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return true;
  }
  return false;
}

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout: number
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError(
        '요청 시간이 초과되었습니다. 다시 시도해주세요.',
        408,
        true
      );
    }
    throw error;
  }
}

export async function extractReportData(
  request: ExtractRequest
): Promise<ExtractResponse> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetchWithTimeout(
        `${API_BASE_URL}/extract`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
        },
        REQUEST_TIMEOUT
      );

      const data = await response.json() as ExtractResponse;

      if (!response.ok) {
        const isServerError = response.status >= 500;
        throw new ApiError(
          data.error || `서버 오류 (${response.status})`,
          response.status,
          isServerError
        );
      }

      if (!data.success) {
        throw new ApiError(
          data.error || '추출 실패',
          response.status,
          false
        );
      }

      return data;

    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt === MAX_RETRIES) break;
      if (!isRetryableError(error)) break;

      const backoffMs = 1000 * Math.pow(2, attempt);
      await delay(backoffMs);
    }
  }

  const errorMessage = lastError instanceof ApiError
    ? lastError.message
    : '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.';

  return {
    success: false,
    error: errorMessage,
  };
}

const DEPLOY_TIMEOUT = 120000; // 120 seconds

export async function deployReportDashboard(
  request: DeployRequest
): Promise<DeployResponse> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetchWithTimeout(
        `${API_BASE_URL}/deploy`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
        },
        DEPLOY_TIMEOUT
      );

      const data = await response.json() as DeployResponse;

      if (!response.ok) {
        const isServerError = response.status >= 500;
        throw new ApiError(
          data.error || `서버 오류 (${response.status})`,
          response.status,
          isServerError
        );
      }

      if (!data.success) {
        throw new ApiError(
          data.error || '배포 실패',
          response.status,
          false
        );
      }

      return data;

    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt === MAX_RETRIES) break;
      if (!isRetryableError(error)) break;

      const backoffMs = 1000 * Math.pow(2, attempt);
      await delay(backoffMs);
    }
  }

  const errorMessage = lastError instanceof ApiError
    ? lastError.message
    : '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.';

  return {
    success: false,
    error: errorMessage,
  };
}
