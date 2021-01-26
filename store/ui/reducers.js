import { combineReducers } from 'redux';
import popupOpened from './itemPopup/reducer';
import qrData from './qrData/reducer';

export default combineReducers({
  popupOpened,
  qrData
});
