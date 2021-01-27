import { combineReducers } from 'redux';
import popupOpened from './itemPopup/reducer';
import qrData from './qrData/reducer';
import qrDataFetched from './qrDataFetched/reducer';

export default combineReducers({
  popupOpened,
  qrData,
  qrDataFetched
});
