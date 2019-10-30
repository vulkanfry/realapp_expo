import React, {Component} from 'react';
import { ScrollView, Platform, Alert } from 'react-native';
import { Content, List, ListItem, Left, Body, Right, Text } from 'native-base';
import TabBarIcon from '../components/TabBarIcon';

export default class LinksComponent extends Component {
  state = {
    data: []
  };

  async componentDidMount() {
    const qrData = this.props.navigation.getParam('qrData', null);
    const server = this.props.screenProps.server;
    if (qrData !== null) {
      this.setState({ data: this.state.data.push({status: 0, name: qrData}) });
      this.fetchData(qrData, server);
    }
  }

  async fetchData(data, server) {
    return fetch(server, data)
    .then((response) => this.setData(response.status))
    .catch((error) => {
      console.error(error);
    });
  }

  async fetchData(status) {
    const qrData = this.props.navigation.getParam('qrData', {});
    let dataStatus;
    if (status === 200)
      dataStatus = 1;
    else
      dataStatus = 2;
    
    const data = this.state.data.map((item, index) => {
        return (index === this.state.data.length-1)
          ? item = {status: dataStatus, name: qrData}
          : item
      });
     
    this.setState({ data: data });
  }

  icon(status) {
    switch(status){
      case 0: return 'arrow-up';
      case 2: return 'arrow-down';
      case 1: return 'done-all';
    }
  }

  popup(status) {
    switch(status){
      case 0: return 'A thing in progress';
      case 2: return 'Failed submission';
      case 1: return 'Scanned text data ready to be sent';
    }
  };

  modal(status) {
    Alert.alert(
      '',
      this.popup(status),
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: true }
    );
  }

  render() {
    const defaultDesc = [
      {status: 0, name: 'A thing in progress'},
      {status: 1, name: 'Scanned text data ready to be sent'},
      {status: 2, name: 'Failed submission'}
    ];
    const data = this.state.data.length > 0 ? this.state.data : defaultDesc;
    const date = new Date().getDate(); //Current Date
    const month = new Date().getMonth() + 1; //Current Month
    const year = new Date().getFullYear(); //Current Year
    return (
      <ScrollView>
        <Content>
          <List>
            { data.map((item, index) => {
              return (
                <ListItem key={index} onPress={() => this.modal(item.status)} avatar>
                  <Left>
                    <TabBarIcon
                      name={
                        Platform.OS === 'ios'
                          ? `ios-${this.icon(item.status)}`
                          : `md-${this.icon(item.status)}`
                      }
                    />
                  </Left>

                  <Body>
                    <Text note>{item.name}</Text>
                  </Body>
                  <Right>
                    <Text note>{date + '/' + month + '/' + year}</Text>
                  </Right>
                </ListItem>
              )
            })}
            
          </List>
        </Content>
      </ScrollView>
    );
  }
}


LinksComponent.navigationOptions = {
  title: 'History',
};
