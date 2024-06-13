import classNames from 'classnames/bind';

import styles from './BecomeStudent.module.scss';

const cx = classNames.bind(styles);

function BecomeStudent() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('title')}>Register</div>
                <div className={cx('currentForm')}>
                    <form action="post" className={cx('currentForm_content')}>
                        <div className={cx('form_row')}>
                            <label htmlFor="txtUserName">User name</label>
                            <input
                                type="text"
                                id="txtUserName"
                                name="txtUserName"
                                className={cx('txtUserName')}
                                placeholder="Username"
                            ></input>
                        </div>

                        <div className={cx('form_row')}>
                            <label htmlFor="txtUserName">User name</label>
                            <input
                                type="text"
                                id="txtUserName"
                                name="txtUserName"
                                className={cx('txtUserName')}
                                placeholder="Username"
                            ></input>
                        </div>

                        <div className={cx('form_row')}>
                            <label htmlFor="txtPassword">Password</label>
                            <input
                                type="password"
                                id="txtPassword"
                                name="txtPassword"
                                className={cx('txtPassword')}
                                placeholder="******"
                            ></input>
                        </div>

                        <div className={cx('form_row')}>
                            <label htmlFor="txtRePassword">Re-Password</label>
                            <input
                                type="password"
                                id="txtRePassword"
                                name="txtRePassword"
                                className={cx('txtRePassword')}
                                placeholder="******"
                            ></input>
                        </div>

                        <div className={cx('form_row')}>
                            <label htmlFor="txtFullName">Full Name</label>
                            <input
                                type="text"
                                id="txtFullName"
                                name="txtFullName"
                                className={cx('txtFullName')}
                                placeholder="Justin Bieber"
                            ></input>
                        </div>
                        <div className={cx('form_row')}>
                            <label htmlFor="txtCardId">Card Id</label>
                            <input
                                type="number"
                                id="txtCardId"
                                name="txtCardId"
                                className={cx('txtCardId')}
                                placeholder="0000000"
                            ></input>
                        </div>

                        <div className={cx('form_row-birth-radio')}>
                            <div className={cx('form_row-birth')}>
                                <label htmlFor="dateOfBirth">Date of birth</label>
                                <input
                                    type="date"
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    className={cx('dateOfBirth')}
                                ></input>
                            </div>
                            <div className={cx('form_row-radio')}>
                                <p>Gender</p>
                                <div className={cx('form_row-radio-content')}>
                                    <input
                                        type="radio"
                                        className={cx('gender')}
                                        id="gentlemen"
                                        name="gender"
                                        value="gentlemen"
                                    ></input>
                                    <label htmlFor="gentlemen">Boy</label>
                                    <input
                                        type="radio"
                                        className={cx('gender')}
                                        id="lady"
                                        name="gender"
                                        value="lady"
                                    ></input>
                                    <label htmlFor="lady">Girl</label>
                                </div>
                            </div>
                        </div>

                        <div className={cx('form_row')}>
                            <label htmlFor="txtEmail">Email</label>
                            <input
                                type="email"
                                id="txtEmail"
                                name="txtEmail"
                                className={cx('txtEmail')}
                                placeholder="@gmail.com"
                            ></input>
                        </div>

                        <div className={cx('form_row')}>
                            <label htmlFor="txtPhone">Phone</label>
                            <input
                                type="number"
                                id="txtPhone"
                                name="txtPhone"
                                className={cx('txtPhone')}
                                placeholder="+84"
                            ></input>
                        </div>

                        <div className={cx('form_row')}>
                            <label htmlFor="txtEducation">Education</label>
                            <input
                                type="text"
                                id="txtEducation"
                                name="txtEducation"
                                className={cx('txtEducation')}
                                placeholder="Graduate FPT University"
                            ></input>
                        </div>

                        <div className={cx('form_row')}>
                            <label htmlFor="txtAddress">Address</label>
                            <input
                                type="text"
                                id="txtAddress"
                                name="txtAddress"
                                className={cx('txtAddress')}
                                placeholder="Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh 700000"
                            ></input>
                        </div>
                        <input type="submit" className={cx('submit')} value="Submit"></input>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BecomeStudent;
