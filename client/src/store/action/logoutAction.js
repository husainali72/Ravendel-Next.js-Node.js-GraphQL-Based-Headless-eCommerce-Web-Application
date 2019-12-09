import cookie from 'react-cookies'

const LogoutAction = (props) => {
  return async dispatch => {
      dispatch({type:'USER_LOGIN', payload:false})
      cookie.remove('user', props.history.push('/login'));
  };
};

export default LogoutAction;