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
import useRequestsPrivate from '~/hooks/useRequestPrivate';

import styles from './Table.module.scss';

const cx = classNames.bind(styles);

const LIST_TUTOR_INTERN_URL = 'Moderators/ShowListTutorInter';
const BROWSER_FORM_CREATE_CLASS_URL = 'FormFindTutor/moderator/browserform';

export default function BasicTable({ name }) {
    const [status, setStatus] = useState(false);
    const [listTutor, setListTutor] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [limitPageIndex, setLimitPageIndex] = useState(0);
    const [approveList, setApproveList] = useState([]);
    const [rejectList, setRejectList] = useState([]);
    const requestPrivate = useRequestsPrivate();

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
            isMounted && setListTutor(response.data) && setLimitPageIndex(response.data.limitPage);
        };

        getListTutorIntern();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [status]);

    const handleApprove = (e, id) => {
        if (e.target.checked) {
            setApproveList((prev) => {
                return [...prev, id];
            });
        } else {
            setApproveList(approveList.filter((itemId) => itemId !== id));
        }
    };

    const handleReject = (e, id) => {
        if (e.target.checked) {
            setRejectList((prev) => {
                return [...prev, id];
            });
        } else {
            setRejectList(rejectList.filter((itemId) => itemId !== id));
        }
    };

    const handleApiApprove = async () => {
        try {
            const response = await requestPrivate.put(`${BROWSER_FORM_CREATE_CLASS_URL}?action=true`, approveList);
            if (response.status) {
                setStatus((prev) => !prev);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleApiReject = async () => {
        try {
            const response = await requestPrivate.put(`${BROWSER_FORM_CREATE_CLASS_URL}?action=false`, rejectList);
            if (response.status) {
                setStatus((prev) => !prev);
            }
        } catch (error) {
            console.log(error);
        }
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
                                        <TableCell align="left">Card Id</TableCell>
                                        <TableCell align="left">Name</TableCell>
                                        <TableCell align="left">Email</TableCell>
                                        <TableCell align="left">Phone</TableCell>
                                        <TableCell align="left">Birth day</TableCell>
                                        <TableCell align="left">Gender</TableCell>
                                        <TableCell align="left">Description</TableCell>
                                        <TableCell align="left">Type Of Degree</TableCell>
                                        <TableCell align="left">Education</TableCell>
                                        <TableCell align="left">
                                            <Button orange className={cx('approve')} onClick={handleApiApprove}>
                                                Approve
                                            </Button>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Button className={cx('reject')} onClick={handleApiReject}>
                                                Reject
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody style={{ color: 'white' }}>
                                    {listTutor.length > 0 &&
                                        listTutor?.map((row, index) => (
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
                                                    <input
                                                        type="checkbox"
                                                        value={row?.formId}
                                                        onChange={(e) => handleApprove(e, row?.formId)}
                                                    ></input>
                                                </TableCell>
                                                <TableCell align="left" className="Details">
                                                    <input
                                                        type="checkbox"
                                                        value={row?.formId}
                                                        onChange={(e) => handleReject(e, row?.formId)}
                                                    ></input>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Col>
                </Row>
                <Paging pagination={limitPageIndex} curPage={pageIndex} setcurPage={setPageIndex} />
            </Container>
        </div>
    );
}
