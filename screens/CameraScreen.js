import React from 'react';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Vibration,
} from 'react-native';
import { MonoText } from '../components/StyledText';
import { Container, Header, Content, Button, Icon } from 'native-base';

export default class CameraScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    qrData: null
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async componentDidUpdate() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async saveQrData(data) {
    Vibration.vibrate(5)
    this.setState({ qrData: data.data });
  }

  async pushData() {
    const { navigate } = this.props.navigation;
    const { qrData } = this.state;
    console.log(this.props)
    if(!qrData) return;
    navigate('Links', { qrData: qrData })
  }

  render() {
    const { hasCameraPermission, qrData } = this.state;
    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.container}>

        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.type}
            onBarCodeScanned={e => this.saveQrData(e)}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
            </View>
          </Camera>
        </View>

      <View style={styles.tabBarInfoContainer}>
          <Button style={styles.tabBarButton} rounded bordered info large onPress={() => this.pushData()} >
                {!qrData
                  ? <Text style={styles.tabBarInfoText}>Please scan qr</Text>
                  : <View>
                      <Text style={styles.tabBarInfoText}>Send qr data:</Text>
                      <MonoText style={styles.tabBarInfoText}>
                        {qrData}
                      </MonoText>
                    </View>
                }
          </Button>
      </View>
    </View>
        
      );
    }
  }
}

CameraScreen.navigationOptions = {
  title: 'QrScanner',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  tabBarInfoContainer: {
    flex: 1,
    maxHeight: 100,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarButton: {
    minWidth: 150,
    alignItems: 'center',
    justifyContent:  'center',
  },
  tabBarInfoText: {
    fontSize: 14,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  navigationFilename: {
    marginTop: 5,
  },
});