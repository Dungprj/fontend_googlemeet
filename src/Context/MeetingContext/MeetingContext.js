import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import config from '~/config';

import Tab from '~/enums';
// @function  UserContext
const MeetingContext = React.createContext({
    TabPanel: false,
    [Tab.Detail]: false,
    [Tab.Message]: false
});

const MeetingProvider = ({ children }) => {
    const [nav, setNav] = React.useState({
        TabPanel: false,
        [Tab.Detail]: false,
        [Tab.Message]: false
    });

    useEffect(() => {}, []);

    const openTab = tab => {
        console.log('trang thai khi dung toggle tab ', nav.TabPanel);
        console.log('chuan sang trang thai ', tab);
        setNav(prev => ({
            [Tab.Detail]: false,
            [Tab.Message]: false,
            TabPanel: true,
            [tab]: true // Chỉ mở tab được chọn
        }));
    };

    const toggleTabPanel = () => {
        console.log('trang thai toggle tab ', nav.TabPanel);
        setNav(prev => ({
            TabPanel: !prev.TabPanel
        }));
    };

    return (
        <MeetingContext.Provider value={{ nav, openTab, toggleTabPanel }}>
            {children}
        </MeetingContext.Provider>
    );
};
export { MeetingContext, MeetingProvider };
