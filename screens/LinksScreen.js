import React, { Component } from 'react';
import { ScrollView, Platform, Alert } from 'react-native';
import { Content, List, ListItem, Left, Body, Right, Text } from 'native-base';
import TabBarIcon from '../components/TabBarIcon';
import { dataDefaults, icon, popup } from '../constants/Data';
import ItemContainer from '../containers/ItemContainer';
import moment from 'moment';

export default class LinksComponent extends Component {
  state = {
    data: [],
    respBody: {}
  };

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
    const data = this.props.tickets;
    return (
      <ScrollView>
        <Content>
          <List>
            {data.map((item, index) => {
              return (
                <ItemContainer key={index} item={item} />
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
