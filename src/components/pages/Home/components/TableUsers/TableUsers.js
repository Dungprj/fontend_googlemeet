import { useEffect, useState } from 'react';
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

import _ from 'lodash';

const cx = classNames.bind(styles);

function TableUsers(props) {
    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setToTalPages] = useState(0);

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

    const handleSearch = e => {
        const result = e.target.value;

        setKeyWord(result);
    };

    useEffect(() => {
        getUsers(1);
        setListUsersTmp(listUsers);
    }, []);

    return (
        <>
            <div className={cx('add-new', 'my-3')}>
                <span>List Users:</span>
                <button
                    className='btn btn-success'
                    onClick={() => {
                        setIsShowModalAddNew(true);
                    }}
                >
                    Add new user
                </button>
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
