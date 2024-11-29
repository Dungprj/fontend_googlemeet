import { Modal, Button } from 'react-bootstrap';

import classNames from 'classnames/bind';
import styles from './ModalAddNew.module.scss';
import { useState } from 'react';

import { postCreateUser } from '~/Services/UserService';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function ModalAddNew(props) {
    const { show, handleClose, handleUpdateTable } = props;

    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    const handleSaveUser = async () => {
        let res = await postCreateUser(name, job);

        if (res && res.id) {
            setName('');
            setJob('');
            toast.success('A User is created successfully');
            handleUpdateTable({ first_name: name, id: res.id });
            handleClose();
        } else {
            toast.error('An error ...');
        }
    };

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('body-add-new')}>
                        <form>
                            <div className='mb-3'>
                                <label className='form-label'>Name</label>
                                <input
                                    value={name}
                                    type='text'
                                    className='form-control'
                                    onChange={e => setName(e.target.value)}
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
                    <Button variant='primary' onClick={handleSaveUser}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalAddNew;
