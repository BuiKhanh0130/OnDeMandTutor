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

const ALL_FORM_CREATE_CLASS_URL = 'FormFindTutor/moderator/viewformlist';
const BROWSER_FORM_CREATE_CLASS_URL = 'FormFindTutor/moderator/browserform';

export default function BasicTable({ name }) {
    const [status, setStatus] = useState(false);
    const [formCreateClass, setFormCreateClass] = useState([]);
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
        const getFormCreateClass = async () => {
            const response = await requests.get(`${ALL_FORM_CREATE_CLASS_URL}?pageIndex＝${pageIndex}`, {
                signal: controller.signal,
            });
            setStatus(false);
            isMounted && setFormCreateClass(response.data.listResult) && setLimitPageIndex(response.data.limitPage);
        };

        getFormCreateClass();

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
            <h3>{name}</h3>
            <Container>
                <Row>
                    <Col lg="12">
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
                                    {formCreateClass.length > 0 &&
                                        formCreateClass?.map((row, index) => (
                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="left">{row?.fullName}</TableCell>
                                                <TableCell align="left">{row?.title}</TableCell>
                                                <TableCell align="left">{row?.subjectName}</TableCell>
                                                <TableCell align="left">{row?.description}</TableCell>
                                                <TableCell align="left">{row?.timeStart}</TableCell>
                                                <TableCell align="left">{row?.timeEnd}</TableCell>
                                                <TableCell align="left">{row?.dayStart}</TableCell>
                                                <TableCell align="left">{row?.dayEnd}</TableCell>
                                                <TableCell align="left">{row?.dayOfWeek}</TableCell>
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
