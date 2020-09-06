import {makeApiCall} from '../../wapi/api';

export const registerProfile = profile => {
  return async dispatch => {
    dispatch({type: 'REGISTER_PROFILE'});
    const response = await makeApiCall(profile, {
      url: '/api/register',
      method: 'POST',
    });
    const json = await response.json();
    if (response.ok) {
      // Save it to local storage
      // window.localStorage.setItem('BearerToken', data.user.token);
      dispatch({type: 'REGISTER_PROFILE_FULFILLED', result: json.user});
    } else {
      dispatch({type: 'REGISTER_PROFILE_REJECTED', result: {}});
    }
  };
};

export const login = details => {
  return async dispatch => {
    dispatch({type: 'LOGIN'});
    // Remove this before every login request made
    // window.localStorage.removeItem('BearerToken');
    const response = await makeApiCall(details, {
      url: '/api/login',
      method: 'POST',
    });
    const json = await response.json();
    if (response.ok) {
      // Save it to local storage
      // window.localStorage.setItem('BearerToken', data.user.token);
      dispatch({type: 'LOGIN_FULFILLED', result: json.user});
    } else {
      // window.localStorage.removeItem('BearerToken');
      dispatch({type: 'LOGIN_REJECTED', result: {}});
    }
  };
};

export const logout = () => {
  return async dispatch => {
    // window.localStorage.removeItem('BearerToken');
    dispatch({type: 'LOGOUT'});
  };
};
