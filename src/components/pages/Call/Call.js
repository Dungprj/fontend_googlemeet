import React, { useEffect, useState, useRef } from 'react';
import Video from '~/components/Video';
import classNames from 'classnames/bind';
import styles from './Call.module.scss';
import {
    GetVideos,
    testAuthor,
    Renewtoken,
    getDataFile
} from '~/Services/UserService';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function Call() {
    <>
        <div>Call page</div>
    </>;
}

export default Call;
