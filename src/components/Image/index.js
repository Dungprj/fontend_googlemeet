import { useState, forwardRef } from 'react';
import images from '~/assets/images';
import classNames from 'classnames';

import styles from './Image.module.scss';

function Image({ src, className, fallback: customFallback = images['noImage'], alt, ...props }, ref) {
    const [fallBack, setFallBack] = useState('');

    const handleError = () => {
        setFallBack(customFallback);
    };

    return (
        <img
            className={classNames(styles.wrapper, className)}
            src={fallBack || src}
            alt={alt}
            ref={ref}
            {...props}
            onError={handleError}
        />
    );
}

export default forwardRef(Image);
