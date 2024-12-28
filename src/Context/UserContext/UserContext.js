import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import config from '~/config';
// @function  UserContext
const UserContext = React.createContext({
    email: '',
    auth: false,

    idVideoPlaying: null
});

// @function  UserProvider
// Create function to provide UserContext
const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState({
        email: '',
        auth: false,

        idVideoPlaying: null
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');

        if (token && email) {
            setUser(user => ({
                email: email,
                token: token,
                auth: true
            }));
        }
    }, []);

    const PlayVideo = idVideo => {
        setUser(prev => {
            return { ...prev, idVideoPlaying: idVideo };
        });
    };

    const PlauseVideo = () => {
        setUser(prev => {
            return { ...prev, idVideoPlaying: null };
        });
    };

    const loginContext = (email, token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);

        setUser(user => ({
            email: email,
            token: token,
            auth: true
        }));
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');

        setUser(user => ({
            email: '',
            auth: false
        }));
    };

    return (
        <UserContext.Provider
            value={{ user, loginContext, logout, PlayVideo, PlauseVideo }}
        >
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
