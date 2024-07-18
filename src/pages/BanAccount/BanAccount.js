import classNames from 'classnames/bind';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import useRequestsPrivate from '~/hooks/useRequestPrivate';
import PageTitle from '~/components/PageTitle';
import Student from '~/components/Student';
import Modal from '~/components/Modal';

import styles from './BanAccount.module.scss';
import useDebounce from '~/hooks/useDebounce';
import Button from '~/components/Button';

const cx = classNames.bind(styles);
const BAN_ACCOUNT = 'admin/update_user-status';

function BanAccount() {
    const requestPrivate = useRequestsPrivate();
    const [accountId, setAccountId] = useState(null);
    const [accountIdBan, setAccountIdBan] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isActive, setIsActive] = useState();

    const debouncedValue = useDebounce(accountId, 500);

    const handleBanAccount = async () => {
        const response = await requestPrivate.post(BAN_ACCOUNT, accountIdBan);

        if (response.status === 200) {
            setIsActive(!isActive);
            setShowModal(false);
        }
    };

    const handleAccountId = (e) => {
        const value = e.target.value;

        if (value === ' ') {
            return;
        }
        setAccountId(value);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    return (
        <Container className={cx('main')}>
            <PageTitle page="Ban Account" />
            <Row className={cx('main__text')}>
                <Col lg="8">
                    <label id="idAccount">Account Id</label>
                    <input type="text" id="idAccount" onChange={handleAccountId} placeholder="Id"></input>
                    {debouncedValue && (
                        <Student
                            id={debouncedValue}
                            setAccountIdBan={setAccountIdBan}
                            setIsActive={setIsActive}
                        ></Student>
                    )}
                </Col>
                <Col lg="4">
                    {debouncedValue && isActive && (
                        <Button orange className={cx('btn')} onClick={handleShowModal}>
                            Ban Account
                        </Button>
                    )}

                    {debouncedValue && !isActive && (
                        <Button transparent className={cx('btn-unlock')} onClick={handleShowModal}>
                            Unlock Account
                        </Button>
                    )}
                </Col>
            </Row>
            {showModal && isActive && (
                <Modal
                    handleConfirm={handleBanAccount}
                    handleCancel={handleCancel}
                    content="Are you sure ban this account?"
                />
            )}

            {showModal && !isActive && (
                <Modal
                    handleConfirm={handleBanAccount}
                    handleCancel={handleCancel}
                    content="Are you sure unlock this account?"
                />
            )}
        </Container>
    );
}

export default BanAccount;
