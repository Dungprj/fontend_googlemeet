import { UserContext } from '~/Context/UserContext/UserContext';
import { useContext } from 'react';
import Alert from 'react-bootstrap/Alert';

import { useState } from 'react';

function PrivateRoute({ children }) {
    const { user } = useContext(UserContext);
    const isLogin = user && user.auth;

    const [isShowAlert, setIsShowAlert] = useState(true);

    return (
        <>
            {isLogin
                ? children
                : isShowAlert && (
                      <Alert
                          variant='danger'
                          onClose={() => {
                              setIsShowAlert(false);
                          }}
                          dismissible
                      >
                          <Alert.Heading>Ôi không gặp lỗi rồi</Alert.Heading>
                          <p>Hãy đăng nhập rồi thử lại nhé</p>
                      </Alert>
                  )}
        </>
    );
}

export default PrivateRoute;
