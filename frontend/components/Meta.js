import Head from 'next/head';
import PropTypes from 'prop-types';
export default function Meta( { title, description } ) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="keywords" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
    );
}

Meta.defaultProps = {
    title: 'Ravendel',
    description: 'E-commerce Platform'
};
Meta.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
};