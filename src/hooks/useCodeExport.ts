import { useState, useCallback } from 'react';

interface ExportOptions {
  format: 'react' | 'html' | 'vue' | 'angular';
  includeStyles: boolean;
  minify: boolean;
}

export const useCodeExport = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportedCode, setExportedCode] = useState<string>('');

  const exportToReact = useCallback((data: any) => {
    // Convert data to React component code
    return `
import React from 'react';

const GeneratedComponent = () => {
  return (
    <div>
      {/* Generated content */}
      {JSON.stringify(data, null, 2)}
    </div>
  );
};

export default GeneratedComponent;
    `.trim();
  }, []);

  const exportToHTML = useCallback((data: any) => {
    // Convert data to HTML
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Page</title>
</head>
<body>
  <!-- Generated content -->
  <div id="root">
    ${JSON.stringify(data, null, 2)}
  </div>
</body>
</html>
    `.trim();
  }, []);

  const exportCode = useCallback(async (data: any, options: ExportOptions) => {
    setIsExporting(true);
    try {
      let code = '';
      switch (options.format) {
        case 'react':
          code = exportToReact(data);
          break;
        case 'html':
          code = exportToHTML(data);
          break;
        default:
          code = JSON.stringify(data, null, 2);
      }
      setExportedCode(code);
      return code;
    } finally {
      setIsExporting(false);
    }
  }, [exportToReact, exportToHTML]);

  const downloadCode = useCallback((code: string, filename: string) => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }, []);

  return {
    isExporting,
    exportedCode,
    exportCode,
    downloadCode,
  };
};
