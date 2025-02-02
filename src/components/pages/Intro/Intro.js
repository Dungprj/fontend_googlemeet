import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import createSignalRConnection from '../../../Services/signalRService';
import classNames from 'classnames/bind';
import styles from './Intro.module.scss';
import * as signalR from '@microsoft/signalr';

const cx = classNames.bind(styles);

function Intro() {
    return (
        <div>
            <h1>Intro</h1>
        </div>
    );
}

export default Intro;
