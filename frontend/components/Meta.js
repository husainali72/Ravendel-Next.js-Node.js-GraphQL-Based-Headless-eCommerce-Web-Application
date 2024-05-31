import { get } from "lodash";
import Head from "next/head";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
export default function Meta({ title, description, keywords }) {
  const settings = useSelector((state) => state.setting);
  return (
    <Head>
      <title>
        {title
          ? `${title} | Ravendel `
          : get(settings, "setting.seo.meta_title", "Ravendel")}
      </title>
      <meta
        name="description"
        content={
          description ||
          get(settings, "setting.seo.meta_description", "Ravendel")
        }
      />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
}

Meta.defaultProps = {
  title: "",
  description: "",
  keywords: "",
};
Meta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
};
