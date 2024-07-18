import classNames from 'classnames/bind';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import images from '~/assets/images';
import Image from '~/components/Image';
import Button from '~/components/Button';

import styles from './Video.module.scss';
import Clip from '../../../../components/Clip';

const cx = classNames.bind(styles);

function Video() {
    return (
        <div className={cx('wrapper')}>
            <Row className={cx('container__video-user')}>
                <Col lg="1">
                    <Image src={images.avatar} alt={'NTP'}></Image>
                </Col>
                <Col lg="9" className={cx('container__video-user-summary')}>
                    <span>Nguyen Thanh Phong</span>
                    <p>English/Writing/Reading/Study Habits Tutor</p>
                    <p>
                        Michael has taught my son since this summer. He is very experienced and knowledgeable. He keeps
                        his lesson effective, engaging and fun. My son is able to stay focus and overcome his fear of
                        writing. We definitely plan to keep working with Michael.
                    </p>
                    <Clip width={'530'} height={'315'} />
                </Col>
                <Col lg="2">
                    <Button orange to={'/'} className={cx('container__video-user-btn')}>
                        About Phong
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

export default Video;
