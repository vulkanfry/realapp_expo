import { COLLAPSE_POPUP, COLLAPSE_QR_GENERATOR } from './types';

export function collapsePopup() {
  return {
    type: COLLAPSE_POPUP
  };
}

export function collapseQrGenerator() {
  return {
    type: COLLAPSE_QR_GENERATOR
  };
}