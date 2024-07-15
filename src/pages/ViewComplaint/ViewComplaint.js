import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import useRequestsPrivate from '~/hooks/useRequestPrivate';
import HeaderTutor from '~/layouts/Tutor/components/HeaderTutor';

import styles from './ViewComplaint.module.scss';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const cx = classNames.bind(styles);

const GETALLCOMPLAINT_URL = 'Complaints/ViewAllComplaintInClass';

function ViewComplaint() {
    const requestPrivate = useRequestsPrivate();
    const [complaints, setComplaints] = useState([]);
    const { state } = useLocation();
    //Gte complaint class
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getAllComplaint = async () => {
            try {
                const response = await requestPrivate.get(`${GETALLCOMPLAINT_URL}/${state.classID}`);
                console.log(response.data);
                isMounted && setComplaints(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        getAllComplaint();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);

    return (
        <Container className={cx('container')}>
            <HeaderTutor />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>PURPOSE</StyledTableCell>
                            <StyledTableCell align="right">CREATEDATE</StyledTableCell>
                            <StyledTableCell align="right">PROCESSNOTE</StyledTableCell>
                            <StyledTableCell align="right">STATUS</StyledTableCell>
                            <StyledTableCell align="right">RESPONSEDATE</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {complaints.map((complaint) => (
                            <StyledTableRow key={complaint.classid}>
                                <StyledTableCell component="th" scope="row">
                                    {complaint.description}
                                </StyledTableCell>
                                <StyledTableCell align="right">{complaint.createDay}</StyledTableCell>
                                <StyledTableCell align="right">{complaint.processnote}</StyledTableCell>
                                <StyledTableCell
                                    align="right"
                                    style={{
                                        color:
                                            complaint.status === null
                                                ? 'black'
                                                : complaint.status === true
                                                ? 'green'
                                                : 'red',
                                        textDecoration: 'underline',
                                    }}
                                >
                                    {complaint.status === null
                                        ? 'Processing'
                                        : complaint.status === true
                                        ? 'Approve'
                                        : 'Reject'}
                                </StyledTableCell>
                                <StyledTableCell align="right">aaa</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default ViewComplaint;
