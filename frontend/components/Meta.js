import Head from 'next/head';

export default function Meta({ title, description }) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="keywords" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
    )
}

Meta.defaultProps = {
    title: "Ravendel",
    description: "E-commerce Platform"
}