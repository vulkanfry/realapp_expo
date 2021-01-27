import { TICKET_FETCHING } from '../../tickets/types';

export function changeQrData(qrData) {
  return {
    type: CHANGE_QR_DATA,
    qrData
  };
};