import React from 'react';
import { ActivityIndicator, Platform, Alert } from 'react-native';
import { ListItem, Left, Body, Right, Text } from 'native-base';
import { icon } from '../constants/Data';
import TabBarIcon from './TabBarIcon';

export default function Item(props) {
  const { date, status, orgTitle } = props;
  return (
    <ListItem onPress={() => props.onOpenModal(status)} avatar>
      <Left>
        {status === 1
          ? <TabBarIcon
            name={
              Platform.OS === 'ios'
                ? `ios-${icon(status)}`
                : `md-${icon(status)}`
            }
          />
          : <ActivityIndicator size="small" color="#0000ff" />
        }
      </Left>

      <Body>
        <Text note>{orgTitle}</Text>
      </Body>
      <Right>
        <Text note>{date}</Text>
      </Right>
    </ListItem>
  );
}
