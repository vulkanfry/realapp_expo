import { COLLAPSE_POPUP, COLLAPSE_QR_GENERATOR } from './types';
import { QR_DATA_SAVE } from '../../tickets/types';
import _ from 'lodash';

const initialState = {
  popup: {
    opened: false
  },
  qrGenerator: {
    opened: false
  }
};

export default function (state = initialState, action) {
  let opened;
  switch (action.type) {
    case COLLAPSE_POPUP:
      opened = !state.popup.opened;
      return { ...state, popup: { ...state.popup, opened } }
    case COLLAPSE_QR_GENERATOR:
    case QR_DATA_SAVE:
      opened = !state.qrGenerator.opened;
      return { ...state, qrGenerator: { ...state.qrGenerator, opened } }
    default:
      return state
  }
}
