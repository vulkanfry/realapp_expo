import * as React from 'react';
import { connect } from 'react-redux';
import Item from '../components/Item';
import _ from 'lodash';
import moment from 'moment';
import Modal from '../components/Modal';
import { collapsePopup } from '../store/ui/itemPopup/actions';

function mapStateToProps(state, ownProps) {
  const { ticketDetails } = state;
  const popupOpened = state.ui.popupOpened.popup.opened;
  const { item } = ownProps;
  const status = item === 1 ? 0 : 1;
  const orgTitle = ticketDetails[item].orgTitle;
  const date = moment(ticketDetails[item].ticket.transactionDate).format('DD/MM/YY');
  return {
    status,
    date,
    orgTitle,
    popupOpened
  };
};

export class ItemContainer extends React.Component {
  render() {
    const { orgTitle, date, status, popupOpened, dispatch } = this.props;
    return (
      <div>
        <Modal opened = {popupOpened} onClose={e => dispatch(collapsePopup())}/>
        <Item
          date={date}
          status={status}
          orgTitle={orgTitle}
          onOpenModal={e => dispatch(collapsePopup())}
        />
      </div>
    );
  };
}

export default connect(mapStateToProps)(ItemContainer);
