import Button from '~/components/Button/Button';
import styles from './Doctor.module.scss';
import classNames from 'classnames/bind';
import { faBed, faMagnifyingGlass, faTrashCan, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import FormOrder from '../FormOrder';
import Item from '~/components/Item';

const cx = classNames.bind(styles);
function Doctor() {
    const [checkAdd, setCheckAdd] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [checkEdit, setCheckEdit] = useState(false);
    const [input, setInput] = useState('');
    const [checkDetail, setCheckDetail] = useState(false);
    const [newUser, setNewUser] = useState({
        name: '',
        phone: '',
        email: '',
        speciatly: '',
    });
    const [eUser, setEUser] = useState({
        name: '',
        phone: '',
        email: '',
        speciatly: '',
    });
    const getAll = () => {
        fetch('http://localhost:8002/api/doctor/')
            .then((res) => res.json())
            .then((res) => {
                setDoctors(res);
            });
    };
    useEffect(() => {
        getAll();
    }, []);
    const [phongs, setPhongs] = useState();
    const turnPhong = async (id) => {
        const wait = await fetch(`http://localhost:8006//api/appointment/getdoctor/${id}/`)
            .then((res) => res.json())
            .then((res) => {
                setPhongs(res);
            });
        setCheckDetail(true);
    };

    const deleteUser = async (id) => {
        const fetchOptions = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
        };
        const response = await fetch(`http://localhost:8002/api/doctor/${id}`, fetchOptions);
        if (response.ok) {
            alert('Success');
            getAll();
        } else {
            alert('Fail');
        }
    };
    const editUser = async (id) => {
        const fetchOptions = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(eUser),
        };
        const response = await fetch(`http://localhost:8002/api/doctor/${id}`, fetchOptions);
        if (response.ok) {
            alert('Success');
            getAll();
            setCheckEdit(false);
            setEUser('');
        } else {
            alert('Fail');
        }
    };
    const turnAdd = () => {
        setCheckAdd(true);
        setCheckEdit(false);
    };
    const offAdd = () => {
        setCheckAdd(false);
        localStorage.removeItem('userid');
    };
    const turnEdit = (userid) => {
        setCheckEdit(true);
        fetch(`http://localhost:8002/api/doctor/${userid}`)
            .then((res) => res.json())
            .then((res) => {
                setEUser(res);
            });
    };
    const offEdit = () => {
        setCheckEdit(false);
        setEUser('');
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewUser({ ...newUser, [name]: value });
    };
    const handleEditChange = (event) => {
        const { name, value } = event.target;
        setEUser({ ...eUser, [name]: value });
    };
    const handleChangeInput = (event) => {
        setInput(event.target.value);
    };
    const addUser = async () => {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(newUser),
        };
        const response = await fetch('http://localhost:8002/api/doctor/', fetchOptions);
        if (response.ok) {
            alert('Success');
            getAll();
            setCheckAdd(false);
        } else {
            const error = await response.text();
            alert(error);
        }
    };

    useEffect(() => {
        // Gọi API tìm kiếm khi input thay đổi, áp dụng debounce 500ms

        fetch(`http://127.0.0.1:8002/api/doctor/search/?keywords=${input}`)
            .then((res) => res.json())
            .then((res) => {
                setDoctors(res);
            })
            .catch((error) => {
                // Xử lý lỗi nếu cần
            });
    }, [input]);
    const closeBill = () => {
        setCheckDetail(false);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('main')}>
                <div className={cx('header')}>
                    <div className={cx('header_main')}>
                        <p>Quản lý bác sĩ</p>
                        <div className={cx('search_main')}>
                            <div className={cx('input_header')}>
                                <input type="text" placeholder="Search" onChange={handleChangeInput}></input>
                            </div>
                        </div>
                        <div className={cx('add')}>
                            <Button primary fullwidth onClick={() => turnAdd()}>
                                Thêm mới
                            </Button>
                        </div>
                    </div>
                    {checkDetail ? (
                        <div className={cx('add_account')}>
                            <div className={cx('add_account_main_2')}>
                                <p>Danh sách lịch hẹn</p>
                                {phongs.length > 0 ? (
                                    phongs.map((appointment) => {
                                        return (
                                            <div className={cx('flex_giuong')}>
                                                <p>Ngày: {appointment.day}</p>
                                                <p>Thời gian: {appointment.time}</p>
                                                <p>Trạng thái: {appointment.status}</p>
                                                <Item id={appointment.patientId} type={1}></Item>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p>Chưa có lịch hẹn</p>
                                )}
                            </div>
                            <div className={cx('button')}>
                                <div className={cx('accept2')}>
                                    <Button normal large onClick={closeBill}>
                                        Đóng
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div></div>
                    )}
                    {checkAdd ? (
                        <div className={cx('add_account')}>
                            <div className={cx('add_account_main')}>
                                <div className={cx('add_item')} onChange={handleChange}>
                                    <p>Tên bác sĩ</p>
                                    <input type="text" placeholder="Nhập tên" name="name"></input>
                                </div>

                                <div className={cx('add_item')}>
                                    <p>Số điện thoại</p>
                                    <input
                                        type="text"
                                        placeholder="Nhap số điện thoại"
                                        onChange={handleChange}
                                        name="phone"
                                    ></input>
                                </div>
                                <div className={cx('add_item')}>
                                    <p>Email</p>
                                    <input
                                        type="text"
                                        placeholder="Nhập email"
                                        onChange={handleChange}
                                        name="email"
                                    ></input>
                                </div>
                                <div className={cx('add_item')}>
                                    <p>Khoa</p>
                                    <input
                                        type="text"
                                        placeholder="Nhập khoa"
                                        onChange={handleChange}
                                        name="speciatly"
                                    ></input>
                                </div>
                            </div>
                            <div className={cx('button')}>
                                <div className={cx('accept')}>
                                    <Button primary fullwidth onClick={() => addUser()}>
                                        Tạo tài khoản
                                    </Button>
                                </div>
                                <div className={cx('accept2')}>
                                    <Button normal large onClick={() => offAdd()}>
                                        Đóng
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div></div>
                    )}
                    {/* -------------------------------------Edit--------------------------------------------------------- */}
                    {checkEdit ? (
                        <div className={cx('add_account')}>
                            <div className={cx('add_account_main')}>
                                <div className={cx('add_item')}>
                                    <p>Tên bác sĩ</p>
                                    <input
                                        type="text"
                                        placeholder="Nhập tên"
                                        name="name"
                                        defaultValue={eUser.name}
                                        onChange={handleEditChange}
                                    ></input>
                                </div>

                                <div className={cx('add_item')}>
                                    <p>Số điện thoại</p>
                                    <input
                                        type="text"
                                        placeholder="Numberphone"
                                        onChange={handleEditChange}
                                        name="phone"
                                        defaultValue={eUser.phone}
                                    ></input>
                                </div>
                                <div className={cx('add_item')}>
                                    <p>Email</p>
                                    <input
                                        type="text"
                                        placeholder="Email"
                                        onChange={handleEditChange}
                                        name="email"
                                        defaultValue={eUser.email}
                                    ></input>
                                </div>
                                <div className={cx('add_item')}>
                                    <p>Khoa</p>
                                    <input
                                        type="text"
                                        placeholder="Khoa"
                                        onChange={handleEditChange}
                                        name="speciatly"
                                        defaultValue={eUser.speciatly}
                                    ></input>
                                </div>
                            </div>
                            <div className={cx('button')}>
                                <div className={cx('accept')}>
                                    <Button primary fullwidth onClick={() => editUser(eUser.id)}>
                                        Xác nhận
                                    </Button>
                                </div>
                                <div className={cx('accept2')}>
                                    <Button normal large onClick={() => offEdit()}>
                                        Đóng
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
                <div className={cx('container')}>
                    <div className={cx('container_main')}>
                        {doctors.map((doctor) => {
                            return (
                                <div className={cx('account_item')} key={doctor.id}>
                                    <div className={cx('name', 'account')}>
                                        <p>{doctor.name}</p>
                                    </div>
                                    <div className={cx('password', 'account')}>
                                        <p>{doctor.speciatly}</p>
                                    </div>
                                    <div className={cx('role', 'account')}>
                                        <p>{doctor.phone}</p>
                                    </div>
                                    <div className={cx('edit')} onClick={() => turnEdit(doctor.id)}>
                                        <div className={cx('edit_box')}>
                                            <FontAwesomeIcon icon={faUserPen} />
                                            <p>Edit</p>
                                        </div>
                                    </div>
                                    <div className={cx('edit')} onClick={() => deleteUser(doctor.id)}>
                                        <div className={cx('edit_box')}>
                                            <FontAwesomeIcon icon={faTrashCan} />
                                            <p>Delete</p>
                                        </div>
                                    </div>
                                    <div className={cx('edit')} onClick={() => turnPhong(doctor.id)}>
                                        <div className={cx('edit_box')}>
                                            <FontAwesomeIcon icon={faBed} />
                                            <p>Lịch hẹn</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Doctor;
