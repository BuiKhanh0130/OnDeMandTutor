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
import Paging from '~/components/Paging';
import { ModalContext } from '~/components/ModalProvider';

import styles from './Table.module.scss';
import ResponseComplaint from '../ResponseComplaint';

const cx = classNames.bind(styles);

const COMPLAINT_URL = '/complaint';

export default function BasicTable({ name }) {
    const { responseComplaint, setResponseComplaint } = React.useContext(ModalContext);
    const [status, setStatus] = useState(false);
    const [complaint, setComplaint] = useState([]);
    const [curPage, setcurPage] = useState(1);
    const [complaintId, setComplaintId] = useState('');
    const [pagination, setPagination] = useState({ limit: 0 });

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        //get all checkbox elements
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        //loop each element and reset checked
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
        const getComplaint = async () => {
            const response = await requests.get(COMPLAINT_URL, {
                signal: controller.signal,
            });
            setStatus(false);
            isMounted && setComplaint(response.data) && setPagination({ limit: response.data.limitPage });
        };

        getComplaint();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [status]);

    const handleBrowseComplaint = (id) => {
        setComplaintId(id);
        setResponseComplaint(true);
    };

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
                                        <TableCell align="left">Class Id</TableCell>
                                        <TableCell align="left">Description</TableCell>
                                        <TableCell align="left">createDay</TableCell>
                                        <TableCell align="left"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody style={{ color: 'white' }}>
                                    {complaint.length > 0 &&
                                        complaint?.map((row, index) => (
                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="left">{row?.classId}</TableCell>
                                                <TableCell align="left">{row?.description}</TableCell>
                                                <TableCell align="left">{row?.createDay}</TableCell>
                                                <TableCell align="left" className="Details">
                                                    <Button
                                                        orange
                                                        className={cx('btn-reply')}
                                                        onClick={() => handleBrowseComplaint(row?.complaintId)}
                                                    >
                                                        Reply
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Col>
                </Row>
                {responseComplaint && <ResponseComplaint complaintId={complaintId} />}
                {pagination.limit > 1 && <Paging pagination={pagination} curPage={curPage} setcurPage={setcurPage} />}
            </Container>
        </div>
    );
}
