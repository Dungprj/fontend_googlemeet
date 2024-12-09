import { useContext, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser, GetVideos, DeleteVideos } from '~/Services/UserService';

import classNames from 'classnames/bind';
import styles from './TableUsers.module.scss';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './Modal/Add';
import ModalEditUser from './Modal/Edit';
import ModalComfirm from './Modal/Comfirm';

import '@fortawesome/fontawesome-free/css/all.min.css';
import { useDebounce } from '~/hooks';

import { CSVLink, CSVDownload } from 'react-csv';

import Papa from 'papaparse';
import { toast } from 'react-toastify';

import _ from 'lodash';
import { UserContext } from '~/Context/UserContext';

const cx = classNames.bind(styles);

function TableVideos(props) {
    const [listVideo, setListVideos] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setToTalPages] = useState(0);

    const [isUpDate, setIsUpDate] = useState(true);

    const { user } = useContext(UserContext);

    //modal

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});
    const [dataUserDelete, setDataUserDelete] = useState({});

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);

    const [sortBy, setSortBy] = useState('asc');

    const [sortField, setSortField] = useState('id');

    const [listUsersTmp, setListUsersTmp] = useState([]);

    const [keyWord, setKeyWord] = useState('');
    const debouncedValue = useDebounce(keyWord, 500);

    const [dataExport, setDataExport] = useState([]);

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    };

    const GetListVideos = async () => {
        let res = await GetVideos();

        if (res) {
            setListVideos(res.data);
        }
    };

    const handleDelete = async id => {
        let res = await DeleteVideos(id);

        if (res && res.statuscode === 200) {
            let listVideoClone = [...listVideo];

            let result = listVideoClone.filter(video => video.id !== id);

            setListVideos(result);
            toast.success(res.data);

            setIsUpDate(true);
        } else {
            toast.error('Deleted videos Failed');
        }
    };

    useEffect(() => {
        if (isUpDate) {
            GetListVideos();
            setIsUpDate(false);
        }
    }, [isUpDate]);

    return (
        <>
            <div className={cx('add-new', 'my-3', 'd-sm-flex')}>
                <span className={cx('c')}>List Video:</span>
            </div>

            <div className='col-4 my-3'>
                <input
                    value={keyWord}
                    className={cx('form-control')}
                    placeholder='Search user by email ...'
                ></input>
            </div>

            <div className={cx('customize-table')}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className={cx('sort-header')}>
                                <span>ID</span>
                                <span>
                                    <i
                                        onClick={() => {}}
                                        className='fa-solid fa-arrow-down-long'
                                    ></i>
                                    <i
                                        onClick={() => {}}
                                        className='fa-solid fa-arrow-up-long'
                                    ></i>
                                </span>
                            </th>
                            <th>Title</th>
                            <th className={cx('sort-header')}>
                                <span>Description</span>
                                <span>
                                    <i
                                        onClick={() => {}}
                                        className='fa-solid fa-arrow-down-long'
                                    ></i>
                                    <i
                                        onClick={() => {}}
                                        className='fa-solid fa-arrow-up-long'
                                    ></i>
                                </span>
                            </th>
                            <th>Upload Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listVideo &&
                            listVideo.length > 0 &&
                            listVideo.map((item, index) => {
                                return (
                                    <tr key={`user-${index}`}>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                        <td>{item.uploadDate}</td>
                                        <td>
                                            <button
                                                onClick={() => {}}
                                                className='btn btn-warning mx-3'
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => {
                                                    handleDelete(item.id);
                                                }}
                                                className='btn btn-danger'
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default TableVideos;
