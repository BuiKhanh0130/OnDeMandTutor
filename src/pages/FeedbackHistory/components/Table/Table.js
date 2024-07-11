import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import request from '~/utils/request';
import { useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa";

const Feedback_URL = 'Feedbacks/';

function TableFeeback() {
    const [id, setId] = useState('T0010');
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const GetFeedbackById = async () => {
            try {
                const response = await request.get(Feedback_URL + id);
                    setFeedbacks(response.data.listResult);
                    console.log(response.data);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            }
        };
        GetFeedbackById();
    }, [id]);

    const makeStyle = (status) => {
        if (status === 'Well Done') {
            return {
                background: 'rgb(145 254 159 / 47%)',
                color: 'green',
            };
        } else {
            return {
                background: 'orange',
                color: 'white',
            };
        }
    };

    return (
        <div className="Table">
            <h3>Feedbacks</h3>
            <TableContainer component={Paper} style={{ boxShadow: '0px 13px 20px 0px #80808029' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Customer</TableCell>
                            <TableCell align="left">Day</TableCell>
                            <TableCell align="left">Class</TableCell>
                            <TableCell align="left">Title</TableCell>
                            <TableCell align="left">Rate</TableCell>
                            <TableCell align="left">More</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{ color: 'white' }}>
                        {feedbacks.map((row) => (
                            <TableRow key={row.feedbackId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="left">{row.fullName}</TableCell>
                                <TableCell align="left">{row.createDay}</TableCell>
                                <TableCell align="left">{row.studentId}</TableCell>
                                <TableCell align="left">
                                    <span className="status">{row.title}</span>
                                </TableCell>
                                <TableCell align="left">
                                    <span>
                                        <div className="star">
                                            {[...Array(5)].map((rating, index) => (
                                                <span key={index}>
                                                    <FaStar
                                                        aria-readonly
                                                        color={row.start >= index + 1 ? '#FDB515' : '#B2BEB5'}
                                                        size={18}
                                                    />
                                                </span>
                                            ))}
                                        </div>
                                    </span>
                                </TableCell>
                                <TableCell align="left" className="Details">
                                    Details
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default TableFeeback;
