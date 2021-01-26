import * as React from 'react';
import { connect } from 'react-redux';
import Item from '../components/Item';
import _ from 'lodash';
import moment from 'moment';

function mapStateToProps(state, ownProps) {
  const { ticketDetails } = state;
  const { item } = ownProps;
  const status = item === 1 ? 0 : 1;
  const orgTitle = ticketDetails[item].orgTitle;
  const date = moment(ticketDetails[item].ticket.transactionDate).format('DD/MM/YY');
  return {
    status,
    date,
    orgTitle
  };
};

export class ItemContainer extends React.Component {
  render() {
    const { orgTitle, date, status } = this.props;
    return (
      <Item
        date={date}
        status={status}
        orgTitle={orgTitle}
      />
    );
  };
}

export default connect(mapStateToProps)(ItemContainer);
