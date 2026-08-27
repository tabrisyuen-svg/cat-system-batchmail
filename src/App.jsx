import React, { useState } from 'react';
import { Upload, FileText, Mail, Paperclip, Eye, Send, CheckCircle, X, Download, ChevronRight } from 'lucide-react';

const steps = [
  { id: 1, label: '資料來源', icon: Upload, desc: '上傳 Excel / CSV' },
  { id: 2, label: '範本編輯器', icon: FileText, desc: '撰寫及設定標記' },
  { id: 3, label: '簽名設定', icon: Mail, desc: '統一公司簽名' },
  { id: 4, label: '批次附件', icon: Paperclip, desc: '揀選 PDF 附件' },
  { id: 5, label: '預覽 & 生成', icon: Eye, desc: '確認並生成 HTML' },
  { id: 6, label: '推送 Outlook', icon: Send, desc: '匯出 VBA 草稿' },
];

const mockColumns = ['Name', 'Position', 'Company', 'Email', 'Department', 'Date'];
const mockData = [
  { Name: 'Alice Chan', Position: 'Manager', Company: 'ABC Corp', Email: 'alice@abc.com', Department: 'HR', Date: '2026-08-27' },
  { Name: 'Bob Lee', Position: 'Director', Company: 'XYZ Ltd', Email: 'bob@xyz.com', Department: 'Finance', Date: '2026-08-27' },
  { Name: 'Carol Wong', Position: 'Executive', Company: 'DEF Inc', Email: 'carol@def.com', Department: 'Sales', Date: '2026-08-27' },
];

