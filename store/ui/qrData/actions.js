import { CHANGE_QR_DATA } from './types';

export function changeQrData(qrData) {
  return {
    type: CHANGE_QR_DATA,
    qrData
  };
};