import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';

import styles from './Menu.module.scss';

import Popper from '~/component/Popper';
import MenuItem from './MenuItem';

const cx = classNames.bind(styles);

function Menu({ children, items, className, ...passProps }) {
    const handleRender = () => {
        return items.map((item, index) => {
            return <MenuItem key={index} item={item} />;
        });
    };
    return (
        <HeadlessTippy
            //truyền các props từ bên ngoài vào
            {...passProps}
            interactive
            // visible={true}
            delay={[0, 0]}
            offset={[10, 5]}
            placement="bottom"
            render={(attrs) => (
                <div className="box" tabIndex="-1" {...attrs}>
                    <Popper>
                        <div className={cx('container')}>{handleRender()}</div>
                    </Popper>
                </div>
            )}
        >
            {children}
        </HeadlessTippy>
    );
}

export default Menu;
