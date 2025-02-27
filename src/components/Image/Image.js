import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';
import classNames from 'classnames';
import images from '~/assets/images';
import styles from './Image.module.scss';

const cx = classNames.bind(styles);

const Image = forwardRef(
    (
        {
            src,
            alt,
            circle = false,
            className,
            fallback: customFallback = images.noImage,
            ...props
        },
        ref
    ) => {
        const [fallback, setFallback] = useState('');

        const handleError = () => {
            setFallback(customFallback);
        };

        const classes = cx('wrapper', {
            [className]: className,
            circle
        });

        return (
            <img
                className={cx('wrapper', classes)}
                {...props}
                ref={ref}
                src={fallback || src}
                alt={alt}
                {...props}
                onError={handleError}
            />
        );
    }
);

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallback: PropTypes.string
};

export default Image;
