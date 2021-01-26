import { QR_DATA_SAVE, ERROR_SAVE_QR } from '../tickets/types';

export const selectedAction = {
  0: saveQrData,
  1: errorSaveQr
};

export const genQr = (qrData) => {
  return `?i=${qrData.fp}&f=${qrData.rn}&s=${qrData.sum}&t=${qrData.time}`
};

export function saveQrData(qr) {
  return {
    type: QR_DATA_SAVE,
    qr
  };
};

export function errorSaveQr(qr) {
  return {
    type: ERROR_SAVE_QR,
    qr
  };
};