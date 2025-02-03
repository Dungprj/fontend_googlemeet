import Tippy from '@tippyjs/react/headless';
import { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper/';
import Header from './Header';
import React from 'react';
import MenuItem from './MenuItem';
import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';
import config from '~/config';
import { toast } from 'react-toastify';
import { UserContext } from '~/Context/UserContext';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({
    children,
    items = [],
    hideOnClick = false,
    onChange = defaultFn
}) {
    const [history, setHistory] = useState([{ data: items }]);
    const currentItem = history[history.length - 1];
    const { logout } = React.useContext(UserContext);

    const [visible, setVisible] = useState(false);
    const handleToggle = () => {
        setVisible(prev => !prev);
    };
    /*
        history = 
        [
            {
                data : [{},{},{}]
                
            }
            //children
            {
                data:[{},{},{}]
            }
        
        ]


    */

    const navigate = useNavigate();

    const handleLogout = () => {
        const tokenCurrent = localStorage.getItem('token');
        if (tokenCurrent) {
            logout();
            toast.success('Logout was successful');
            navigate(config.routes.login);
        }
    };
    const current = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory(prev => {
                                return [...prev, item.children];
                            });
                        } else {
                            if (item.title === 'Log out') {
                                handleLogout();
                            }
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    const handleBack = () => {
        setHistory(prev => prev.slice(0, prev.length - 1));
    };

    const renderResult = attrs => (
        <div className={cx('menu-list')} tabIndex='-1' {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                {history.length > 1 && (
                    <Header title={currentItem.title} onBack={handleBack} />
                )}
                <div className={cx('menu-body')}>{renderItems()}</div>
            </PopperWrapper>
        </div>
    );

    //reset to first page

    const handleResetMenu = () => {
        setHistory(prev => {
            return prev.slice(0, 1);
        });
    };

    return (
        <Tippy
            visible={visible}
            onClickOutside={() => setVisible(false)} // Click ra ngoài sẽ đóng
            hideOnClick={hideOnClick}
            interactive={true}
            delay={[0, 800]}
            offset={[200, -50]}
            placement='bottom-end'
            render={renderResult}
            onHidden={handleResetMenu}
        >
            {<div onClick={handleToggle}>{children}</div>}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func
};

export default Menu;
