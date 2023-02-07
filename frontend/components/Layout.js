import Meta from './Meta';
import Footer from './Footer';
import Header from './Header';
import store from '../redux/store';
import { Provider } from 'react-redux';

export default function Layout({ children}) {
    return (
        <Provider store={store}>
            <Meta />
            <Header      />
            <div className='main-wrapper'>
                <main>
                    {children}
                </main>
            </div>
            <Footer />
        </Provider>
    )
}