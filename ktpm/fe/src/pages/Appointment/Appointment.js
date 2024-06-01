import Button from '~/components/Button/Button';
import styles from './Appointment.module.scss';
import classNames from 'classnames/bind';
import { faMagnifyingGlass, faTrashCan, faUserPen } from '@fortawesome/free-solid-svg-icons';
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
function Appointment() {
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
        fetch('http://localhost:8006/api/appointment/')
            .then((res) => res.json())
            .then((res) => {
                setAppointments(res);
            });
    };
    useEffect(() => {
        getAll();
    }, []);
    const getLichKham = async (id) => {
        const getlk = await fetch(`http://localhost:8006/api/appointment/${id}`)
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
        const response = await fetch(`http://localhost:8006/api/appointment/${id}`, fetchOptions);
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
        const response = await fetch(`http://localhost:8006/api/appointment/${id}`, fetchOptions);
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
        fetch(`http://localhost:8006/api/appointment/${userid}`)
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
        const response = await fetch('http://localhost:8006/api/appointment/', fetchOptions);
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

        fetch(`http://127.0.0.1:8006/api/appointment/search/?keywords=${input}`)
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
                        <p>Quản lý lịch hẹn</p>
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
                            <div className={cx('add_account_main')}>
                                {/* <p>Ngày tạo: {lichkham.day} </p> */}
                                <div className={cx('detail_flex_1')}>
                                    <p>Mã số: {lichkham.id} </p>
                                    <Item id={lichkham.patientId} type={1}></Item>
                                    <Item id={lichkham.doctorId} type={2}></Item>
                                    <Item id={lichkham.clinicId} type={3}></Item>
                                </div>
                                <div className={cx('detail_flex')}>
                                    <p>Ngày khám: {lichkham.day} </p>
                                    <p>Giờ khám: {lichkham.time} </p>
                                    <p>Ghi chú: {lichkham.notes ? lichkham.notes : 'Không có ghi chú'} </p>
                                </div>

                                <div className={cx('list_product')}></div>
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
                                    <p>Ngày khám</p>
                                    <input
                                        type="text"
                                        placeholder="Nhập ngày"
                                        name="day"
                                        defaultValue={eUser.day}
                                        onChange={handleEditChange}
                                    ></input>
                                </div>

                                <div className={cx('add_item')}>
                                    <p>Giờ khám</p>
                                    <input
                                        type="text"
                                        placeholder="Nhập giờ"
                                        onChange={handleEditChange}
                                        name="time"
                                        defaultValue={eUser.time}
                                    ></input>
                                </div>
                                <div className={cx('add_item')}>
                                    <p>Ghi chú</p>
                                    <input
                                        type="text"
                                        placeholder="Ghi chú"
                                        onChange={handleEditChange}
                                        name="notes"
                                        defaultValue={eUser.notes}
                                    ></input>
                                </div>
                                <div className={cx('add_item')}>
                                    <p>Trạng thái</p>
                                    <input
                                        type="text"
                                        placeholder="Trạng thái"
                                        onChange={handleEditChange}
                                        name="status"
                                        defaultValue={eUser.status}
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
                                        <p>{appointment.day + ' ' + appointment.time}</p>
                                    </div>
                                    <div className={cx('role', 'account')}>
                                        <p>{appointment.status}</p>
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
                                    <div className={cx('edit')} onClick={() => getLichKham(appointment.id)}>
                                        <div className={cx('edit_box')}>
                                            <FontAwesomeIcon icon={faUserPen} />
                                            <p>Chi tiết</p>
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
export default Appointment;
