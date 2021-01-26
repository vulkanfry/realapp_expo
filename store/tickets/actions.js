import { TICKET_FETCHED, TICKET_FETCHING, QR_DATA_SAVE } from './types';
import { FETCH_TICKET_ERROR, HTTP_ERROR } from '../types';
import { camelizeKeys } from 'humps';

const checkQr = ({qrDatas, data, dispatch}) => {
  return (!data || (data && qrDatas.includes(data))) ? null : dispatch({type: QR_DATA_SAVE, qr: data });
}

export function fetchTickets(data, server) {
  return async (dispatch, getState) => {
    if(!checkQr({qrDatas: getState().qrDatas, data, dispatch})) return;
    const asyncFetch = await fetchAsync({ data, server, dispatch });
    return dispatch({status: asyncFetch.status, respBody: asyncFetch.respBody, type: TICKET_FETCHED });
  };
};

async function fetchAsync({data, server, dispatch}) {
  try {
    dispatch({type: TICKET_FETCHING });
    const asyncFetch = await fetchData({data, server, dispatch});
    return asyncFetch;
  } catch (error) {
    dispatch({ type: HTTP_ERROR, subtype: FETCH_TICKET_ERROR, error: error.message });
  };
}

const fetchData = async ({data, server, dispatch}) => {
  try {
    const response = await fetch(server + data, { redirect: 'manual' });
    return await fetchApiData({url: response.url, dispatch});
  } catch (error) {
    dispatch({ type: HTTP_ERROR, subtype: FETCH_TICKET_ERROR, error: error.message });
  }
}

const fetchApiData = async ({url, dispatch}) => {
  const newUrl = url.replace(/ticket/, 'api/tickets/ticket')
  try {
    const resp = await fetch(newUrl);
    const body = await resp.json();
    return { status: 1, respBody: camelizeKeys(body) };
  } catch (error) {
    dispatch({ type: HTTP_ERROR, subtype: FETCH_TICKET_ERROR, error: error.message });
  }
}