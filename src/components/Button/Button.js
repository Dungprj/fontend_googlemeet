import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';
import React, { forwardRef } from 'react';

const cx = classNames.bind(styles);

const Button = forwardRef(
    (
        {
            to,
            href,
            children,
            text = false,
            rounded = false,
            disable,
            primary = false,
            outline = false,
            gray = false,
            small = false,
            large = false,
            outlinever1 = false,
            className,
            onClick,
            leftIcon,
            rightIcon,
            ...passProps
        },
        ref
    ) => {
        let Comp = 'button'; // Đảm bảo mặc định là 'button' để tránh lỗi với Tippy.js

        const props = {
            ref, // Truyền ref vào đây
            onClick,
            ...passProps
        };

        if (disable) {
            Object.keys(props).forEach(key => {
                if (key.startsWith('on') && typeof props[key] === 'function') {
                    delete props[key];
                }
            });
        }

        if (to) {
            props.to = to;
            Comp = Link;
        } else if (href) {
            props.href = href;
            Comp = 'a';
        }

        const classes = cx('wrapper', {
            [className]: className,
            primary,
            outline,
            gray,
            text,
            disable,
            rounded,
            small,
            large,
            disable,
            outlinever1,
            rightIcon,
            leftIcon
        });

        return (
            <Comp className={classes} {...props}>
                {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
                <span className={cx('title')}>{children}</span>
                {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
            </Comp>
        );
    }
);

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    children: PropTypes.node.isRequired,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    text: PropTypes.bool,
    rounded: PropTypes.bool,
    disable: PropTypes.bool,
    small: PropTypes.bool,
    outlinever1: PropTypes.bool,
    large: PropTypes.bool,
    className: PropTypes.string,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    onClick: PropTypes.func
};

export default Button;
