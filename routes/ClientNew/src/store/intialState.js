import cookie from 'react-cookies';

const IntialState = {
    // login: localStorage.getItem('user') ? true : false,
    login: cookie.load('user') ? true : false,
}

export default IntialState;