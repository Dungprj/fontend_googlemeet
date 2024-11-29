import TableUsers from './components/TableUsers/TableUsers';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div style={{ height: 2000 }}>
            <TableUsers />
        </div>
    );
}

export default Home;
