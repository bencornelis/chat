import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import * as R from 'ramda';

const GET = 'GET';
const POST = 'POST';

const REQUEST_PARAMS = [ 'method', 'body' ];

const _ajax = ({ path, authToken, ...params }) => {
  let headers = { 'Content-Type': 'application/json' };
  if (authToken) {
    headers = {
      ...headers,
      'Authorization': `Bearer ${authToken}`
    };
  }

  const requestParams = R.pick(REQUEST_PARAMS)(params);

  return ajax({
    url: `${process.env.REACT_APP_API_URL}${path}`,
    headers,
    ...requestParams
  }).pipe(
    map(ajaxResponse => ajaxResponse.response)
  );
}

export const ajaxGet = ({ path, authToken }) => {
  return _ajax({ method: GET, path, authToken })
};

export const ajaxPost = ({ path, authToken, body }) => {
  return _ajax({ method: POST, path, authToken, body })
};
