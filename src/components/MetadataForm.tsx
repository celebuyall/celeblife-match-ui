import React from 'react';
import { User, Link, FileText, ShoppingBag, Megaphone, BarChart } from 'lucide-react';

interface MetadataFormProps {
  metadata: {
    handle: string;
    platform: 'instagram' | 'youtube';
    profileUrl: string;
    category: '일반' | '뷰티' | '푸드';
    theme: '뷰티' | '푸드';
    productStoreUrl: string;
    campaignPlanUrl: string;
    channelReportUrl: string;
  };
  onChange: (metadata: MetadataFormProps['metadata']) => void;
}

export const MetadataForm: React.FC<MetadataFormProps> = ({ metadata, onChange }) => {
  const handleChange = (field: keyof MetadataFormProps['metadata'], value: string) => {
    onChange({
      ...metadata,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      {/* Basic Information Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          기본 정보
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Handle */}
          <div>
            <label htmlFor="handle" className="block text-sm font-medium text-gray-700 mb-1">
              SNS 핸들
            </label>
            <input
              type="text"
              id="handle"
              value={metadata.handle}
              onChange={(e) => handleChange('handle', e.target.value)}
              placeholder="@username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Platform */}
          <div>
            <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-1">
              플랫폼
            </label>
            <select
              id="platform"
              value={metadata.platform}
              onChange={(e) => handleChange('platform', e.target.value as 'instagram' | 'youtube')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="instagram">Instagram</option>
              <option value="youtube">YouTube</option>
            </select>
          </div>

          {/* Profile URL */}
          <div>
            <label htmlFor="profileUrl" className="block text-sm font-medium text-gray-700 mb-1">
              프로필 URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Link className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="url"
                id="profileUrl"
                value={metadata.profileUrl}
                onChange={(e) => handleChange('profileUrl', e.target.value)}
                placeholder="https://..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              카테고리
            </label>
            <select
              id="category"
              value={metadata.category}
              onChange={(e) => handleChange('category', e.target.value as '일반' | '뷰티' | '푸드')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="일반">일반</option>
              <option value="뷰티">뷰티</option>
              <option value="푸드">푸드</option>
            </select>
          </div>

          {/* Report Theme */}
          <div>
            <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">
              보고서 테마
            </label>
            <select
              id="theme"
              value={metadata.theme}
              onChange={(e) => handleChange('theme', e.target.value as '뷰티' | '푸드')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="뷰티">뷰티</option>
              <option value="푸드">푸드</option>
            </select>
          </div>
        </div>
      </div>

      {/* External Links Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          외부 링크
        </h3>
        <div className="space-y-4">
          {/* Product Store URL */}
          <div>
            <label htmlFor="productStoreUrl" className="block text-sm font-medium text-gray-700 mb-1">
              제품 스토어 URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ShoppingBag className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="url"
                id="productStoreUrl"
                value={metadata.productStoreUrl}
                onChange={(e) => handleChange('productStoreUrl', e.target.value)}
                placeholder="https://..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Campaign Plan URL */}
          <div>
            <label htmlFor="campaignPlanUrl" className="block text-sm font-medium text-gray-700 mb-1">
              캠페인 기획안 URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Megaphone className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="url"
                id="campaignPlanUrl"
                value={metadata.campaignPlanUrl}
                onChange={(e) => handleChange('campaignPlanUrl', e.target.value)}
                placeholder="https://..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Channel Report URL */}
          <div>
            <label htmlFor="channelReportUrl" className="block text-sm font-medium text-gray-700 mb-1">
              채널 분석 보고서 URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BarChart className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="url"
                id="channelReportUrl"
                value={metadata.channelReportUrl}
                onChange={(e) => handleChange('channelReportUrl', e.target.value)}
                placeholder="https://..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
