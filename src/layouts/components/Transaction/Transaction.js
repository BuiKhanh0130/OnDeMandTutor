import classNames from 'classnames/bind';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Sidebar from './component/Sidebar';

import styles from './Transaction.module.scss';
import HeaderNotFix from '~/layouts/HeaderNotFix';

const cx = classNames.bind(styles);

function Transaction({ children }) {
    return (
        <div className={cx('wrapper')}>
            <HeaderNotFix></HeaderNotFix>
            <Container>
                {/* <Row>
                    <Col>
                        <div className={cx('transaction__subject-background')}></div>
                    </Col>
                </Row> */}
                <Row className={cx('transaction__subject-content')}>
                    <Col lg="4">
                        <Sidebar />
                    </Col>
                    <Col lg="8">
                        {children}
                        {/* <Routes>
                                <Route path="/transaction/payment" element={<Payment></Payment>}></Route>
                                <Route path="/transaction/history" element={<History></History>}></Route>
                            </Routes> */}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Transaction;
