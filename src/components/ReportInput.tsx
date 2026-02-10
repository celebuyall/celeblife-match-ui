import React from 'react';
import { FileText, X, ClipboardPaste } from 'lucide-react';

interface ReportInputProps {
  value: string;
  onChange: (value: string) => void;
}

const ReportInput: React.FC<ReportInputProps> = ({ value, onChange }) => {
  const handleClear = () => {
    onChange('');
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onChange(text);
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  const characterCount = value.length;

  return (
    <div className="w-full space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-800">업무 보고 입력</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePaste}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            title="클립보드에서 붙여넣기"
          >
            <ClipboardPaste className="w-4 h-4" />
            <span>붙여넣기</span>
          </button>
          {value && (
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              title="입력 내용 지우기"
            >
              <X className="w-4 h-4" />
              <span>지우기</span>
            </button>
          )}
        </div>
      </div>

      {/* Textarea */}
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="여기에 업무 보고 내용을 붙여넣으세요...&#10;&#10;예시:&#10;- 프로젝트 진행 상황&#10;- 완료한 작업&#10;- 진행 중인 작업&#10;- 이슈 및 특이사항&#10;&#10;포맷은 자동으로 보존됩니다."
          className="w-full h-96 px-4 py-3 text-gray-800 bg-white border-2 border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400 font-mono text-sm leading-relaxed"
          style={{ whiteSpace: 'pre-wrap' }}
        />
      </div>

      {/* Footer with character count */}
      <div className="flex items-center justify-between text-sm">
        <p className="text-gray-500">
          {value ? '내용이 입력되었습니다' : '보고 내용을 입력해주세요'}
        </p>
        <p className="text-gray-600 font-medium">
          <span className={characterCount > 0 ? 'text-blue-600' : ''}>
            {characterCount.toLocaleString()}
          </span>{' '}
          <span className="text-gray-400">자</span>
        </p>
      </div>
    </div>
  );
};

export default ReportInput;
