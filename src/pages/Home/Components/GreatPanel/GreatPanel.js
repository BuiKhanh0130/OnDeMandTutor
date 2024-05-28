import classNames from 'classnames/bind';

import { useEffect, useRef } from 'react';

import Image from '~/components/Image';

import styles from './GreatPanel.module.scss';

const cx = classNames.bind(styles);

function GreatPanel({ greatTutors }) {
    const nodeRef = useRef();
    const nodeRef2 = useRef();

    useEffect(() => {
        const currentScroll = '.' + nodeRef.current.className;
        const GreatTutorPanel_animation = '.' + nodeRef2.current.className;

        const scrollers = document.querySelectorAll(currentScroll);

        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            addAnimation();
        }

        function addAnimation() {
            scrollers.forEach((scroller) => {
                scroller.setAttribute('data-animated', true);

                const scrollerInner = scroller.querySelector(GreatTutorPanel_animation);
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
        <div className={cx('GreatTutorPanel')}>
            {greatTutors.map((greatTutorChildren, index) => {
                return (
                    <div key={index} className={cx('GreatTutorPanel-container')}>
                        <div className={cx('GreatTutorPanel-title')}>{greatTutorChildren.title}</div>
                        <div className={cx('GreatTutorPanel-summary')}>{greatTutorChildren.summary}</div>

                        <div className={cx('scroller')} ref={nodeRef} ata-direction={'left'}>
                            <div className={cx('GreatTutorPanel-animation')} ref={nodeRef2}>
                                {greatTutorChildren.subjects.map((subject, index) => {
                                    return (
                                        <div key={index} className={cx('GreatTutorPanel_subjects')}>
                                            <div className={cx('GreatTutorPanel_subjects-left')}>
                                                <Image src={subject.avatar} alt={'#'}></Image>
                                            </div>
                                            <div className={cx('GreatTutorPanel_subjects-right')}>
                                                <p className={cx('GreatTutorPanel_subjects-right-label')}>
                                                    {subject.label}
                                                </p>
                                                <p className={cx('GreatTutorPanel_subjects-right-content')}>
                                                    {subject.content}
                                                </p>
                                                <p className={cx('GreatTutorPanel_subjects-right-level')}>
                                                    {subject.level}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className={cx('scroller')} ref={nodeRef} data-direction={'right'}>
                            <div className={cx('GreatTutorPanel-animation')} ref={nodeRef2}>
                                {greatTutorChildren.subjects.map((subject, index) => {
                                    return (
                                        <div key={index} className={cx('GreatTutorPanel_subjects')}>
                                            <div className={cx('GreatTutorPanel_subjects-left')}>
                                                <Image src={subject.avatar} alt={'#'}></Image>
                                            </div>
                                            <div className={cx('GreatTutorPanel_subjects-right')}>
                                                <p className={cx('GreatTutorPanel_subjects-right-label')}>
                                                    {subject.label}
                                                </p>
                                                <p className={cx('GreatTutorPanel_subjects-right-content')}>
                                                    {subject.content}
                                                </p>
                                                <p className={cx('GreatTutorPanel_subjects-right-level')}>
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
        </div>
    );
}

export default GreatPanel;
