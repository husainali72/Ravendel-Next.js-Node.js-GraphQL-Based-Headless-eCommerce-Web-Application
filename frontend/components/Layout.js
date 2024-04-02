import Meta from './Meta';
import Footer from './Footer';
import Header from './Header';
import store from '../redux/store';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
export default function Layout( { children, setOpenMenu } ) {
    return (
        <Provider store={store}>
            <Meta />
            <Header setOpenMenu={setOpenMenu} />
            <div className='main-wrapper'>
                <main>
                    {children}
                </main>
            </div>
            <Footer />
        </Provider>
    );
}
Layout.propTypes = {
    children: PropTypes.node.isRequired,
    setOpenMenu: PropTypes.func.isRequired,
};