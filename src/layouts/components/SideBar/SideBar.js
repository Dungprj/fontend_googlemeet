import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import config from '~/config';

import Menu, { MenuItem } from './Menu';

import {
    HomeIcon,
    UserGroupIcon,
    LiveIcon,
    HomeActiveIcon,
    UserGroupActiveIcon,
    LiveActiveIcon
} from '~/components/Icons';
import SuggestedAcoutnts from '~/components/SuggestedAcoutnts';

const cx = classNames.bind(styles);

function SideBar() {
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem
                    title='For your'
                    to={config.routes.home}
                    icon={<HomeIcon />}
                    activeIcon={<HomeActiveIcon />}
                />

                <MenuItem
                    title='Following'
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />

                <MenuItem
                    title='LIVE'
                    to={config.routes.live}
                    icon={<LiveIcon />}
                    activeIcon={<LiveActiveIcon />}
                />
            </Menu>

            <SuggestedAcoutnts label={'Suggested accounts'} />

            {/* <SuggestedAcoutnts label={'Following accounts'} /> */}
        </aside>
    );
}

export default SideBar;
