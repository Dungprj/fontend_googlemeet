import { Modal, Button } from 'react-bootstrap';

import classNames from 'classnames/bind';
import styles from './ModalEditUser.scss';
import { useEffect, useState } from 'react';

import { putUpdateUser } from '~/Services/UserService';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function ModalEditUser(props) {
    const { show, handleClose, dataUserEdit, handleEditUserFromModal } = props;

    const [lastName, setLastName] = useState('');
    const [job, setJob] = useState('');

    const handleEditUser = async () => {
        console.log(dataUserEdit);
        let res = await putUpdateUser(dataUserEdit.id, lastName, job);

        if (res && res.updatedAt) {
            handleEditUserFromModal({
                id: dataUserEdit.id,
                firstName: res.name
            });

            toast.success('A User is Update successfully');
        } else {
            toast.error('An error ...');
        }
    };

    useEffect(() => {
        if (show) {
            setLastName(dataUserEdit.firstName);
            setJob(dataUserEdit.job);
        }
    }, [dataUserEdit]);

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('body-add-new')}>
                        <form>
                            <div className='mb-3'>
                                <label className='form-label'>Name</label>
                                <input
                                    value={lastName}
                                    type='text'
                                    className='form-control'
                                    onChange={e => setLastName(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Job</label>
                                <input
                                    value={job}
                                    type='text'
                                    className='form-control'
                                    onChange={e => setJob(e.target.value)}
                                />
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant='primary'
                        onClick={() => {
                            handleEditUser();
                        }}
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEditUser;
