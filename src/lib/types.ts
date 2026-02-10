export type ReportTheme = '뷰티' | '푸드';

export interface ExtractRequest {
  reportText: string;
  metadata: {
    handle: string;
    platform: 'instagram' | 'youtube';
    profileUrl: string;
    category: '일반' | '뷰티' | '푸드';
    theme: ReportTheme;
    productStoreUrl: string;
    campaignPlanUrl: string;
    channelReportUrl: string;
  };
}

export interface ExtractResponse {
  success: boolean;
  dataTs?: string;
  error?: string;
}

export type Platform = 'instagram' | 'youtube';
export type Category = '일반' | '뷰티' | '푸드';

export interface DeployRequest {
  dataTs: string;
  metadata: {
    handle: string;
    platform: 'instagram' | 'youtube';
    profileUrl: string;
    category: '일반' | '뷰티' | '푸드';
    theme: ReportTheme;
    productStoreUrl: string;
    campaignPlanUrl: string;
    channelReportUrl: string;
  };
}

export interface DeployResponse {
  success: boolean;
  deploymentUrl?: string;
  projectName?: string;
  error?: string;
}
