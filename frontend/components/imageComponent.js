import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { getImage, imageOnError } from '../utills/helpers';
import { get } from 'lodash';
import PropTypes from 'prop-types';
const ProductImage = ( { src, alt, className } ) => {
  const settings = useSelector( ( state ) => state.setting );
  const [ imageStorageStatus, setImageStorageStatus ] = useState( '' );
  useEffect( () => {
    const imagetype = get( settings, 'setting.imageStorage.status' );
    setImageStorageStatus( imagetype );
  }, [ settings ] );
  return (
    <img
      className={className}
      src={getImage( src, imageStorageStatus )}
      alt={alt}
      onError={imageOnError}
    />
  );
};
ProductImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};
export default ProductImage;
