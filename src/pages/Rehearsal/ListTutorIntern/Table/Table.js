import * as React from 'react';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import classNames from 'classnames/bind';
import { Col, Container, Row } from 'react-bootstrap';

import Button from '~/components/Button';
import requests from '~/utils/request';
import { ModalContext } from '~/components/ModalProvider';
import useRequestsPrivate from '~/hooks/useRequestPrivate';

import styles from './Table.module.scss';
import SendEmail from '../SendEmail';

const cx = classNames.bind(styles);

const LIST_TUTOR_INTERN_URL = 'moderator/get_tutors';
const BROWSER_FORM_TUTOR_INTERN_URL = 'moderator/update_status';
const HAD_SEND_MAIL = 'moderator/show_list_tutor_apply';

export default function BasicTable({ name }) {
    const { sendEmail, setSendEmail, setEmail, setTutorId } = React.useContext(ModalContext);
    const [status, setStatus] = useState(false);
    const [listTutor, setListTutor] = useState([]);
    const [success, setSuccess] = useState(false);
    const [tutorHadSendEmail, setTutorHadSendEmail] = useState([]);
    const requestPrivate = useRequestsPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getSendEmail = async () => {
            try {
                const response = await requestPrivate.get(HAD_SEND_MAIL, { signal: controller.signal });
                console.log(response.data);
                isMounted && setTutorHadSendEmail(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        setSuccess(false);
        getSendEmail();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [success]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        //get all checkbox elements
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        //loop each element and reset checked
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
        const getListTutorIntern = async () => {
            const response = await requests.get(LIST_TUTOR_INTERN_URL, {
                signal: controller.signal,
            });
            console.log(response.data);
            setStatus(false);
            isMounted && setListTutor(response.data);
        };

        getListTutorIntern();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [status]);

    const handleApiApprove = async (id) => {
        console.log(id);
        console.log(JSON.stringify([{ accountId: id, status: true }]));
        try {
            const response = await requestPrivate.post(
                BROWSER_FORM_TUTOR_INTERN_URL,
                JSON.stringify([{ accountId: id, status: true }]),
            );
            if (response.status === 200) {
                setSuccess(true);
                setStatus((prev) => !prev);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleApiReject = async (id) => {
        try {
            const response = await requestPrivate.post(
                BROWSER_FORM_TUTOR_INTERN_URL,
                JSON.stringify([{ accountId: id, status: false }]),
            );
            if (response.status) {
                setSuccess(true);
                setStatus((prev) => !prev);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const commonItems = listTutor.filter(({ tutorId }) => !tutorHadSendEmail.some((x) => x.tutorId === tutorId));

    return (
        <div className={cx('wrapper')}>
            <h3>TUTOR INTERN</h3>
            <Container>
                <Row>
                    <Col lg="12">
                        <TableContainer component={Paper} style={{ boxShadow: '0px 13px 20px 0px #80808029' }}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Card Id</TableCell>
                                        <TableCell align="left">Name</TableCell>
                                        <TableCell align="left">Email</TableCell>
                                        <TableCell align="left">Phone</TableCell>
                                        <TableCell align="left">Birth day</TableCell>
                                        <TableCell align="left">Gender</TableCell>
                                        <TableCell align="left">Description</TableCell>
                                        <TableCell align="left">Type Of Degree</TableCell>
                                        <TableCell align="left">Education</TableCell>
                                        <TableCell align="left"></TableCell>
                                        <TableCell align="left"></TableCell>
                                        <TableCell align="left"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody style={{ color: 'white' }}>
                                    {commonItems.length > 0 &&
                                        commonItems?.map((row, index) => (
                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="left">{row?.cardId}</TableCell>
                                                <TableCell align="left">{row?.fullName}</TableCell>
                                                <TableCell align="left">{row?.email}</TableCell>
                                                <TableCell align="left">{row?.phoneNumber}</TableCell>
                                                <TableCell align="left">{row?.dob}</TableCell>
                                                <TableCell align="left">
                                                    {row?.gender === true ? 'Lady' : 'Gentlemen'}
                                                </TableCell>
                                                <TableCell align="left">{row?.description}</TableCell>
                                                <TableCell align="left">{row?.typeOfDegree}</TableCell>
                                                <TableCell align="left">{row?.education}</TableCell>
                                                <TableCell align="left" className="Details">
                                                    <Button
                                                        orange
                                                        className={cx('approve')}
                                                        onClick={() => handleApiApprove(row.accountId)}
                                                    >
                                                        Approve
                                                    </Button>
                                                </TableCell>
                                                <TableCell align="left" className="Details">
                                                    <Button
                                                        className={cx('reject')}
                                                        onClick={() => {
                                                            handleApiReject(row.accountId);
                                                        }}
                                                    >
                                                        Reject
                                                    </Button>
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    className="Details"
                                                    onClick={() => {
                                                        setTutorId(row?.tutorId);
                                                        setEmail(row?.email);
                                                    }}
                                                >
                                                    <Button
                                                        className={cx('sendEmail')}
                                                        onClick={() => {
                                                            setSendEmail(true);
                                                        }}
                                                    >
                                                        Send Email
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Col>
                </Row>
                {sendEmail && <SendEmail />}
            </Container>
        </div>
    );
}