function DataSourceStep({ uploadedFile, setUploadedFile }) {
  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">資料來源</h2>
        <p className="text-sm text-gray-500 mt-1">上傳包含收件人資料的 Excel 或 CSV 檔案，第一行須為欄位標題。</p>
      </div>
      <div className={`border-2 border-dashed rounded-xl p-10 text-center transition-all ${uploadedFile ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50'}`}>
        {uploadedFile ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <p className="font-medium text-green-700">{uploadedFile}</p>
            <button onClick={() => setUploadedFile(null)} className="text-xs text-red-400 hover:text-red-600 flex items-center gap-1">
              <X className="w-3 h-3" /> 移除
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <Upload className="w-6 h-6 text-gray-400" />
            </div>
            <div>
              <p className="font-medium text-gray-700">點擊或拖放上傳</p>
              <p className="text-sm text-gray-400 mt-1">支援 .xlsx、.xls、.csv</p>
            </div>
            <button onClick={() => setUploadedFile('recipient_list.xlsx')} className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
              選擇檔案
            </button>
          </div>
        )}
      </div>
      {uploadedFile && (
        <div className="mt-6 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">資料預覽（前 3 行）</p>
            <span className="text-xs text-gray-400">6 個欄位 · 3 位收件人</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50">
                  {mockColumns.map(col => (
                    <th key={col} className="px-3 py-2 text-left font-semibold text-gray-500 border-b border-gray-100">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockData.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    {mockColumns.map((col, j) => (
                      <td key={j} className="px-3 py-2 text-gray-600 border-b border-gray-50">{row[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function TemplateEditorStep({ templateContent, setTemplateContent, insertMarker }) {
  const getPreview = () => {
    return templateContent
      .replace(/<Name>/g, 'Alice Chan')
      .replace(/<Position>/g, 'Manager')
      .replace(/<Company>/g, 'ABC Corp')
      .substring(0, 130);
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">範本編輯器</h2>
        <p className="text-sm text-gray-500 mt-1">撰寫電郵內文，點擊右側欄位按鈕即可插入個人化標記。</p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <label className="text-xs font-semibold text-gray-500 block mb-2">電郵主題</label>
            <input type="text" defaultValue="Invitation for <Name> - Annual Conference 2026"
              className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" />
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <label className="text-xs font-semibold text-gray-500 block mb-2">電郵內文</label>
            <textarea value={templateContent} onChange={(e) => setTemplateContent(e.target.value)}
              className="w-full h-64 text-sm text-gray-700 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none font-mono" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs font-semibold text-gray-500 mb-1">插入欄位標記</p>
            <p className="text-xs text-gray-400 mb-3">點擊欄位名稱，標記將附加至內文末端</p>
            <div className="space-y-2">
              {mockColumns.map(col => (
                <button key={col} onClick={() => insertMarker(col)}
                  className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 hover:bg-blue-50 hover:text-blue-700 rounded-lg text-sm text-gray-600 transition-colors group">
                  <span className="font-medium">{col}</span>
                  <span className="text-xs text-gray-400 group-hover:text-blue-400 font-mono">&lt;{col}&gt;</span>
                </button>
              ))}
            </div>
          </div>
          <div className="bg-blue-50 rounded-xl border border-blue-100 p-4">
            <p className="text-xs font-semibold text-blue-700 mb-2">即時預覽（Alice Chan）</p>
            <p className="text-xs text-blue-600 leading-relaxed">{getPreview()}...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignatureStep({ signature, setSignature }) {
  const [hasLogo, setHasLogo] = useState(false);
  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">簽名設定</h2>
        <p className="text-sm text-gray-500 mt-1">統一公司簽名，一次設定後所有批次自動附加於電郵底部。</p>
      </div>
      <div className="space-y-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700">附加公司 Logo</p>
            <p className="text-xs text-gray-400 mt-0.5">在簽名上方顯示公司標誌圖片</p>
          </div>
          <button onClick={() => setHasLogo(!hasLogo)}
            className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${hasLogo ? 'bg-blue-600' : 'bg-gray-300'}`}>
            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${hasLogo ? 'left-6' : 'left-1'}`}></div>
          </button>
        </div>
        {hasLogo && (
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <label className="text-xs font-semibold text-gray-500 block mb-2">Logo 圖片 URL</label>
            <input type="text" placeholder="https://yourcompany.com/logo.png"
              className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" />
          </div>
        )}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <label className="text-xs font-semibold text-gray-500 block mb-2">簽名文字</label>
          <textarea value={signature} onChange={(e) => setSignature(e.target.value)}
            className="w-full h-36 text-sm text-gray-700 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none" />
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs font-semibold text-gray-500 mb-3">預覽</p>
          <div className="border-t border-gray-200 pt-3">
            {hasLogo && (
              <div className="w-24 h-8 bg-gray-100 rounded flex items-center justify-center mb-3">
                <span className="text-xs text-gray-400">Logo</span>
              </div>
            )}
            <p className="text-sm text-gray-600 whitespace-pre-line">{signature}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AttachmentStep({ selectedPDF, setSelectedPDF }) {
  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">批次附件</h2>
        <p className="text-sm text-gray-500 mt-1">為本批次揀選一份 PDF，所有收件人均自動附上同一份文件。</p>
      </div>
      <div className={`border-2 border-dashed rounded-xl p-10 text-center transition-all ${selectedPDF ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50'}`}>
        {selectedPDF ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-red-500" />
            </div>
            <p className="font-medium text-red-700">{selectedPDF}</p>
            <p className="text-xs text-gray-400">1.2 MB · PDF</p>
            <button onClick={() => setSelectedPDF(null)} className="text-xs text-gray-400 hover:text-red-600 flex items-center gap-1">
              <X className="w-3 h-3" /> 更換附件
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <Paperclip className="w-6 h-6 text-gray-400" />
            </div>
            <div>
              <p className="font-medium text-gray-700">揀選 PDF 附件</p>
              <p className="text-sm text-gray-400 mt-1">僅支援 .pdf 格式</p>
            </div>
            <button onClick={() => setSelectedPDF('company_brochure_2026.pdf')}
              className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
              選擇 PDF
            </button>
          </div>
        )}
      </div>
      {selectedPDF && (
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm text-amber-700">
            <span className="font-semibold">批次提示：</span>下次執行新批次時，在此重新揀選新 PDF，舊批次不受影響。
          </p>
        </div>
      )}
    </div>
  );
}

function PreviewStep({ templateContent, signature, isGenerating, generatedCount, handleGenerate }) {
  const [activePreview, setActivePreview] = useState(0);
  const getPreview = (row) => templateContent
    .replace(/<Name>/g, row.Name).replace(/<Position>/g, row.Position)
    .replace(/<Company>/g, row.Company).replace(/<Email>/g, row.Email)
    .replace(/<Department>/g, row.Department).replace(/<Date>/g, row.Date);

  return (
    <div className="max-w-5xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">預覽 & 生成</h2>
          <p className="text-sm text-gray-500 mt-1">確認每位收件人的電郵內容，無誤後批量生成 HTML 檔。</p>
        </div>
        <button onClick={handleGenerate} disabled={isGenerating}
          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${isGenerating ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : generatedCount > 0 ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
          {isGenerating ? (
            <><div className="w-4 h-4 border-2 border-gray-300 border-t-gray-500 rounded-full animate-spin"></div>生成中...</>
          ) : generatedCount > 0 ? (
            <><Download className="w-4 h-4" />重新生成 ({generatedCount}/{mockData.length})</>
          ) : (
            <><Download className="w-4 h-4" />批量生成 HTML</>
          )}
        </button>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-700">收件人列表</p>
          </div>
          <div className="divide-y divide-gray-50">
            {mockData.map((row, i) => (
              <button key={i} onClick={() => setActivePreview(i)}
                className={`w-full px-4 py-3 text-left transition-colors ${activePreview === i ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                <p className={`text-sm font-medium ${activePreview === i ? 'text-blue-700' : 'text-gray-700'}`}>{row.Name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{row.Position} · {row.Company}</p>
                {generatedCount > i && (
                  <span className="text-xs text-green-600 flex items-center gap-1 mt-1">
                    <CheckCircle className="w-3 h-3" /> 已生成
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">電郵預覽 — {mockData[activePreview].Name}</p>
            <span className="text-xs text-gray-400">{mockData[activePreview].Email}</span>
          </div>
          <div className="p-5">
            <div className="text-xs text-gray-500 mb-4 pb-3 border-b border-gray-100">
              <span className="font-medium">主題：</span>Invitation for {mockData[activePreview].Name} - Annual Conference 2026
            </div>
            <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{getPreview(mockData[activePreview])}</p>
            <div className="mt-5 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 mb-2 font-medium">— 統一簽名 —</p>
              <p className="text-sm text-gray-500 whitespace-pre-line">{signature}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OutlookStep({ generatedCount }) {
  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">推送至 Outlook</h2>
        <p className="text-sm text-gray-500 mt-1">下載 HTML 檔案包及 VBA 腳本，在 Outlook 執行後自動建立草稿，逐封確認發送。</p>
      </div>
      {generatedCount === 0 ? (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
          <p className="text-amber-700 font-medium">請先完成「預覽 & 生成」步驟</p>
          <p className="text-sm text-amber-600 mt-1">尚未生成任何 HTML 檔案</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-green-700">{generatedCount} 份 HTML 檔案已生成</p>
              <p className="text-xs text-green-600 mt-0.5">可下載 HTML 檔案包及 VBA 腳本</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">HTML 檔案包</p>
              <p className="text-xs text-gray-400 mt-0.5">{generatedCount} 個 .html 檔案（ZIP 格式）</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Download className="w-4 h-4" /> 下載 ZIP
            </button>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">Outlook VBA 腳本</p>
              <p className="text-xs text-gray-400 mt-0.5">自動讀取 HTML 並建立草稿（含 PDF 附件）</p>
            </div>
            <button className="px-4 py-2 bg-gray-700 text-white text-sm rounded-lg hover:bg-gray-800 flex items-center gap-2">
              <Download className="w-4 h-4" /> 下載 .bas
            </button>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm font-semibold text-gray-700 mb-3">執行步驟</p>
            <div className="space-y-2">
              {[
                '解壓 HTML 檔案包至指定資料夾',
                '開啟 Outlook → Alt+F11 進入 VBA 編輯器',
                '匯入 .bas 腳本檔案',
                '設定 HTML 資料夾路徑 & PDF 附件路徑',
                '執行腳本，草稿將自動逐封建立',
                '逐封開啟草稿確認內容後按發送',
              ].map((s, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [templateContent, setTemplateContent] = useState(`Dear <Name>,\n\nWe are pleased to invite you to our upcoming annual conference.\n\nYour role as <Position> at <Company> has been noted in our records.\n\nPlease find the attached document for further details.\n\nBest regards,`);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [signature, setSignature] = useState('John Smith\nHead of Business Development\nABC Company Limited\nTel: +852 1234 5678\nEmail: john@abccompany.com');
  const [generatedCount, setGeneratedCount] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const insertMarker = (col) => setTemplateContent(prev => prev + `<${col}>`);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => { setGeneratedCount(mockData.length); setIsGenerating(false); }, 1800);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <DataSourceStep uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} />;
      case 2: return <TemplateEditorStep templateContent={templateContent} setTemplateContent={setTemplateContent} insertMarker={insertMarker} />;
      case 3: return <SignatureStep signature={signature} setSignature={setSignature} />;
      case 4: return <AttachmentStep selectedPDF={selectedPDF} setSelectedPDF={setSelectedPDF} />;
      case 5: return <PreviewStep templateContent={templateContent} signature={signature} isGenerating={isGenerating} generatedCount={generatedCount} handleGenerate={handleGenerate} />;
      case 6: return <OutlookStep generatedCount={generatedCount} />;
      default: return null;
    }
  };

  const stepStatus = (id) => {
    if (id === 1 && uploadedFile) return 'done';
    if (id === 3 && signature) return 'done';
    if (id === 4 && selectedPDF) return 'done';
    if (id === 5 && generatedCount > 0) return 'done';
    if (currentStep === id) return 'active';
    if (currentStep > id) return 'visited';
    return 'idle';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Mail className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">BatchMail</h1>
            <p className="text-xs text-gray-500">Outlook 批量個人化電郵工具</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          {uploadedFile && (
            <div className="flex items-center gap-2 text-gray-500">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-xs">3 位收件人已載入</span>
            </div>
          )}
          {selectedPDF && (
            <div className="flex items-center gap-2 text-gray-500">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <span className="text-xs">附件已設定</span>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-60 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
          <div className="p-4 flex-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">操作步驟</p>
            <nav className="space-y-1">
              {steps.map((step) => {
                const Icon = step.icon;
                const status = stepStatus(step.id);
                const isActive = status === 'active';
                const isDone = status === 'done';
                return (
                  <button key={step.id} onClick={() => setCurrentStep(step.id)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all ${isActive ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isActive ? 'bg-blue-600' : isDone ? 'bg-green-500' : 'bg-gray-200'}`}>
                      {isDone
                        ? <CheckCircle className="w-4 h-4 text-white" />
                        : <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                      }
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isActive ? 'text-blue-700' : isDone ? 'text-gray-700' : 'text-gray-400'}`}>{step.label}</p>
                      <p className={`text-xs ${isActive ? 'text-blue-400' : 'text-gray-400'}`}>{step.desc}</p>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
          <div className="p-4 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">批次概覽</p>
            <div className="space-y-2">
              {[
                { label: '收件人', value: uploadedFile ? '3 位' : '—' },
                { label: '附件', value: selectedPDF ? selectedPDF.substring(0, 16) + '…' : '未設定' },
                { label: '已生成', value: `${generatedCount} / 3` },
              ].map(item => (
                <div key={item.label} className="flex justify-between text-xs">
                  <span className="text-gray-400">{item.label}</span>
                  <span className={`font-medium ${item.value === '未設定' || item.value === '—' ? 'text-gray-400' : 'text-gray-700'}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="flex-1 p-8 overflow-auto">
          {renderStep()}
          <div className="flex justify-between mt-10 max-w-5xl">
            <button
              onClick={() => setCurrentStep(s => Math.max(1, s - 1))}
              disabled={currentStep === 1}
              className="px-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
              ← 上一步
            </button>
            <button
              onClick={() => setCurrentStep(s => Math.min(6, s + 1))}
              disabled={currentStep === 6}
              className="px-5 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-2">
              下一步 <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
