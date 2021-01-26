import React from 'react';
import { ActivityIndicator, Platform, Alert } from 'react-native';
import { ListItem, Left, Body, Right, Text } from 'native-base';
import { icon, popup } from '../constants/Data';
import TabBarIcon from './TabBarIcon';

function modal(status) {
  Alert.alert(
    '',
    popup(status),
    [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ],
    { cancelable: true }
  );
}

export default function Item(props) {
  const { date, status, orgTitle } = props;
  return (
    <ListItem onPress={() => modal(status)} avatar>
      <Left>
        <TabBarIcon
          name={
            Platform.OS === 'ios'
              ? `ios-${icon(status)}`
              : `zmdi-${icon(status)}`
          }
        />
      </Left>
      <ActivityIndicator size="small" color="#0000ff" />
      <Body>
        <Text note>{orgTitle}</Text>
      </Body>
      <Right>
        <Text note>{date}</Text>
      </Right>
    </ListItem>
  );
}
