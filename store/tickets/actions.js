import { TICKET_FETCHED, TICKET_FETCHING } from './types';
import { camelizeKeys } from 'humps';

export function fetchTickets(data, server) {
  console.log(222, data, server)
  return async (dispatch) => {
    console.log(dispatch)
    dispatch({type: TICKET_FETCHING });
    const asyncFetch = await fetchAsync({ data, server, dispatch});
    console.log(asyncFetch)
    return dispatch({status: asyncFetch.status, respBody: asyncFetch.respBody, type: TICKET_FETCHED });
  };
};

async function fetchAsync(data, server, dispatch) {
  console.log(4, dispatch)
  try {
    return await fetchData(data, server, dispatch);
  } catch (error) {
    // dispatch({ type: HTTP_ERROR, subtype: fetchError, error: error.message });
    console.log(error)
  };
}

const fetchData = async (data, server) => {
  console.log(555)
  try {
    const response = await fetch(server + data, { redirect: 'manual' });
    return await fetchApiData(response.url);
  } catch (error) {
    console.error(error);
  }
}

const fetchApiData = async (url, index) => {
  const newUrl = url.replace(/ticket/, 'api/tickets/ticket')
  try {
    const resp = await fetch(newUrl);
    const status = await resp.json();
    return { status, respBody: camelizeKeys(body) };
  } catch (error) {
    console.error(error);
  }
}