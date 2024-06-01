import Button from '~/components/Button/Button';
import styles from './FormOrder.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';

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

function FormAppointment({ patient }) {
    const [checkCreate, setCheckCreate] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');
    const [notes, setNotes] = useState('');

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const defaultTime = moment().hour(9).minute(0);

    const handleTimeChange = (time) => {
        setSelectedTime(time && time.format('HH:mm'));
    };

    const inputChange = (event) => {
        setNotes(event.target.value);
    };

    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');

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

    const handleDoctorChange = (event) => {
        setSelectedDoctor(event.target.value);
    };

    const [clinics, setClinics] = useState([]);
    const [selectedClinic, setSelectedClinic] = useState('');

    useEffect(() => {
        getClinics();
    }, []);

    const getClinics = async () => {
        try {
            const res = await fetch('http://localhost:8005/api/clinic/');
            const data = await res.json();
            setClinics(data);
        } catch (error) {
            console.error('Error fetching clinics:', error);
        }
    };

    const handleClinicChange = (event) => {
        setSelectedClinic(event.target.value);
    };

    const createAppointment = async () => {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                patientId: patient.id,
                doctorId: parseInt(selectedDoctor, 10),
                clinicId: parseInt(selectedClinic, 10),
                day: formatDate(selectedDate),
                time: selectedTime,
                status: 'Chưa thực hiện',
                notes: notes,
            }),
        };
        try {
            const response = await fetch('http://localhost:8006/api/appointment/', fetchOptions);
            if (response.ok) {
                alert('Success');
                window.location.href = '/patient';
            } else {
                alert('Lịch khám đã bị trùng');
            }
        } catch (error) {
            console.error('Error updating record:', error);
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
                            <p>Đặt lịch khám</p>
                        </div>
                        <div className={cx('container')}>
                            <div className={cx('container_main')}>
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
                                <div className={cx('flex_time')}>
                                    <div className={cx('container_item')}>
                                        <div className={cx('header_item')}>
                                            <p>Chọn bác sĩ</p>
                                        </div>
                                        <div className={cx('main_item')}>
                                            <select value={selectedDoctor} onChange={handleDoctorChange}>
                                                <option value="">Chọn bác sĩ</option>
                                                {doctors.map((doctor) => (
                                                    <option key={doctor.id} value={doctor.id}>
                                                        {doctor.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className={cx('container_item')}>
                                        <div className={cx('header_item')}>
                                            <p>Chọn phòng</p>
                                        </div>
                                        <div className={cx('main_item')}>
                                            <select value={selectedClinic} onChange={handleClinicChange}>
                                                <option value="">Chọn phòng khám</option>
                                                {clinics.map((clinic) => (
                                                    <option key={clinic.id} value={clinic.id}>
                                                        {clinic.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('flex_time')}>
                                    <div className={cx('container_item')}>
                                        <div className={cx('header_item')}>
                                            <p>Chọn ngày đặt lịch hẹn</p>
                                        </div>
                                        <div className={cx('main_item')}>
                                            <ReactDatePicker
                                                selected={selectedDate}
                                                onChange={handleDateChange}
                                                dateFormat="dd/MM/yyyy"
                                            />
                                        </div>
                                    </div>

                                    <div className={cx('container_item')}>
                                        <div className={cx('header_item')}>
                                            <p>Chọn giờ đặt lịch hẹn</p>
                                        </div>
                                        <div className={cx('main_item')}>
                                            <TimePicker
                                                showSecond={false}
                                                defaultValue={defaultTime}
                                                selected={selectedTime}
                                                onChange={handleTimeChange}
                                                format="HH:mm"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('container_item')}>
                                    <div className={cx('main_item')}>
                                        <p>Ghi chú</p>
                                        <textarea
                                            rows="3"
                                            cols="50"
                                            type="text"
                                            placeholder="Ghi chú"
                                            name="notes"
                                            onChange={inputChange}
                                            value={notes} // Ensure textarea is controlled
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('footer')}>
                                <div className={cx('button')}>
                                    <Button
                                        primary
                                        medium
                                        onClick={() => {
                                            createAppointment();
                                        }}
                                    >
                                        Đặt lịch
                                    </Button>
                                    <div className={cx('margin')}></div>
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

export default FormAppointment;
