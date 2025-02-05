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

    const toggleTab = tab => {
        console.log('trang thai khi dung toggle tab ', nav.TabPanel);
        console.log('chuan sang trang thai ', tab);
        setNav(prev => ({
            [Tab.Detail]: false,
            [Tab.Message]: false,
            TabPanel: !prev[tab],
            [tab]: !prev[tab]
        }));
    };

    const closeTabPanel = () => {
        console.log('trang thai toggle tab ', nav.TabPanel);
        setNav(prev => ({
            TabPanel: !prev.TabPanel
        }));
    };

    return (
        <MeetingContext.Provider value={{ nav, toggleTab, closeTabPanel }}>
            {children}
        </MeetingContext.Provider>
    );
};
export { MeetingContext, MeetingProvider };
