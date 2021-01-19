import * as React from 'react';
import { connect } from 'react-redux';
import LinkScreen from '../screens/LinksScreen';
import _ from 'lodash';
import { fetchTickets } from '../store/tickets/actions';

function mapStateToProps(state, ownProps) {
  const { tickets } = state;
  console.log(ownProps)
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

  render() {
    const { tickets, server, qrData } = this.props;
    console.log(qrData, server)
    return (
      <LinkScreen
        fetchTickets={this.fetch.bind(this)}
        tickets={tickets}
        qrData={qrData}
      />
    );
  };
}

export default connect(mapStateToProps)(LinksScreenContainer);
