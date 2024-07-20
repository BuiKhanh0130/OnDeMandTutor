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

import requests from '~/utils/request';
import useRequestsPrivate from '~/hooks/useRequestPrivate';
import Details from './Details';
import Reject from './Reject';
import Tutor from '~/components/Tutor';

import styles from './Table.module.scss';
import { CloseIcon } from '~/components/Icons';
import Clip from '~/components/Clip';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

const ALL_ADS_URL = 'moderator/show_tutorAd_browse';
const BROWSER_ADS_URL = 'moderator/changeisactivead';
const CREATE_NOTIFICATION_URL = 'notification/create_notification';

export default function BasicTable({ name }) {
    const requestPrivate = useRequestsPrivate();
    const [viewVideo, setViewVideo] = useState(false);
    const [status, setStatus] = useState(false);
    const [ads, setAds] = useState([]);
    const [adCurrent, setAdCurrent] = useState({});
    const [rejectForm, setRejectForm] = useState(false);
    const [reasonReject, setReasonReject] = useState('');
    const [detailsTutor, setDetailsTutor] = useState(false);
    const [idTutor, setIdTutor] = useState(false);

    //Get all ads
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getFormCreateClass = async () => {
            try {
                const response = await requests.get(ALL_ADS_URL, {
                    signal: controller.signal,
                });
                setStatus(false);
                isMounted && setAds(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        getFormCreateClass();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [status]);
    //handle create notifications
    const handleCreateNotifications = async (id) => {
        try {
            const response = await requestPrivate.post(CREATE_NOTIFICATION_URL, {
                title: `Your advertisement has been approved`,
                description: 'Please check it in your profile',
                url: `/account/tutor/${id}`,
                accountId: id,
            });
            console.log(response.status);
        } catch (error) {
            console.log(error);
        }
    };
    //handle approve ad
    const handleApprove = async (id) => {
        try {
            const response = await requestPrivate.post(BROWSER_ADS_URL, JSON.stringify({ id, isActive: true }));
            if (response.status === 200) {
                console.log(adCurrent.tutorId);
                handleCreateNotifications(adCurrent.accountTutorId);
                setStatus((prev) => !prev);
                setViewVideo(false);
            }
        } catch (error) {
            console.log(error);
        }
    };
    //handle reject ad
    const handleReject = async (id) => {
        try {
            const response = await requestPrivate.post(BROWSER_ADS_URL, JSON.stringify({ id, isActive: false }));
            if (response.status === 200) {
                setStatus((prev) => !prev);
                setViewVideo(false);
                setReasonReject('');
                setRejectForm(false);
            }
        } catch (error) {
            console.log(error);
        }
    };
    //handle content reject
    const handleChangeContentReject = (e) => {
        setReasonReject(e.target.value);
    };
    //close reject form
    const handleClose = () => {
        setReasonReject('');
        setRejectForm(false);
    };

    //View detail classes
    const handleViewVideo = (item) => {
        setAdCurrent(item);
        setViewVideo(true);
    };
    //
    const handleCancelVideo = () => {
        setViewVideo(false);
    };
    //handle close detail tutor
    const showDetailTutor = (idTutor) => {
        setIdTutor(idTutor);
        setDetailsTutor(true);
    };
    //handle close modal detail tutor
    const closeDetailTutor = () => {
        setIdTutor('');
        setDetailsTutor(false);
    };
    return (
        <div className={cx('wrapper')}>
            <h3>{name}</h3>
            <Container>
                <Row>
                    <Col lg="12">
                        <TableContainer component={Paper} style={{ boxShadow: '0px 13px 20px 0px #80808029' }}>
                            <Table sx={{ minWidth: 650, maxWidth: 988 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Owner post</TableCell>
                                        <TableCell align="left">Title</TableCell>
                                        <TableCell align="left">Create Day</TableCell>
                                        <TableCell align="left">Detail Ads</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody style={{ color: 'white' }}>
                                    {ads?.length > 0 &&
                                        ads?.map((row, index) => (
                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell
                                                    className={cx('table_body-details')}
                                                    align="left"
                                                    onClick={() => {
                                                        showDetailTutor(row.tutorId);
                                                    }}
                                                >
                                                    Details
                                                </TableCell>
                                                <TableCell align="left">{row?.title}</TableCell>
                                                <TableCell align="left">{row?.createDay.split('T')[0]}</TableCell>
                                                <TableCell
                                                    align="left"
                                                    className={cx('table_body-details')}
                                                    onClick={() => handleViewVideo(row)}
                                                >
                                                    View
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Col>
                </Row>
                {viewVideo && (
                    <div className={cx('modal__video')}>
                        <div className={cx('wrapper__video-tutor')}>
                            <div className={cx('container__video-tutor')}>
                                <Clip width={600} height={293.667} clip={adCurrent}></Clip>
                                <div className={cx('close')} onClick={handleCancelVideo}>
                                    <CloseIcon className={cx('close-icon')} />
                                </div>
                                <Button className={cx('btn-reject')}>Reject</Button>
                                <Button
                                    orange
                                    className={cx('btn-approve')}
                                    onClick={() => handleApprove(adCurrent.adsId)}
                                >
                                    Approve
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
                {rejectForm && (
                    <Reject
                        handleReject={handleReject}
                        handleChangeContentReject={handleChangeContentReject}
                        handleClose={handleClose}
                    />
                )}
                {detailsTutor && (
                    <div className={cx('modal')}>
                        <div className={cx('wrapper_detail-tutor')}>
                            <Tutor id={idTutor}></Tutor>
                            <div className={cx('close')} onClick={closeDetailTutor}>
                                <CloseIcon className={cx('close-icon')} />
                            </div>
                        </div>
                    </div>
                )}
            </Container>
        </div>
    );
}
