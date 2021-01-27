import { CHANGE_QR_DATA } from './types';
import { QR_DATA_SAVE } from '../../tickets/types';
import _ from 'lodash';

const initialState = {
  fp: null,
  rn: null,
  sum: null,
  time: null
};

const setValue = (key, state, value) => {
  return value === undefined ? state[key] : value;
}

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_QR_DATA:
      let {fp, rn, sum, time} = action.qrData;
      fp = setValue('fp', state, fp)
      rn = setValue('rn', state, rn)
      sum = setValue('sum', state, sum)
      time = setValue('time', state, time)

      return { ...state, fp, rn, sum, time }
    case QR_DATA_SAVE:
      return {}
    default:
      return state
  }
}
