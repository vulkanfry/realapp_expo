import _ from 'lodash';
import { ON_OPEN_MODAL } from './types';

const initialState = false;

export default function (state = initialState, action) {
  switch (action.type) {
  case ON_OPEN_MODAL:
    return !state;
  default:
    return state;
  }
};