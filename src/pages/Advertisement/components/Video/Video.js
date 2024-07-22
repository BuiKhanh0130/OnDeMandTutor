import classNames from 'classnames/bind';
import { Row, Col } from 'react-bootstrap';

import Image from '~/components/Image';
import Button from '~/components/Button';
import Clip from '~/components/Clip';
import { ModalContext } from '~/components/ModalProvider';

import styles from './Video.module.scss';
import { useContext } from 'react';

const cx = classNames.bind(styles);

function Video({ accountId, tutorId, avatar, name, headline, description, clip }) {
    const { setTutorId } = useContext(ModalContext);
    console.log(tutorId);
    return (
        <div className={cx('wrapper')}>
            <Row className={cx('container__video-user')}>
                <Col lg="1">
                    <Image src={avatar} alt={'NTP'}></Image>
                </Col>
                <Col lg="9" className={cx('container__video-user-summary')}>
                    <span>{name}</span>
                    <p>{headline}</p>
                    <p>{description}</p>
                    <Clip width={'600'} height={'315'} clip={clip} />
                </Col>
                <Col lg="2">
                    <Button
                        orange
                        to={`/account/tutor/${name}`}
                        onClick={() => {
                            setTutorId(tutorId);
                        }}
                        className={cx('container__video-user-btn')}
                    >
                        About {name.split(' ')[name.split(' ').length - 1]}
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

export default Video;
