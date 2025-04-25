import { QRCode } from './type';

/**
 * Generate random string for QR code values
 */
export const generateRandomString = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

/**
 * Generate an array of QR codes with the specified count
 */
export const generateQRCodes = (count: number): QRCode[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    value: generateRandomString()
  }));
};

/**
 * Generate a PDF document with QR codes
 * This is a placeholder function - actual implementation would use a library like jsPDF
 */
export const generatePDF = (codes: QRCode[]): void => {
  console.log('Generating PDF with', codes.length, 'QR codes');
  // Implementation would go here
};

/**
 * Print QR codes directly
 * This is a placeholder function - actual implementation would handle browser printing
 */
export const printQRCodes = (codes: QRCode[]): void => {
  console.log('Printing', codes.length, 'QR codes');
  window.print();
};