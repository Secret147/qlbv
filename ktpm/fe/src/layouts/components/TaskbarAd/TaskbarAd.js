import {
    faCalendar,
    faClinicMedical,
    faComments,
    faFile,
    faGroupArrowsRotate,
    faHouseUser,
    faKitMedical,
    faMobileScreen,
    faMoneyBill,
    faReceipt,
    faRug,
    faUser,
    faUserDoctor,
    faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import styles from './TaskbarAd.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useState } from 'react';

const cx = classNames.bind(styles);
function TaskbarAd() {
    const [checkAdmin, setCheckAdmin] = useState();
    return (
        <div className={cx('wrapper')}>
            <div className={cx('task_main')}>
                <div className={cx('header')}>
                    <div className={cx('img')}>
                        <img
                            src="https://i.pinimg.com/236x/54/4d/28/544d28f895914b1e31c9fadc79d0cd5f.jpg"
                            alt="admin"
                        ></img>
                    </div>
                    <div className={cx('name')}>
                        <p>{Cookies.get('user')}</p>
                    </div>
                </div>
                <div className={cx('container')}>
                    <div className={cx('container_main')}>
                        {Cookies.get('role') > 0 ? (
                            <Link to={'/admin'}>
                                <div className={cx('container_item')}>
                                    <div className={cx('icon')}>
                                        <FontAwesomeIcon icon={faUserGroup} />
                                    </div>
                                    <p>Quản lý tài khoản</p>
                                </div>
                            </Link>
                        ) : (
                            <></>
                        )}

                        <Link to={'/doctor'}>
                            <div className={cx('container_item')}>
                                <div className={cx('icon')}>
                                    <FontAwesomeIcon icon={faUserDoctor} />
                                </div>
                                <p>Quản lý bác sĩ</p>
                            </div>
                        </Link>
                        <Link to={'/patient'}>
                            <div className={cx('container_item')}>
                                <div className={cx('icon')}>
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                                <p>Quản lý bệnh nhân</p>
                            </div>
                        </Link>
                        <Link to={'/record'}>
                            <div className={cx('container_item')}>
                                <div className={cx('icon')}>
                                    <FontAwesomeIcon icon={faFile} />
                                </div>
                                <p>Hồ sơ y tế</p>
                            </div>
                        </Link>
                        <Link to={'/appointment'}>
                            <div className={cx('container_item')}>
                                <div className={cx('icon')}>
                                    <FontAwesomeIcon icon={faCalendar} />
                                </div>
                                <p>Quản lý lịch hẹn</p>
                            </div>
                        </Link>
                        {Cookies.get('role') > 0 ? (
                            <Link to={'/clinic'}>
                                <div className={cx('container_item')}>
                                    <div className={cx('icon')}>
                                        <FontAwesomeIcon icon={faClinicMedical} />
                                    </div>
                                    <p>Phòng khám và giường bệnh</p>
                                </div>
                            </Link>
                        ) : (
                            <></>
                        )}
                        {Cookies.get('role') > 0 ? (
                            <Link to={'/supplies'}>
                                <div className={cx('container_item')}>
                                    <div className={cx('icon')}>
                                        <FontAwesomeIcon icon={faKitMedical} />
                                    </div>
                                    <p>Quản lí vật tư</p>
                                </div>
                            </Link>
                        ) : (
                            <></>
                        )}

                        {/* <Link to={'/bill'}>
                            <div className={cx('container_item')}>
                                <div className={cx('icon')}>
                                    <FontAwesomeIcon icon={faMoneyBill} />
                                </div>
                                <p>Quản lí hóa đơn</p>
                            </div>
                        </Link> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TaskbarAd;
