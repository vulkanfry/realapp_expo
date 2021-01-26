import * as React from 'react';
import { connect } from 'react-redux';
import CameraScreen from '../screens/CameraScreen';
import { View} from 'react-native';
import * as Permissions from "expo-permissions";
import _ from 'lodash';
import { Camera } from "expo-camera";
import QrCodeGenerator from '../components/QrCodeGenerator';
import { collapsePopup } from '../store/ui/itemPopup/actions';
import { changeQrData } from '../store/ui/qrData/actions';
import { genQr, selectedAction } from '../store/qrDatas/actions';
import { withNavigationFocus } from 'react-navigation';

const selectAction = (qrData, qrDatas) => {
  return selectedAction[(!qrData || (qrData && qrDatas.includes(qrData))) ? 1 : 0]
}

function mapStateToProps(state) {
  const popupOpened = state.ui.popupOpened.popup.opened;
  const { qrData } = state.ui;
  const {qrDatas} = state;
  const generatedData = genQr(qrData);
  const action = selectAction(generatedData, qrDatas);
  return {
    generatedData,
    popupOpened,
    qrDatas,
    action
  };
};

export class CameraScreenContainer extends React.Component {
  state = {
    hasCameraPermission: null,
    qrData: null,
  };

  saveQr = (qrData, qrDatas) => {
    return selectAction(qrData, qrDatas)(qrData)
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  async componentDidUpdate() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  render() {
    const { popupOpened, qrDatas, dispatch, action, generatedData } = this.props;
    return (<View>
      <QrCodeGenerator qrCodeData = {generatedData} opened = {popupOpened} onChange={e=> dispatch(changeQrData(e))} onSave={e=> dispatch(action(generatedData))} onClose={e => dispatch(collapsePopup())}/>
      <CameraScreen
        hasCameraPermission={this.state.hasCameraPermission}
        qrData={qrDatas}
        saveQr={qrData => dispatch(saveQr(qrData, qrDatas))}
        openQrGenerateModal={e => dispatch(collapsePopup())}
      /></View>
    );
  };
}

export default withNavigationFocus(connect(mapStateToProps)(CameraScreenContainer));
