import { TICKET_FETCHING } from '../../tickets/types';
import _ from 'lodash';

const initialState = {
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TICKET_FETCHING:
      const {qrIndex} = action;
      return { ...state, [qrIndex]: true }
    default:
      return state
  }
}
