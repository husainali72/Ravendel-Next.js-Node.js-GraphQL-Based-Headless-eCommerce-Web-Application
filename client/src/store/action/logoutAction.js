import cookie from 'react-cookies';
import {client_app_route_url} from '../../utils/helper';

const LogoutAction = (props) => {
  return async dispatch => {
      dispatch({type:'USER_LOGIN', payload:false})
      cookie.remove('user', props.history.push(`${client_app_route_url}login`));
  };
};

export default LogoutAction;