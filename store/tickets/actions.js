import { TICKET_FETCHED, TICKET_FETCHING } from './types';
import { camelizeKeys } from 'humps';

export function fetchTickets(data, server) {
  return async (dispatch) => {
    const asyncFetch = await fetchAsync({ data, server, dispatch });
    return dispatch({status: asyncFetch.status, respBody: asyncFetch.respBody, type: TICKET_FETCHED });
  };
};

async function fetchAsync({data, server, dispatch}) {
  try {
    dispatch({type: TICKET_FETCHING });
    const asyncFetch = await fetchData(data, server);
    return asyncFetch;
  } catch (error) {
    // dispatch({ type: HTTP_ERROR, subtype: fetchError, error: error.message });
  };
}

const fetchData = async (data, server) => {
  try {
    const response = await fetch(server + data, { redirect: 'manual' });
    return await fetchApiData(response.url);
  } catch (error) {
    console.error(error);
  }
}

const fetchApiData = async (url) => {
  const newUrl = url.replace(/ticket/, 'api/tickets/ticket')
  try {
    const resp = await fetch(newUrl);
    const body = await resp.json();
    return { status: 1, respBody: camelizeKeys(body) };
  } catch (error) {
    console.error(error);
  }
}