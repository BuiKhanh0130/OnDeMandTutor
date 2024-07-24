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

import styles from './Table.module.scss';
import ResponseComplaint from '../ResponseComplaint';
import ClassDetail from '../ClassDetail/ClassDetail';

const cx = classNames.bind(styles);

const COMPLAINT_URL = '/moderator/get_complaints';

export default function BasicTable({ name }) {
    const { responseComplaint, setResponseComplaint } = React.useContext(ModalContext);
    const [status, setStatus] = useState(false);
    const [complaint, setComplaint] = useState([]);
    const [complaintId, setComplaintId] = useState('');
    const [classId, setClassId] = useState('');
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getComplaint = async () => {
            const response = await requests.get(COMPLAINT_URL, {
                signal: controller.signal,
            });
            console.log(response.data);
            setStatus(false);
            isMounted && setComplaint(response.data);
        };

        getComplaint();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [status, showDetails]);

    const handleBrowseComplaint = (id) => {
        setComplaintId(id);
        setResponseComplaint(true);
    };

    const handleShowDetails = (classId) => {
        setShowDetails(true);
        setClassId(classId);
    };

    const handleHiddenShowDetails = () => {
        setShowDetails(false);
        setClassId('');
    };

    return (
        <div className={cx('wrapper')}>
            <h3>COMPLAINTS</h3>
            <Container>
                <Row>
                    <Col lg="12">
                        <TableContainer component={Paper} style={{ boxShadow: '0px 13px 20px 0px #80808029' }}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Class Id</TableCell>
                                        <TableCell align="left">Complainer</TableCell>
                                        <TableCell align="left">createDay</TableCell>
                                        <TableCell align="left">Response</TableCell>
                                        <TableCell align="left">Class</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody style={{ color: 'white' }}>
                                    {complaint.length > 0 &&
                                        complaint?.map((row, index) => (
                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell style={{ fontSize: '1.2rem' }} align="left">
                                                    {row?.classId}
                                                </TableCell>
                                                <TableCell style={{ fontSize: '1.2rem' }} align="left">
                                                    {row?.nameAccount}
                                                </TableCell>
                                                <TableCell style={{ fontSize: '1.2rem' }} align="left">
                                                    {row?.dateCreate}
                                                </TableCell>
                                                <TableCell
                                                    style={{ fontSize: '1.2rem' }}
                                                    align="left"
                                                    className="Details"
                                                >
                                                    <Button
                                                        orange
                                                        className={cx('btn-reply')}
                                                        onClick={() => handleBrowseComplaint(row?.complaintId)}
                                                    >
                                                        Reply
                                                    </Button>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Button
                                                        orange
                                                        className={cx('btn-reply')}
                                                        onClick={() => handleShowDetails(row?.classId)}
                                                    >
                                                        Details
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Col>
                </Row>
                {showDetails && <ClassDetail classID={classId} handleHiddenShowDetails={handleHiddenShowDetails} setStatus={setStatus} />}
                {responseComplaint && <ResponseComplaint complaintId={complaintId} setStatus={setStatus} />}
            </Container>
        </div>
    );
}
