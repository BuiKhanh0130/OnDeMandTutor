import classNames from 'classnames/bind';
import { useEffect, useRef } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Image from '~/components/Image';

import styles from './GreatPanel.module.scss';

const cx = classNames.bind(styles);

function GreatPanel({ greatTutors }) {
    const nodeRef = useRef();
    const nodeRef2 = useRef();

    useEffect(() => {
        const currentScroll = '.' + nodeRef.current.className;
        const greatTutorPanel_animation = '.' + nodeRef2.current.className;

        const scrollers = document.querySelectorAll(currentScroll);

        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            addAnimation();
        }

        function addAnimation() {
            scrollers.forEach((scroller) => {
                scroller.setAttribute('data-animated', true);

                const scrollerInner = scroller.querySelector(greatTutorPanel_animation);
                const scrollerContent = Array.from(scrollerInner.children);

                scrollerContent.forEach((item) => {
                    const duplicatedItem = item.cloneNode(true);
                    duplicatedItem.setAttribute('aria-hidden', true);
                    scrollerInner.appendChild(duplicatedItem);
                });
            });
        }
    }, []);

    return (
        <Row className={cx('wrapper')}>
            <Col>
                {greatTutors.map((greatTutorChildren, index) => {
                    return (
                        <div key={index} className={cx('greatTutorPanel__container')}>
                            <div className={cx('greatTutorPanel__container-title')}>{greatTutorChildren.title}</div>
                            <div className={cx('greatTutorPanel__container-summary')}>{greatTutorChildren.summary}</div>

                            <div className={cx('scroller')} ref={nodeRef} data-direction={'left'}>
                                <div className={cx('greatTutorPanel__container-animation')} ref={nodeRef2}>
                                    {greatTutorChildren.subjects.map((subject, index) => {
                                        return (
                                            <div key={index} className={cx('greatTutorPanel__container-subjects')}>
                                                <div className={cx('greatTutorPanel__container-subjects-left')}>
                                                    <Image src={subject.avatar} alt={'#'}></Image>
                                                </div>
                                                <div className={cx('greatTutorPanel__container-subjects-right')}>
                                                    <p
                                                        className={cx(
                                                            'greatTutorPanel__container-subjects-right-label',
                                                        )}
                                                    >
                                                        {subject.label}
                                                    </p>
                                                    <p
                                                        className={cx(
                                                            'greatTutorPanel__container-subjects-right-content',
                                                        )}
                                                    >
                                                        {subject.content}
                                                    </p>
                                                    <p
                                                        className={cx(
                                                            'greatTutorPanel__container-subjects-right-level',
                                                        )}
                                                    >
                                                        {subject.level}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className={cx('scroller')} ref={nodeRef} data-direction={'right'}>
                                <div className={cx('greatTutorPanel__container-animation')} ref={nodeRef2}>
                                    {greatTutorChildren.subjects.map((subject, index) => {
                                        return (
                                            <div key={index} className={cx('greatTutorPanel__container-subjects')}>
                                                <div className={cx('greatTutorPanel__container-subjects-left')}>
                                                    <Image src={subject.avatar} alt={'#'}></Image>
                                                </div>
                                                <div className={cx('greatTutorPanel__container-subjects-right')}>
                                                    <p
                                                        className={cx(
                                                            'greatTutorPanel__container-subjects-right-label',
                                                        )}
                                                    >
                                                        {subject.label}
                                                    </p>
                                                    <p
                                                        className={cx(
                                                            'greatTutorPanel__container-subjects-right-content',
                                                        )}
                                                    >
                                                        {subject.content}
                                                    </p>
                                                    <p
                                                        className={cx(
                                                            'greatTutorPanel__container-subjects-right-level',
                                                        )}
                                                    >
                                                        {subject.level}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Col>
        </Row>
    );
}

export default GreatPanel;
