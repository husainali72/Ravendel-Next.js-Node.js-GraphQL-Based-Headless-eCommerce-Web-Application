import { get } from 'lodash';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
const brandTitle = process.env.NEXT_PUBLIC_BRAND_TITLE || "";

export default function Meta({ title, description, keywords }) {
  const settings = useSelector((state) => state.setting);

  // Use default values if title or description are not provided
  const siteTitle = get(settings, 'setting.seo.meta_title', brandTitle);
  const metaDescription = description || get(settings, 'setting.seo.meta_description', brandTitle);

  return (
    <Head>
      <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
}

Meta.defaultProps = {
  title: '',
  description: '',
  keywords: '',
};

Meta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
};
