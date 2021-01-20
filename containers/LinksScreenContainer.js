import * as React from 'react';
import { connect } from 'react-redux';
import LinkScreen from '../screens/LinksScreen';
import _ from 'lodash';
import { fetchTickets } from '../store/tickets/actions';

import { withNavigationFocus } from 'react-navigation';

function mapStateToProps(state, ownProps) {
  const { tickets } = state;
  const server = ownProps.screenProps.server
  const qrData = ownProps.navigation.getParam('qrData', null)

  return {
    tickets,
    server,
    qrData: qrData ? qrData.replace(server, '') : qrData
  };
};

export class LinksScreenContainer extends React.Component {

  fetch(){
    this.props.dispatch(fetchTickets(this.props.qrData, this.props.server));
  };

  async componentDidMount() {
    if (this.props.qrData)
      this.fetch()
  }

  async componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.qrData,prevProps.qrData))
      return this.props.isFocused ? this.fetch() : null;
    return true;
  }

  render() {
    const { tickets, qrData } = this.props;
    return (
      <LinkScreen
        fetchTickets={this.fetch.bind(this)}
        tickets={tickets}
        qrData={qrData}
      />
    );
  };
}

export default withNavigationFocus(connect(mapStateToProps)(LinksScreenContainer));
