import _ from 'lodash';
import { TICKET_FETCHED, TICKET_FETCHING } from './types';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
  case TICKET_FETCHING:
    let data = [...state];
    data.push(1);
    
    return data;
  case TICKET_FETCHED:
    const { status, respBody } = action;
    const index  = state.length - 1;
    data = [...state];

    if (status !== 2) {
      const { kkmFnsId, kkmSerialNumber } = respBody;
      data[index] = kkmFnsId+kkmSerialNumber;
    }

    return data;
  default:
    return state;
  }
};