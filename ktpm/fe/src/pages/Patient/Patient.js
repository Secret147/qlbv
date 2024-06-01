import Button from '~/components/Button/Button';
import styles from './Patient.module.scss';
import classNames from 'classnames/bind';
import { faCalendar, faFile, faMagnifyingGlass, faTrashCan, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import FormOrder from '../FormOrder';
import FormAppointment from '../FormAppointment';

const cx = classNames.bind(styles);
function Patient() {
    const [checkAdd, setCheckAdd] = useState(false);
    const [patients, setPatients] = useState([]);
    const [checkEdit, setCheckEdit] = useState(false);
    const [patientR, setPatientR] = useState();
    const [input, setInput] = useState('');
    const [hoso, setHoso] = useState(false);
    const [lich, setLich] = useState(false);
    const [recordId, setRecordId] = useState();
    const [newUser, setNewUser] = useState({
        name: '',
        phone: '',
        email: '',
        date: '',
        gender: '',
        address: '',
    });
    const [eUser, setEUser] = useState({
        name: '',
        phone: '',
        email: '',
        date: '',
        gender: '',
        address: '',
    });
    const getAll = () => {
        fetch('http://localhost:8003/api/patient/')
            .then((res) => res.json())
            .then((res) => {
                setPatients(res);
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
        const response = await fetch(`http://localhost:8003/api/patient/${id}`, fetchOptions);
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
        const response = await fetch(`http://localhost:8003/api/patient/${id}`, fetchOptions);
        if (response.ok) {
            alert('Success');
            getAll();
            setEUser('');
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
        fetch(`http://localhost:8003/api/patient/${userid}`)
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
        const response = await fetch('http://localhost:8003/api/patient/', fetchOptions);
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

        fetch(`http://127.0.0.1:8003/api/patient/search/?keywords=${input}`)
            .then((res) => res.json())
            .then((res) => {
                setPatients(res);
            })
            .catch((error) => {
                // Xử lý lỗi nếu cần
            });
    }, [input]);
    return (
        <div className={cx('wrapper')}>
            {hoso ? <FormOrder recordId={recordId} patient={patientR} /> : <></>}
            {lich ? <FormAppointment patient={patientR} /> : <></>}
            <div className={cx('main')}>
                <div className={cx('header')}>
                    <div className={cx('header_main')}>
                        <p>Quản lý bệnh nhân</p>
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
                                    <p>Tên bệnh nhân</p>
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
                                    <p>Gender</p>
                                    <input
                                        type="text"
                                        placeholder="Giới tính"
                                        onChange={handleChange}
                                        name="gender"
                                    ></input>
                                </div>
                                <div className={cx('add_item')}>
                                    <p>Địa chỉ</p>
                                    <input
                                        type="text"
                                        placeholder="Địa chỉ"
                                        onChange={handleChange}
                                        name="address"
                                    ></input>
                                </div>
                                <div className={cx('add_item')}>
                                    <p>Ngày sinh</p>
                                    <input type="text" placeholder="date" onChange={handleChange} name="date"></input>
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
                                    <p>Tên</p>
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
                                    <p>Gender</p>
                                    <input
                                        type="text"
                                        placeholder="Giới tính"
                                        onChange={handleChange}
                                        name="gender"
                                        defaultValue={eUser.gender}
                                    ></input>
                                </div>
                                <div className={cx('add_item')}>
                                    <p>Địa chỉ</p>
                                    <input
                                        type="text"
                                        placeholder="Địa chỉ"
                                        onChange={handleChange}
                                        name="address"
                                        defaultValue={eUser.address}
                                    ></input>
                                </div>
                                <div className={cx('add_item')}>
                                    <p>Ngày sinh</p>
                                    <input
                                        type="text"
                                        placeholder="date"
                                        onChange={handleChange}
                                        name="date"
                                        defaultValue={eUser.date}
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
                        {patients.map((patient) => {
                            return (
                                <div className={cx('account_item')} key={Patient.id}>
                                    <div className={cx('name', 'account')}>
                                        <p>{patient.name}</p>
                                    </div>
                                    <div className={cx('password', 'account')}>
                                        <p>{patient.phone}</p>
                                    </div>

                                    <div
                                        className={cx('edit')}
                                        onClick={() => {
                                            setLich(true);
                                            setPatientR(patient);
                                        }}
                                    >
                                        <div className={cx('edit_box')}>
                                            <FontAwesomeIcon icon={faCalendar} />
                                            <p>Đặt lịch</p>
                                        </div>
                                    </div>
                                    <div
                                        className={cx('edit')}
                                        onClick={() => {
                                            setHoso(true);
                                            setRecordId(patient.recordId);
                                            setPatientR(patient);
                                        }}
                                    >
                                        <div className={cx('edit_box')}>
                                            <FontAwesomeIcon icon={faFile} />
                                            <p>Hồ sơ</p>
                                        </div>
                                    </div>
                                    <div className={cx('edit')} onClick={() => turnEdit(patient.id)}>
                                        <div className={cx('edit_box')}>
                                            <FontAwesomeIcon icon={faTrashCan} />
                                            <p>Update</p>
                                        </div>
                                    </div>
                                    <div className={cx('edit')} onClick={() => deleteUser(patient.id)}>
                                        <div className={cx('edit_box')}>
                                            <FontAwesomeIcon icon={faTrashCan} />
                                            <p>Delete</p>
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
export default Patient;
