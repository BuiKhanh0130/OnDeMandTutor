import classNames from 'classnames/bind';

import styles from './Button.module.scss';

import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Button({
    children,
    orange,
    primary,
    rounded,
    small,
    medium,
    large,
    disable,
    active,
    transparent,
    className,
    onClick,
    to,
    href,
    ...passProps
}) {
    let Comp = 'button';

    const props = {
        onClick,
        ...passProps,
    };

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        [className]: className,
        orange,
        primary,
        rounded,
        small,
        medium,
        large,
        disable,
        active,
        transparent,
    });

    return (
        <Comp className={classes} {...props}>
            <span>{children}</span>
        </Comp>
    );
}

export default Button;
