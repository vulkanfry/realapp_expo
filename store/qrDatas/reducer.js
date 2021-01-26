import _ from 'lodash';
import { QR_DATA_SAVE } from '../tickets/types';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
  case QR_DATA_SAVE:
    const { qr } = action;
    let data = state;
    data.push(qr)
    return data;
  default:
    return state;
  }
};