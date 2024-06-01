import Button from '~/components/Button/Button';
import styles from './FormOrder.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';

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

function FormOrder({ recordId, patient }) {
    const currentDate = formatDate(new Date());
    const [doctor, setDoctor] = useState({
        id: '',
        name: '',
        email: '',
    });
    const [record, setRecord] = useState({
        id: '',
        doctorId: '',
        date: currentDate,
        diagnosis: '',
        treatment: '',
        prescription: '',
    });
    const [checkCreate, setCheckCreate] = useState(false);

    const inputChange = (event) => {
        const { name, value } = event.target;
        setRecord({ ...record, [name]: value, date: currentDate });
    };

    const getRecord = async () => {
        try {
            const res = await fetch(`http://localhost:8004/api/record/${recordId}`);
            const data = await res.json();
            // Merge fetched data with the existing state
            setRecord((prevRecord) => ({ ...prevRecord, ...data }));
        } catch (error) {
            console.error('Error fetching record:', error);
        }
    };

    const getDoctor = async () => {
        if (record.doctorId) {
            try {
                const res = await fetch(`http://localhost:8002/api/doctor/${record.doctorId}`);
                const data = await res.json();
                setDoctor(data);
            } catch (error) {
                console.error('Error fetching doctor:', error);
            }
        }
    };

    useEffect(() => {
        getRecord();
    }, [recordId]);

    useEffect(() => {
        getDoctor();
    }, [record.doctorId]);

    const updateRecord = async () => {
        const fetchOptions = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(record),
        };
        try {
            const response = await fetch(`http://localhost:8004/api/record/${recordId}`, fetchOptions);
            if (response.ok) {
                alert('Success');
                window.location.href = '/patient';
            } else {
                alert('Fail');
            }
        } catch (error) {
            console.error('Error updating record:', error);
        }
    };
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState();
    useEffect(() => {
        getDoctors();
    }, []);

    const getDoctors = async () => {
        try {
            const res = await fetch('http://localhost:8002/api/doctor/');
            const data = await res.json();
            setDoctors(data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('main_form')}>
                {checkCreate ? (
                    <div className={cx('training_main')}>
                        <div className={cx('icon_route_container')}>
                            <div className={cx('icon-container')}>
                                <FontAwesomeIcon icon={faRotateRight} />
                            </div>
                            <p>Loading...</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className={cx('header')}>
                            <p>Thông tin bệnh án</p>
                        </div>
                        <div className={cx('container')}>
                            <div className={cx('container_main')}>
                                <div className={cx('container_item_flex')}>
                                    <div className={cx('container_item')}>
                                        <div className={cx('header_item')}>
                                            <p>Thông tin bệnh nhân</p>
                                        </div>
                                        <div className={cx('main_item')}>
                                            <p>Tên: {patient.name}</p>
                                        </div>
                                        <div className={cx('main_item')}>
                                            <p>Số điện thoại: {patient.phone}</p>
                                        </div>
                                        <div className={cx('main_item')}>
                                            <p>Email: {patient.email}</p>
                                        </div>
                                    </div>
                                    <div className={cx('container_item')}>
                                        <div className={cx('header_item')}>
                                            <p>Bác sĩ điều trị</p>
                                        </div>
                                        <div className={cx('main_item')}>
                                            <select value={record.doctorId} onChange={inputChange} name="doctorId">
                                                <option value="">Chọn bác sĩ</option>
                                                {doctors.map((doctor) => (
                                                    <option key={doctor.id} value={doctor.id}>
                                                        {doctor.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('container_item')}>
                                    <div className={cx('header_item')}>
                                        <div className={cx('header_item_infor')}>
                                            <p>Thông tin bệnh án</p>
                                        </div>
                                    </div>
                                    <div className={cx('main_item')}>
                                        <p>Chẩn đoán</p>
                                        <textarea
                                            rows="3"
                                            cols="50"
                                            type="text"
                                            placeholder="Chẩn đoán"
                                            name="diagnosis"
                                            onChange={inputChange}
                                            value={record.diagnosis}
                                        ></textarea>
                                    </div>
                                    <div className={cx('main_item')}>
                                        <p>Phương pháp trị liệu</p>
                                        <textarea
                                            rows="3"
                                            cols="50"
                                            type="text"
                                            placeholder="Phương pháp trị liệu"
                                            name="treatment"
                                            onChange={inputChange}
                                            value={record.treatment}
                                        ></textarea>
                                    </div>
                                    <div className={cx('main_item')}>
                                        <p>Đơn thuốc</p>
                                        <textarea
                                            rows="3"
                                            cols="30"
                                            type="text"
                                            placeholder="Đơn thuốc"
                                            name="prescription"
                                            onChange={inputChange}
                                            value={record.prescription}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className={cx('container_item')}></div>
                            </div>

                            <div className={cx('footer')}>
                                <div className={cx('button')}>
                                    <Button primary medium onClick={() => updateRecord()}>
                                        Cập nhật
                                    </Button>
                                    <Button normal medium href="/patient">
                                        Trở lại
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default FormOrder;
