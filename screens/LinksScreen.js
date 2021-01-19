import React, { Component } from 'react';
import { camelizeKeys } from 'humps';
import { ScrollView, Platform, Alert } from 'react-native';
import { Content, List, ListItem, Left, Body, Right, Text } from 'native-base';
import TabBarIcon from '../components/TabBarIcon';
import moment from 'moment';
import { dataDefaults, icon, popup } from '../constants/Data';

export default class LinksComponent extends Component {
  state = {
    data: [],
    respBody: {}
  };

  async componentDidMount() {
    const qrData = this.props.qrData;
    if (qrData !== null) {
      this.props.fetchTickets();
    }
  }

  modal(status) {
    Alert.alert(
      '',
      popup(status),
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: true }
    );
  }

  render() {
    console.log(this.props.tickets)
    const data = this.props.tickets.length > 0 ? this.state.tickets : dataDefaults;

    return (
      <ScrollView>
        <Content>
          <List>
            {data.map((item, index) => {
              return (
                <ListItem key={index} onPress={() => this.modal(item.status)} avatar>
                  <Left>
                    <TabBarIcon
                      name={
                        Platform.OS === 'ios'
                          ? `ios-${icon(item.status)}`
                          : `md-${icon(item.status)}`
                      }
                    />
                  </Left>

                  <Body>
                    <Text note>{item.name}</Text>
                  </Body>
                  <Right>
                    <Text note>{item.date}</Text>
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
