import * as React from 'react';
import styles from './Table.module.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Table.css';
import classNames from 'classnames/bind';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

export default function BasicTable({ form }) {
    return (
        <div className={cx('wrapper')}>
            <h3>Approve Classes</h3>
            <TableContainer component={Paper} style={{ boxShadow: '0px 13px 20px 0px #80808029' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="left">title</TableCell>
                            <TableCell align="left">subjectName</TableCell>
                            <TableCell align="left">description</TableCell>
                            <TableCell align="left">Time start</TableCell>
                            <TableCell align="left">Time end</TableCell>
                            <TableCell align="left">Day start</TableCell>
                            <TableCell align="left">Day end</TableCell>
                            <TableCell align="left">Day of week</TableCell>
                            <TableCell align="left">
                                <Button orange className={cx('approve')}>
                                    Approve
                                </Button>
                            </TableCell>
                            <TableCell align="left">
                                <Button className={cx('reject')}>Reject</Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{ color: 'white' }}>
                        {form.map((row, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="left">{row?.fullName}</TableCell>
                                <TableCell align="left">{row?.title}</TableCell>
                                <TableCell align="left">{row?.subjectName}</TableCell>
                                <TableCell align="left">{row?.description}</TableCell>
                                <TableCell align="left">{row?.timeStart}</TableCell>
                                <TableCell align="left">{row?.timeEnd}</TableCell>
                                <TableCell align="left">{row?.dayStart}</TableCell>
                                <TableCell align="left">{row?.dayEnd}</TableCell>
                                <TableCell align="left">{row?.dayOfWeek}</TableCell>
                                {/* <TableCell align="left">
                                    <span className="status" style={makeStyle(row.status)}>
                                        {row.status}
                                    </span>
                                </TableCell> */}
                                <TableCell align="left" className="Details">
                                    <input type="checkbox" value={row?.formId}></input>
                                </TableCell>
                                <TableCell align="left" className="Details">
                                    <input type="checkbox" value={row?.formId}></input>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
