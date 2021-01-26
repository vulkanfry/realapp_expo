import { CHANGE_QR_DATA } from './types';
import { QR_DATA_SAVE } from '../../tickets/types';
import _ from 'lodash';

const initialState = {
  qrData: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_QR_DATA:
      const {fp, rn, sum, time} = action.qrData;
      return { ...state, qrData: { ...state.qrData, fp, rn, sum, time } }
    case QR_DATA_SAVE:
      return {}
    default:
      return state
  }
}
