import { get } from 'lodash';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
export default function Meta( { title, description } ) {
    const settings=useSelector((state)=>state.setting)
    return (
        <Head>
            <title>{title||get(settings,'setting.seo.meta_title','Ravendel')}</title>
            <meta name="keywords" content={description||get(settings,'setting.seo.meta_description','Ravendel')} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
    );
}

Meta.defaultProps = {
    title: '',
    description: ''
};
Meta.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
};