import classNames from 'classnames/bind';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Button from '~/components/Button';

import styles from './Details.module.scss';

const cx = classNames.bind(styles);

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

function Details({ classes, handleApprove, handleReject, handleCancel }) {
    console.log(classes);
    return (
        <div className={cx('modal')}>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>TITLE</StyledTableCell>
                                    <StyledTableCell align="right">SUBJECT</StyledTableCell>
                                    <StyledTableCell align="right">MIN PRICE</StyledTableCell>
                                    <StyledTableCell align="right">MAX PRICE</StyledTableCell>
                                    <StyledTableCell align="right">DAY START</StyledTableCell>
                                    <StyledTableCell align="right">DAY END</StyledTableCell>
                                    <StyledTableCell align="right">DAY OF WEEK</StyledTableCell>
                                    <StyledTableCell align="right">TUTOR GENDER</StyledTableCell>
                                    <StyledTableCell align="right">TIME START</StyledTableCell>
                                    <StyledTableCell align="right">TIME END</StyledTableCell>
                                    <StyledTableCell align="right">DESCRIPTION</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <StyledTableRow key={classes.classid}>
                                    <StyledTableCell className={cx('class-items')} component="th" scope="row">
                                        {classes.title}
                                    </StyledTableCell>
                                    <StyledTableCell className={cx('class-items')} align="right">
                                        {classes.subjectName}
                                    </StyledTableCell>
                                    <StyledTableCell className={cx('class-items')} align="right">
                                        {classes.minHourlyRate}
                                    </StyledTableCell>
                                    <StyledTableCell className={cx('class-items')} align="right">
                                        {classes.maxHourlyRate}
                                    </StyledTableCell>
                                    <StyledTableCell className={cx('class-items')} align="right">
                                        {classes.dayStart}
                                    </StyledTableCell>
                                    <StyledTableCell className={cx('class-items')} align="right">
                                        {classes.dayEnd}
                                    </StyledTableCell>
                                    <StyledTableCell className={cx('class-items')} align="right">
                                        {classes.dayOfWeek}
                                    </StyledTableCell>
                                    <StyledTableCell className={cx('class-items')} align="right">
                                        {classes.tutorGender ? 'Male' : 'Female'}
                                    </StyledTableCell>
                                    <StyledTableCell className={cx('class-items')} align="right">
                                        {classes.timeStart} HOUR
                                    </StyledTableCell>
                                    <StyledTableCell className={cx('class-items')} align="right">
                                        {classes.timeEnd} HOUR
                                    </StyledTableCell>
                                    <StyledTableCell className={cx('class-items')} align="right">
                                        {classes.description} HOUR
                                    </StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className={cx('function')}>
                        <div className={cx('function-user')}>
                            <img src={classes.avatar} alt={'avatar'}></img>
                            <div className={cx('function-user-detail')}>
                                <p>{classes.fullName}</p>
                                <span>{classes.createDay}</span>
                            </div>
                        </div>
                        <div>
                            <Button orange className={cx('approve')} onClick={() => handleApprove(classes.formId)}>
                                Approve
                            </Button>
                            <Button className={cx('reject')} onClick={() => handleReject(classes.formId)}>
                                Reject
                            </Button>
                            <Button className={cx('cancel')} onClick={handleCancel}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Details;
