import { QRCode } from './type';
import { toast } from 'sonner';

/**
 * Generate random string for QR code values
 */
export const generateRandomString = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

/**
 * Format date to readable format
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date);
};

/**
 * Generate a PDF document with QR codes
 */
export const generatePDF = (codes: QRCode[]): void => {
  try {
    // This is a simplified implementation
    // In a real app, you would use a library like jsPDF with canvas to render QR codes
    console.log('Generating PDF with', codes.length, 'QR codes');
    
    // Mock PDF generation for now
    toast.success(`PDF с ${codes.length} QR-кодами готов к скачиванию`);
    
    // Simulate download delay
    setTimeout(() => {
      // Create a fake download
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent('QR codes data'));
      element.setAttribute('download', `qr-codes-${new Date().toISOString().slice(0, 10)}.pdf`);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 500);
  } catch (error) {
    console.error('Error generating PDF:', error);
    toast.error('Ошибка при создании PDF');
  }
};

/**
 * Print QR codes directly
 */
export const printQRCodes = (codes: QRCode[]): void => {
  try {
    console.log('Printing', codes.length, 'QR codes');
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    
    if (!printWindow) {
      toast.error('Пожалуйста, разрешите всплывающие окна для печати');
      return;
    }
    
    // Generate HTML content for printing - one QR code per page
    let html = `
      <html>
      <head>
        <title>QR Codes Print</title>
        <style>
          @page {
            size: A9;
            margin: 1cm;
          }
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
          }
          .page {
            height: 27.7cm;
            width: 19cm;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            page-break-after: always;
            position: relative;
          }
          .page:last-child {
            page-break-after: avoid;
          }
          .qr-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .qr-code {
            width: 10cm;
            height: 10cm;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .qr-code img {
            width: 100%;
            height: 100%;
          }
          .qr-value {
            margin-top: 1cm;
            font-size: 14pt;
            font-weight: bold;
            text-align: center;
          }
          .page-number {
            position: absolute;
            bottom: 0.5cm;
            text-align: center;
            font-size: 10pt;
            color: #666;
            width: 100%;
          }
          /* Make sure the content doesn't overflow */
          @media print {
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        </style>
      </head>
      <body>
    `;
    
    // Create a page for each QR code
    codes.forEach((code, index) => {
      const codeNumber = index + 1;
      
      html += `
        <div class="page">
          <div class="qr-container">
            <div class="qr-code">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=140x197&data=${encodeURIComponent(code.code || code.value)}" 
                alt="QR Code ${codeNumber}" 
              />
            </div>
            <div class="qr-value">QR Код #${codeNumber}</div>
          </div>
          <div class="page-number">Страница ${codeNumber} из ${codes.length}</div>
        </div>
      `;
    });
    
    html += `
      </body>
      </html>
    `;
    
    // Write to the window and print
    printWindow.document.write(html);
    printWindow.document.close();
    
    // Print when loaded
    printWindow.onload = function() {
      setTimeout(() => {
        printWindow.print();
        // Close the window after printing
        printWindow.onafterprint = function() {
          printWindow.close();
        };
      }, 1000); // Give time for images to load
    };
  } catch (error) {
    console.error('Error printing QR codes:', error);
    toast.error('Ошибка при печати QR-кодов');
  }
};