import { COLLAPSE_POPUP } from './types';
import _ from 'lodash';

const initialState = {
  popup: {
    opened: false
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COLLAPSE_POPUP:
      const opened = !state.popup.opened;
      return { ...state, popup: { ...state.popup, opened } }
    default:
      return state
  }
}
