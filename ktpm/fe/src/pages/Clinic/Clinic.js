import Button from '~/components/Button/Button';
import styles from './Clinic.module.scss';
import classNames from 'classnames/bind';
import { faBed, faMagnifyingGlass, faTrashCan, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import FormOrder from '../FormOrder';
import Item from '~/components/Item';

const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
};
const cx = classNames.bind(styles);
function Clinic() {
    const [checkAdd, setCheckAdd] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [checkEdit, setCheckEdit] = useState(false);
    const [checkDetail, setCheckDetail] = useState(false);
    const [input, setInput] = useState('');
    const [lichkham, setLichkham] = useState();
    const [newUser, setNewUser] = useState({
        name: '',
        phone: '',
        email: '',
    });
    const [eUser, setEUser] = useState({
        name: '',
        phone: '',
        email: '',
    });
    const getAll = () => {
        fetch('http://localhost:8005/api/clinic/')
            .then((res) => res.json())
            .then((res) => {
                setAppointments(res);
            });
    };
    useEffect(() => {
        getAll();
    }, []);
    const getLichKham = async (id) => {
        const getlk = await fetch(`http://localhost:8005/api/clinic/${id}`)
            .then((res) => res.json())
            .then((res) => {
                setLichkham(res);
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
        const response = await fetch(`http://localhost:8005/api/clinic/${id}`, fetchOptions);
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
        const response = await fetch(`http://localhost:8005/api/clinic/${id}`, fetchOptions);
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
        fetch(`http://localhost:8005/api/clinic/${userid}`)
            .then((res) => res.json())
            .then((res) => {
                setEUser(res);
            });
    };
    const [phongs, setPhongs] = useState();
    const turnPhong = async (id) => {
        const wait = await fetch(`http://localhost:8005/api/hospitalbed/clinics/${id}/beds/`)
            .then((res) => res.json())
            .then((res) => {
                setPhongs(res);
            });
        setCheckDetail(true);
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
        const response = await fetch('http://localhost:8005/api/clinic/', fetchOptions);
        if (response.ok) {
            alert('Success');
            getAll();
            setCheckAdd(false);
        } else {
            const error = await response.text();
            alert(error);
        }
    };
    const closeBill = () => {
        setCheckDetail(false);
    };

    useEffect(() => {
        // Gọi API tìm kiếm khi input thay đổi, áp dụng debounce 500ms

        fetch(`http://127.0.0.1:8005/api/clinic/search/?keywords=${input}`)
            .then((res) => res.json())
            .then((res) => {
                setAppointments(res);
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
                        <p>Quản lý phòng khám</p>
                        <div className={cx('search_main')}>
                            <div className={cx('input_header')}>
                                <input type="text" placeholder="Search" onChange={handleChangeInput}></input>
                            </div>
                        </div>
                        {/* <div className={cx('add')}>
                            <Button primary fullwidth onClick={() => turnAdd()}>
                                Thêm mới
                            </Button>
                        </div> */}
                    </div>
                    {checkDetail ? (
                        <div className={cx('add_account')}>
                            <div className={cx('add_account_main_2')}>
                                <p>Danh sách giường</p>
                                {phongs.length > 0 ? (
                                    phongs.map((giuong) => {
                                        return (
                                            <div className={cx('flex_giuong')}>
                                                <p>Giường số: 0{giuong.number}</p>
                                                <p>Trạng thái: {giuong.status}</p>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p>Chưa có giường nào</p>
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
                    {/* -------------------------------------Edit--------------------------------------------------------- */}
                    {checkEdit ? (
                        <div className={cx('add_account')}>
                            <div className={cx('add_account_main')}>
                                <div className={cx('add_item')}>
                                    <p>Tên phòng khám</p>
                                    <input
                                        type="text"
                                        placeholder="Nhập tên"
                                        name="name"
                                        defaultValue={eUser.name}
                                        onChange={handleEditChange}
                                    ></input>
                                </div>

                                <div className={cx('add_item')}>
                                    <p>Loại phòng khám</p>
                                    <input
                                        type="text"
                                        placeholder="Nhập loại"
                                        onChange={handleEditChange}
                                        name="type"
                                        defaultValue={eUser.type}
                                    ></input>
                                </div>
                            </div>
                            <div className={cx('button')}>
                                <div className={cx('accept')}>
                                    <Button primary medium onClick={() => editUser(eUser.id)}>
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
                        {appointments.map((appointment) => {
                            return (
                                <div className={cx('account_item')} key={appointment.id}>
                                    <div className={cx('name', 'account')}>
                                        <p>Mã: {appointment.id}</p>
                                    </div>
                                    <div className={cx('password', 'account')}>
                                        <p>Phòng: {appointment.name}</p>
                                    </div>
                                    <div className={cx('role', 'account')}>
                                        <p>{appointment.type}</p>
                                    </div>

                                    <div className={cx('edit')} onClick={() => turnEdit(appointment.id)}>
                                        <div className={cx('edit_box')}>
                                            <FontAwesomeIcon icon={faUserPen} />
                                            <p>Edit</p>
                                        </div>
                                    </div>

                                    <div className={cx('edit')} onClick={() => deleteUser(appointment.id)}>
                                        <div className={cx('edit_box')}>
                                            <FontAwesomeIcon icon={faTrashCan} />
                                            <p>Delete</p>
                                        </div>
                                    </div>
                                    <div className={cx('edit')} onClick={() => turnPhong(appointment.id)}>
                                        <div className={cx('edit_box')}>
                                            <FontAwesomeIcon icon={faBed} />
                                            <p>List bed</p>
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
export default Clinic;
