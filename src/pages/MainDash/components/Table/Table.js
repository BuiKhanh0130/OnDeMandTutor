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
import Paging from '~/components/Paging';
import useRequestsPrivate from '~/hooks/useRequestPrivate';
import Details from './Details';
import Reject from './Reject';

import styles from './Table.module.scss';

const cx = classNames.bind(styles);

const ALL_FORM_CREATE_CLASS_URL = 'FormFindTutor/moderator/viewformlist';
const BROWSER_FORM_CREATE_CLASS_URL = 'FormFindTutor/moderator/browserform';

export default function BasicTable({ name }) {
    const requestPrivate = useRequestsPrivate();
    const [viewDetails, setViewDetails] = useState(false);
    const [idDetails, setIdDetails] = useState('');
    const [status, setStatus] = useState(false);
    const [curPage, setcurPage] = useState(1);
    const [formCreateClass, setFormCreateClass] = useState([]);
    const [classes, setClasses] = useState({});
    const [rejectForm, setRejectForm] = useState(false);
    const [reasonReject, setReasonReject] = useState('');
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 0,
        total: 1,
    });

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getFormCreateClass = async () => {
            try {
                const response = await requests.get(
                    ALL_FORM_CREATE_CLASS_URL,
                    { params: { pageIndex: curPage } },
                    {
                        signal: controller.signal,
                    },
                );
                setStatus(false);
                isMounted && setFormCreateClass(response.data.listResult);
                setPagination((prev) => ({ ...prev, limit: response.data.limitPage }));
            } catch (error) {
                console.log(error);
            }
        };

        getFormCreateClass();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [status, curPage]);

    const handleApprove = async (id) => {
        try {
            const response = await requestPrivate.put(`${BROWSER_FORM_CREATE_CLASS_URL}?action=true`, [id]);
            if (response.status) {
                setStatus((prev) => !prev);
                setViewDetails(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleOpenReject = (id) => {
        setIdDetails(id);
        setRejectForm(true);
    };

    console.log(reasonReject);

    const handleReject = async () => {
        const params = new URLSearchParams();
        params.append('action', false);
        params.append('rejectReason', reasonReject);
        const parameters = `?${params.toString()}`;
        console.log(`${BROWSER_FORM_CREATE_CLASS_URL}${parameters}`);
        try {
            const response = await requestPrivate.put(`${BROWSER_FORM_CREATE_CLASS_URL}${parameters}`, [idDetails]);
            if (response.status === 200) {
                setStatus((prev) => !prev);
                setViewDetails(false);
                setReasonReject('');
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
    const handleViewClass = (classes) => {
        setClasses(classes);
        setViewDetails(true);
    };

    const handleCancelClass = () => {
        setViewDetails(false);
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
                                        <TableCell align="left">Subject Name</TableCell>
                                        <TableCell align="left">Detail</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody style={{ color: 'white' }}>
                                    {formCreateClass.length > 0 &&
                                        formCreateClass?.map((row, index) => (
                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="left">{row?.fullName}</TableCell>
                                                <TableCell align="left">{row?.title}</TableCell>
                                                <TableCell align="left">{row?.subjectName}</TableCell>
                                                <TableCell
                                                    align="left"
                                                    className={cx('table_body-details')}
                                                    onClick={() => handleViewClass(row)}
                                                >
                                                    Details
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Col>
                </Row>
                {viewDetails && (
                    <Details
                        classes={classes}
                        handleApprove={handleApprove}
                        handleReject={handleOpenReject}
                        handleCancel={handleCancelClass}
                    />
                )}
                {rejectForm && (
                    <Reject
                        handleReject={handleReject}
                        handleChangeContentReject={handleChangeContentReject}
                        handleClose={handleClose}
                    />
                )}
                {pagination.limit > 1 && <Paging pagination={pagination} curPage={curPage} setcurPage={setcurPage} />}
            </Container>
        </div>
    );
}
