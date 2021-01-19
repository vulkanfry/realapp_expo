import _ from 'lodash';
import { popup } from '../../constants/Data';
import { TICKET_FETCHED, TICKET_FETCHING } from './types';
import moment from 'moment';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
  case TICKET_FETCHING:
    let data = [...state];
    data.push({ status: 0, name: popup(0) });
    
    return data;
  case TICKET_FETCHED:
    const { status, respBody } = action;
    console.log(action)
    const index  = state.length - 1;
    data = [...state];

    if (status !== 2) {
      const fullDate = moment(respBody.ticket.transactionDate);
      data[index] = ({
        status,
        name: respBody['orgTitle'],
        date: fullDate.format('DD/MM/YYYY')
      });
    }
    else
      data[index] = ({ status, name: popup(status) })
    
    return data;
  default:
    return state;
  }
};