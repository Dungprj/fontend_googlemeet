import { useContext, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '~/Services/UserService';

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

function TableUsers(props) {
    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setToTalPages] = useState(0);

    const { user } = useContext(UserContext);

    console.log('uc', user);

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

    const getUsers = async page => {
        let res = await fetchAllUser(page);

        if (res && res.data) {
            setTotalUsers(res.total);
            setToTalPages(res.total_pages);
            setListUsers(res.data);
        }
    };

    const handlePageClick = event => {
        getUsers(event.selected + 1);
    };

    const handleUpdateTable = user => {
        setListUsers([user, ...listUsers]);
    };

    const handleEditUser = user => {
        setDataUserEdit(user);
        setIsShowModalEdit(true);
    };

    const handleEditUserFromModal = user => {
        let cloneListUsers = [...listUsers];
        let index = listUsers.findIndex(item => item.id === user.id);
        cloneListUsers[index].first_name = user.first_name;

        setListUsers(cloneListUsers);
        setIsShowModalEdit(false);
    };

    const handleDeleteUser = user => {
        setIsShowModalDelete(true);
        setDataUserDelete(user);
    };

    const handleDeleteUserFromModal = user => {
        let cloneListUsers = [...listUsers];
        cloneListUsers = cloneListUsers.filter(item => item.id !== user.id);

        setListUsers(cloneListUsers);
    };

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);

        let cloneListUsers = [...listUsers];
        cloneListUsers = cloneListUsers.sort((a, b) => {
            let nameA;
            let nameB;

            if (sortBy === 'asc') {
                if (
                    typeof a[sortField] === 'string' ||
                    a[sortField] instanceof String
                ) {
                    nameA = a[sortField].toUpperCase();
                    nameB = b[sortField].toUpperCase();

                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                }

                if (
                    typeof a[sortField] === 'number' ||
                    a[sortField] instanceof Number
                ) {
                    // sort by value
                    return a[sortField] - b[sortField];
                }
            } else {
                if (
                    typeof a[sortField] === 'string' ||
                    a[sortField] instanceof String
                ) {
                    nameA = a[sortField].toUpperCase();
                    nameB = b[sortField].toUpperCase();

                    if (nameA > nameB) {
                        return -1;
                    }
                    if (nameA < nameB) {
                        return 1;
                    }
                }

                if (
                    typeof a[sortField] === 'number' ||
                    a[sortField] instanceof Number
                ) {
                    // sort by value
                    return -(a[sortField] - b[sortField]);
                }
            }

            // names must be equal
            return 0;
        });

        setListUsers(cloneListUsers);
    };

    useEffect(() => {
        let cloneListUsers = [...listUsersTmp];

        if (debouncedValue) {
            console.log('loc : ', debouncedValue);
            console.log('trong ', cloneListUsers);

            const cloneListUsersfilter = cloneListUsers.filter(item =>
                item.email.startsWith(debouncedValue)
            );

            console.log(cloneListUsersfilter);
            setListUsers(cloneListUsersfilter);
        } else {
            console.log('chua nhap');
            setListUsers(listUsersTmp);
        }

        return () => {};
    }, [debouncedValue]);

    const handleImportCSV = e => {
        if (e.target && e.target.files && e.target.files[0]) {
            let file = e.target.files[0];

            if (file.type !== 'text/csv') {
                toast.error('Please select a CSV file.');
                return;
            }

            // Parse local CSV file
            Papa.parse(file, {
                complete: function (results) {
                    let rawCSV = results.data;
                    console.log(results);
                    if (rawCSV.length > 0) {
                        if (rawCSV[0] && rawCSV[0].length === 3) {
                            if (
                                rawCSV[0][0] === 'email' ||
                                rawCSV[0][1] === 'first_name' ||
                                rawCSV[0][2] === 'last_name'
                            ) {
                                toast.success('upload CSV file');

                                let dataUploadFilter = rawCSV.filter(
                                    (item, index) =>
                                        index > 0 && item.length === 3
                                );

                                let dataUploadHandled = dataUploadFilter.map(
                                    (item, index) => {
                                        return {
                                            email: item[0],
                                            first_name: item[1],
                                            last_name: item[2],
                                            id: index + 1
                                        };
                                    }
                                );

                                setListUsers(dataUploadHandled);

                                console.log('data upload', dataUploadHandled);
                            } else {
                                toast.error('Wrong format column for CSV file');
                            }
                        } else {
                            toast.error('Wrong format Header for CSV file');
                            return;
                        }
                    } else {
                        toast.error('No data in CSV file.');
                        return;
                    }
                }
            });
        }
    };

    const handleSearch = e => {
        const result = e.target.value;

        setKeyWord(result);
    };

    const getuserExport = (event, done) => {
        let result = [];
        if (listUsers && listUsers.length > 0) {
            result.push(['Id', 'Email', 'First Name', 'Last Name']);
            listUsers.forEach((item, index) => {
                let arr = [];

                arr[0] = item.id;
                arr[1] = item.email;
                arr[2] = item.first_name;
                arr[3] = item.last_name;

                result.push(arr);
            });

            setDataExport(result);
            done();
        }
    };

    useEffect(() => {
        getUsers(1);
        setListUsersTmp(listUsers);
    }, []);

    return (
        <>
            <div className={cx('add-new', 'my-3', 'd-sm-flex')}>
                <span className={cx('c')}>List Users:</span>

                <div className={cx('group-btn')}>
                    <label
                        className='btn btn-warning'
                        htmlFor='import-file-btn'
                    >
                        <i className='fa-solid fa-file-import'></i>Import
                    </label>
                    <span>
                        <input
                            onChange={e => {
                                handleImportCSV(e);
                            }}
                            id='import-file-btn'
                            type='file'
                            hidden
                        ></input>
                    </span>

                    <CSVLink
                        data={dataExport}
                        filename={'user.csv'}
                        className='btn btn-primary'
                        target='_blank'
                        asyncOnClick={true}
                        onClick={getuserExport}
                    >
                        <i className='fa-solid fa-file-arrow-down'></i> Export
                    </CSVLink>
                    <button
                        className='btn btn-success'
                        onClick={() => {
                            setIsShowModalAddNew(true);
                        }}
                    >
                        <i className='fa-solid fa-circle-plus'> Add</i>
                    </button>
                </div>
            </div>

            <div className='col-4 my-3'>
                <input
                    value={keyWord}
                    className={cx('form-control')}
                    placeholder='Search user by email ...'
                    onChange={e => {
                        handleSearch(e);
                    }}
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
                                        onClick={() => {
                                            handleSort('desc', 'id');
                                        }}
                                        className='fa-solid fa-arrow-down-long'
                                    ></i>
                                    <i
                                        onClick={() => {
                                            handleSort('asc', 'id');
                                        }}
                                        className='fa-solid fa-arrow-up-long'
                                    ></i>
                                </span>
                            </th>
                            <th>Email</th>
                            <th className={cx('sort-header')}>
                                <span>First Name</span>
                                <span>
                                    <i
                                        onClick={() => {
                                            handleSort('desc', 'first_name');
                                        }}
                                        className='fa-solid fa-arrow-down-long'
                                    ></i>
                                    <i
                                        onClick={() => {
                                            handleSort('asc', 'first_name');
                                        }}
                                        className='fa-solid fa-arrow-up-long'
                                    ></i>
                                </span>
                            </th>
                            <th>Last Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUsers &&
                            listUsers.length > 0 &&
                            listUsers.map((item, index) => {
                                return (
                                    <tr key={`user-${index}`}>
                                        <td>{item.id}</td>
                                        <td>{item.email}</td>
                                        <td>{item.first_name}</td>
                                        <td>{item.last_name}</td>
                                        <td>
                                            <button
                                                onClick={() => {
                                                    handleEditUser(item);
                                                }}
                                                className='btn btn-warning mx-3'
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => {
                                                    handleDeleteUser(item);
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

            <ReactPaginate
                breakLabel='...'
                nextLabel='next >'
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel='< previous'
                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                containerClassName='pagination'
                activeClassName='active'
                renderOnZeroPageCount={null}
            />

            <ModalAddNew
                show={isShowModalAddNew}
                handleClose={handleClose}
                handleUpdateTable={handleUpdateTable}
            />

            <ModalEditUser
                show={isShowModalEdit}
                handleClose={handleClose}
                dataUserEdit={dataUserEdit}
                handleEditUserFromModal={handleEditUserFromModal}
            />

            <ModalComfirm
                show={isShowModalDelete}
                handleClose={handleClose}
                dataUserDelete={dataUserDelete}
                handleDeleteUserFromModal={handleDeleteUserFromModal}
            />
        </>
    );
}

export default TableUsers;
