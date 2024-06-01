import Button from '~/components/Button/Button';
import styles from './Record.module.scss';
import classNames from 'classnames/bind';
import { faMagnifyingGlass, faTrashCan, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Item from '~/components/Item';

const cx = classNames.bind(styles);
function Record() {
    const [checkAdd, setCheckAdd] = useState(false);
    const [patients, setPatients] = useState([]);
    const [checkEdit, setCheckEdit] = useState(false);
    const [input, setInput] = useState('');
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
        fetch('http://localhost:8004/api/record/')
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
        const response = await fetch(`http://localhost:8004/api/record/${id}`, fetchOptions);
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
        const response = await fetch(`http://localhost:8004/api/record/${id}`, fetchOptions);
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
        fetch(`http://localhost:8004/api/record/${userid}`)
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
        const response = await fetch('http://localhost:8004/api/record/', fetchOptions);
        if (response.ok) {
            alert('Success');
            getAll();
            setCheckAdd(false);
        } else {
            const error = await response.text();
            alert(error);
        }
    };

    const [checkDetail, setCheckDetail] = useState(false);
    const [hoSo, setHoso] = useState();

    const getHoso = async (id) => {
        const getlk = await fetch(`http://localhost:8004/api/record/${id}`)
            .then((res) => res.json())
            .then((res) => {
                setHoso(res);
            });
        setCheckDetail(true);
    };

    useEffect(() => {
        // Gọi API tìm kiếm khi input thay đổi, áp dụng debounce 500ms

        fetch(`http://127.0.0.1:8004/api/record/search/?keywords=${input}`)
            .then((res) => res.json())
            .then((res) => {
                setPatients(res);
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
                        <p>Quản lý hồ sơ y tế</p>
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
                                {/* <p>Ngày tạo: {hoSo.day} </p> */}
                                <div className={cx('detail_flex_1')}>
                                    <p>Mã số: {hoSo.id} </p>

                                    <Item id={hoSo.doctorId} type={2}></Item>
                                    <p>Ngày tạo: {hoSo.date} </p>
                                </div>
                                <div className={cx('detail_flex')}>
                                    <p>Chẩn đoán: {hoSo.diagnosis} </p>
                                    <p>Phương pháp điều trị: {hoSo.treatment} </p>
                                    <p>Đơn thuốc: {hoSo.prescription} </p>
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
                                    <p>Chẩn đoán</p>
                                    <input
                                        type="text"
                                        placeholder="Chẩn đoán"
                                        name="diagnosis"
                                        defaultValue={eUser.diagnosis}
                                        onChange={handleEditChange}
                                    ></input>
                                </div>

                                <div className={cx('add_item')}>
                                    <p>Phương pháp điều trị</p>
                                    <input
                                        type="text"
                                        placeholder="Phương pháp"
                                        onChange={handleEditChange}
                                        name="treatment"
                                        defaultValue={eUser.treatment}
                                    ></input>
                                </div>
                                <div className={cx('add_item')}>
                                    <p>Đơn thuốc</p>
                                    <input
                                        type="text"
                                        placeholder="Đơn thuốc"
                                        onChange={handleEditChange}
                                        name="prescription"
                                        defaultValue={eUser.prescription}
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
                                <div className={cx('account_item')} key={patient.id}>
                                    <div className={cx('name', 'account')}>
                                        <p>Mã hồ sơ: {patient.id}</p>
                                    </div>
                                    <div className={cx('password', 'account')}>
                                        <p>Ngày tạo: {patient.date}</p>
                                    </div>

                                    <div className={cx('edit')} onClick={() => turnEdit(patient.id)}>
                                        <div className={cx('edit_box')}>
                                            <FontAwesomeIcon icon={faUserPen} />
                                            <p>Edit</p>
                                        </div>
                                    </div>
                                    <div className={cx('edit')} onClick={() => deleteUser(patient.id)}>
                                        <div className={cx('edit_box')}>
                                            <FontAwesomeIcon icon={faTrashCan} />
                                            <p>Delete</p>
                                        </div>
                                    </div>
                                    <div className={cx('edit')} onClick={() => getHoso(patient.id)}>
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
export default Record;
