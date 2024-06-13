import classNames from 'classnames/bind';
import { useState, useMemo } from 'react';

import Button from '~/components/Button';

import styles from './Sidebar.module.scss';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

function Sidebar({ id }) {
    const roles = useMemo(
        () => [
            {
                id: 1,
                btn: 'Apply to become a tutor',
                link: 'tutor',
            },
            {
                id: 2,
                btn: 'Register as a student',
                link: 'student',
            },
        ],
        [],
    );

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('side_navigation')}>
                    {roles.map((role) => {
                        return (
                            <NavLink
                                key={role.id}
                                to={`/registration/${role.link}`}
                                className={({ isActive }) => cx('sidebar-link', { active: isActive })}
                            >
                                {role.btn}
                            </NavLink>
                        );
                    })}
                    <Button to="/">Back to Home</Button>
                </div>
                <p className={cx('label')}>Your username</p>
                <ul className={cx('side_role')}>
                    <li>
                        <span>Free to Sign Up</span>
                        <p>
                            You won’t pay a thing until your lesson is complete. And our Good Fit Guarantee means you’ll
                            love your lesson, or we’ll cover the first hour.
                        </p>
                    </li>
                    <li>
                        <span>Access 1,000+ Experts</span>
                        <p>
                            Welcome to the nation’s largest network of 1–to–1 learning. Browse tutor profiles, hourly
                            rates and over one million reviews and ratings.
                        </p>
                    </li>
                    <li>
                        <span>Find help in over 250 subjects</span>
                        <p>
                            There’s no limit to what you can learn on Wyzant. While most take lessons in traditional
                            academic subjects like math and science, students can also search for art, music, and
                            language tutors.
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
