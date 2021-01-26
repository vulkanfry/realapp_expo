import _ from 'lodash';
import { TICKET_FETCHED } from '../tickets/types';

const initialState = {1: {orgTitle: 'Fetching', ticket: {transactionDate: "2020-12-02T15:46:42.000"}}};

export default function (state = initialState, action) {
  switch (action.type) {
  case TICKET_FETCHED:
    const { status, respBody } = action;
    if (status === 2) return state;

    const { kkmFnsId, kkmSerialNumber } = respBody;
    return Object.assign(state, {[kkmFnsId+kkmSerialNumber]: respBody});
  default:
    return state;
  }
};