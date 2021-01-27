import { TICKET_FETCHED, TICKET_FETCHING, QR_DATA_SAVE } from './types';
import { FETCH_TICKET_ERROR, HTTP_ERROR } from '../types';
import { camelizeKeys } from 'humps';
import _ from 'lodash';

const checkQr = ({ qrDatas, dataFetched, data }) => {
  const index = _.findIndex(qrDatas, function (o) { return o == data; });
  return (index < 0 || dataFetched[index]) ? null : index;
}

export function fetchTickets(data, server) {
  return async (dispatch, getState) => {
    const qrIndex = checkQr({ qrDatas: getState().qrDatas, dataFetched: getState().ui.qrDataFetched, data });
    console.log(qrIndex)
    if (_.isNull(qrIndex)) return;
    const asyncFetch = await fetchAsync({ data, server, dispatch, qrIndex });
    return dispatch({ status: asyncFetch.status, respBody: asyncFetch.respBody, type: TICKET_FETCHED });
  };
};

async function fetchAsync({ data, server, dispatch, qrIndex }) {
  try {
    dispatch({ type: TICKET_FETCHING, qrIndex });
    const asyncFetch = await fetchData({ data, server, dispatch });
    return asyncFetch;
  } catch (error) {
    dispatch({ type: HTTP_ERROR, subtype: FETCH_TICKET_ERROR, error: error.message });
  };
}

const fetchData = async ({ data, server, dispatch }) => {
  try {
    const response = await fetch(server + data, { redirect: 'manual' });
    return await fetchApiData({ url: response.url, dispatch });
  } catch (error) {
    dispatch({ type: HTTP_ERROR, subtype: FETCH_TICKET_ERROR, error: error.message });
  }
}

const fetchApiData = async ({ url, dispatch }) => {
  const newUrl = url.replace(/ticket/, 'api/tickets/ticket')
  try {
    const resp = await fetch(newUrl);
    const body = await resp.json();
    return { status: 1, respBody: camelizeKeys(body) };
  } catch (error) {
    dispatch({ type: HTTP_ERROR, subtype: FETCH_TICKET_ERROR, error: error.message });
  }
}