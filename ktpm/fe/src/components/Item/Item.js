import { useEffect, useState } from 'react';
import styles from './Item.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Item({ id, type }) {
    const [object, setObject] = useState({
        name: '',
    });
    const [title, setTitle] = useState();
    useEffect(() => {
        if (type === 1) {
            fetch(`http://localhost:8003/api/patient/${id}`)
                .then((res) => res.json())
                .then((res) => {
                    setObject(res);
                    setTitle('Tên bệnh nhân: ');
                });
        } else if (type === 2) {
            fetch(`http://localhost:8002/api/doctor/${id}`)
                .then((res) => res.json())
                .then((res) => {
                    setObject(res);
                    setTitle('Bác sĩ điều trị: ');
                });
        } else {
            fetch(`http://localhost:8005/api/clinic/${id}`)
                .then((res) => res.json())
                .then((res) => {
                    setObject(res);
                    setTitle('Phòng khám số: ');
                });
        }
    }, []);
    return (
        <div className={cx('wrapper')}>
            <p>{title + object.name}</p>
        </div>
    );
}
export default Item;
