import * as QRCode from 'qrcode';

export const GenerateQRCode = async(URL: string): Promise<string> => {
  try {
    const qrCode = await QRCode.toDataURL(URL); //Genera el QR en base64
    const qrData = qrCode.split(",")[1];
    return qrData;
  } catch (error) {
    console.error('Error generating QR code:', error);
  }
}