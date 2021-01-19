import React, { Component } from 'react';
import { camelizeKeys } from 'humps';
import { ScrollView, Platform, Alert } from 'react-native';
import { Content, List, ListItem, Left, Body, Right, Text } from 'native-base';
import TabBarIcon from '../components/TabBarIcon';
import moment from 'moment';

export default class LinksComponent extends Component {
  state = {
    data: [],
    respBody: {}
  };

  async componentDidMount() {
    const server = this.props.screenProps.server;
    const qrData = this.props.navigation.getParam('qrData', null).replace(server, '');
    if (qrData !== null) {
      let data = [...this.state.data];
      data.push({ status: 0, name: this.popup(0) });
      this.setState({ data });
      this.fetchData(qrData, server, data.length - 1);
    }
  }

  async fetchData(data, server, index) {
    return fetch(server + data, { redirect: 'manual' })
      .then((response) => this.fetchApiData(response.url, index))
      .catch((error) => {
        console.error(error);
      });
  }

  async fetchApiData(url, index) {
    const newUrl = url.replace(/ticket/, 'api/tickets/ticket')
    return fetch(newUrl)
      .then((resp) => resp.json())
      .then((body) => this.setState({ respBody: camelizeKeys(body) }))
      .then((_body) => this.setData(resp.ok ? 1 : 2, index))
      .catch((error) => {
        this.setData(2, index)
        console.error(error);
      });
  }

  async setData(status, index) {
    let data = [...this.state.data];
    if (status !== 2) {
      const fullDate = moment(this.state.respBody.ticket.transactionDate);
      data[index] = ({
        status,
        name: this.state.respBody['orgTitle'],
        date: fullDate.format('DD/MM/YYYY')
      });
    }
    else
      data[index] = ({ status, name: popup(status) })
    this.setState({ data });
  }

  icon(status) {
    switch (status) {
      case 0: return 'arrow-up';
      case 2: return 'arrow-down';
      case 1: return 'done-all';
    }
  }

  popup(status) {
    switch (status) {
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
    const date = moment(new Date().getDate().toString()).format('DD/MM/YYYY'); //Current Date
    const defaultDesc = [
      { status: 0, name: 'A thing in progress', date },
      { status: 1, name: 'Scanned text data ready to be sent', date },
      { status: 2, name: 'Failed submission', date }
    ];
    console.log(this.state.data)
    const data = this.state.data.length > 0 ? this.state.data : defaultDesc;

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
                          ? `ios-${this.icon(item.status)}`
                          : `md-${this.icon(item.status)}`
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
