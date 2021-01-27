import * as React from 'react';
import { connect } from 'react-redux';
import CameraScreen from '../screens/CameraScreen';
import { View } from 'react-native';
import * as Permissions from "expo-permissions";
import _ from 'lodash';
import QrCodeGenerator from '../components/QrCodeGenerator';
import { collapseQrGenerator } from '../store/ui/itemPopup/actions';
import { changeQrData } from '../store/ui/qrData/actions';
import { genQr, selectedAction } from '../store/qrDatas/actions';
import { withNavigationFocus } from 'react-navigation';

const selectAction = (qrData, qrDatas) => {
  return selectedAction[(!qrData || (qrData && qrDatas.includes(qrData))) ? 1 : 0]
}

function mapStateToProps(state) {
  const popupOpened = state.ui.popupOpened.qrGenerator.opened;
  const { qrData } = state.ui;
  const { qrDatas } = state;
  const generatedData = genQr(qrData);
  const action = selectAction(generatedData, qrDatas);
  console.log(state)
  return {
    generatedData,
    popupOpened,
    qrDatas,
    qrData,
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

  // async componentDidUpdate() {
  //   const { status } = await Permissions.askAsync(Permissions.CAMERA);
  //   this.setState({ hasCameraPermission: status === "granted" });
  // }

  render() {
    const { popupOpened, qrDatas, qrData, dispatch, action, generatedData } = this.props;
    console.log(1, qrData)
    return this.props.isFocused ? (
      <CameraScreen
        hasCameraPermission={this.state.hasCameraPermission}
        qrData={qrDatas}
        saveQr={qrData => dispatch(this.saveQr(qrData.replace('http://consumer.oofd.kz', ''), qrDatas))}
        openQrGenerateModal={e => dispatch(collapseQrGenerator())}
      >
        <QrCodeGenerator qrCodeData={qrData} opened={popupOpened} onChange={e => dispatch(changeQrData(e))} onSave={e => dispatch(action(generatedData))} onClose={e => dispatch(collapseQrGenerator())} />
      </CameraScreen>
    ) : null;
  };
}

export default withNavigationFocus(connect(mapStateToProps)(CameraScreenContainer));
