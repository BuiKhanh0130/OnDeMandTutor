import { useState, forwardRef } from 'react';

import PropTypes from 'prop-types';

import images from '~/assets/images';

const Image = forwardRef(
    ({ src, alt, className, fallback: customFallback = images.NoImage, width, height, ...props }, ref) => {
        const [fallback, setFallback] = useState('');
        const handleError = () => {
            setFallback(customFallback);
        };
        return <img ref={ref} src={fallback || src} alt={alt} className={className} onError={handleError} />;
    },
);

Image.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    classNames: PropTypes.string,
    fallback: PropTypes.string,
};

export default Image;
