import Button from '~/components/Button/Button';
import styles from './Bill.module.scss';
import classNames from 'classnames/bind';
import { faMagnifyingGlass, faTrashCan, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import FormOrder from '../FormOrder';

const cx = classNames.bind(styles);
function Bill() {
    const [checkAdd, setCheckAdd] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [checkEdit, setCheckEdit] = useState(false);
    const [input, setInput] = useState('');
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
        fetch('http://localhost:8008/api/bill/')
            .then((res) => res.json())
            .then((res) => {
                setDoctors(res);
            });
    };
    useEffect(() => {
        getAll();
    }, []);

    const deleteUser = async (id) => {
        const fetchOptions = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
        };
        const response = await fetch(`http://localhost:8008/api/bill/${id}`, fetchOptions);
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
        const response = await fetch(`http://localhost:8008/api/bill/${id}`, fetchOptions);
        if (response.ok) {
            alert('Success');
            getAll();
            setCheckEdit(false);
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
        fetch(`http://localhost:8008/api/bill/${userid}`)
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
        const response = await fetch('http://localhost:8008/api/bill/', fetchOptions);
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

        fetch(`http://127.0.0.1:8008/api/bill/search/?keywords=${input}`)
            .then((res) => res.json())
            .then((res) => {
                setDoctors(res);
            })
            .catch((error) => {
                // Xử lý lỗi nếu cần
            });
    }, [input]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('main')}>
                <div className={cx('header')}>
                    <div className={cx('header_main')}>
                        <p>Quản lý hóa đơn</p>
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
                                        placeholder="Nhập speciatly"
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
                                    <p>Email</p>
                                    <input
                                        type="text"
                                        placeholder="Speciatly"
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
                                        <p>{doctor.email}</p>
                                    </div>
                                    <div className={cx('role', 'account')}>
                                        <p>{doctor.phone}</p>
                                    </div>
                                    <div className={cx('edit')} onClick={() => turnEdit(doctor.id)}>
                                        <FontAwesomeIcon icon={faUserPen} />
                                        <p>Edit</p>
                                    </div>
                                    <div className={cx('edit')} onClick={() => deleteUser(doctor.id)}>
                                        <FontAwesomeIcon icon={faTrashCan} />
                                        <p>Delete</p>
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
export default Bill;
