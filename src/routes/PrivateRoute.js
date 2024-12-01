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
                          <Alert.Heading>
                              Oh snap! You got an error!
                          </Alert.Heading>
                          <p>
                              Change this and that and try again. Duis mollis,
                              est non commodo luctus, nisi erat porttitor
                              ligula, eget lacinia odio sem nec elit. Cras
                              mattis consectetur purus sit amet fermentum.
                          </p>
                      </Alert>
                  )}
        </>
    );
}

export default PrivateRoute;
