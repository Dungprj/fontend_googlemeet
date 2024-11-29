import { Modal, Button } from 'react-bootstrap';

import classNames from 'classnames/bind';
import styles from './ModalComfirm.scss';
import { DeleteUser } from '~/Services/UserService';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function ModalComfirm(props) {
    const { show, handleClose, dataUserDelete, handleDeleteUserFromModal } =
        props;

    const confirmDelete = async () => {
        let res = await DeleteUser(dataUserDelete);
        if (res && +res.statuscode === 204) {
            toast.success('A User is deleted successfully');
        } else {
            toast.error('An error occurred while deleting the user');
        }
        handleDeleteUserFromModal(dataUserDelete);

        handleClose();
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
                    <Modal.Title>Delete a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('body-add-new')}>
                        <h3>Are you sure to delete this user </h3>
                        <b> {dataUserDelete.email}</b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className='btn btn-warning mx-3'
                        onClick={handleClose}
                    >
                        Edit
                    </Button>
                    <Button
                        className='btn btn-danger'
                        onClick={() => {
                            confirmDelete();
                        }}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalComfirm;
