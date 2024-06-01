import Button from '~/components/Button/Button';
import styles from './Supplies.module.scss';
import classNames from 'classnames/bind';

import { faTrashCan, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Supplies() {
    const [checkAdd, setCheckAdd] = useState(false);
    const [checkAddMobile, setCheckAddMobile] = useState(false);
    const [checkAddmedicalsupplies, setCheckAddMedicalsupplies] = useState(false);

    const [medicine, setMedicine] = useState([]);
    const [medicalsupplies, setMedicalsupplies] = useState([]);
    const [checkEdit, setCheckEdit] = useState(false);
    const [checkEditMobile, setCheckEditMobile] = useState(false);
    const [checkEditmedicalsupplies, setCheckEditmedicalsupplies] = useState(false);
    const [checkItem, setCheckitem] = useState(false);

    const [mobile, setMobile] = useState({
        name: '',
        type: '',
        manufacturer: '',
        expiry_date: '',
        price: '',
        image: '',
        quantity: '',
    });
    const [supplies, setsupplies] = useState({
        name: '',
        type: '',
        image: '',
        expiry_date: '',
        quantity: '',
    });

    const [eMobile, seteMobile] = useState({
        name: '',
        type: '',
        manufacturer: '',
        expiry_date: '',
        price: '',
        image: '',
        quantity: '',
    });
    const [emedicalsupplies, setemedicalsupplies] = useState({
        name: '',
        type: '',
        image: '',
        expiry_date: '',
        quantity: '',
    });
    const [input, setInput] = useState('');

    const getAllMobile = () => {
        fetch('http://localhost:8007/api/medicine/')
            .then((res) => res.json())
            .then((res) => {
                setMedicine(res);
            });
    };
    const getAllmedicalsupplies = () => {
        fetch('http://localhost:8007/api/medicalsupplies/')
            .then((res) => res.json())
            .then((res) => {
                setMedicalsupplies(res);
            });
    };

    useEffect(() => {}, []);

    const deleteProduct = async (id) => {
        const fetchOptions = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
        };
        const response = await fetch(`http://localhost:8007/api/books/${id}`, fetchOptions);
        if (response.ok) {
            alert('Success');
        } else {
            alert('Fail');
        }
    };
    const deleteMobile = async (id) => {
        const fetchOptions = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
        };
        const response = await fetch(`http://localhost:8007/api/medicine/${id}`, fetchOptions);
        if (response.ok) {
            alert('Success');
            getAllMobile();
        } else {
            alert('Fail');
        }
    };
    const deletemedicalsupplies = async (id) => {
        const fetchOptions = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
        };
        const response = await fetch(`http://localhost:8007/api/medicalsupplies/${id}`, fetchOptions);
        if (response.ok) {
            alert('Success');
            getAllmedicalsupplies();
        } else {
            alert('Fail');
        }
    };

    const editMobile = async (id) => {
        const fetchOptions = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(eMobile),
        };
        const response = await fetch(`http://localhost:8007/api/medicine/${id}`, fetchOptions);
        if (response.ok) {
            alert('Success');
            getAllMobile();
            seteMobile('');

            setCheckEditMobile(false);
        } else {
            alert('Fail');
        }
    };

    const editmedicalsupplies = async (id) => {
        const fetchOptions = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(emedicalsupplies),
        };
        const response = await fetch(`http://localhost:8007/api/medicalsupplies/${id}`, fetchOptions);
        if (response.ok) {
            alert('Success');
            getAllmedicalsupplies();
            setemedicalsupplies('');

            setCheckEditmedicalsupplies(false);
        } else {
            alert('Fail');
        }
    };

    useEffect(() => {
        // Gọi API tìm kiếm khi input thay đổi, áp dụng debounce 500ms

        fetch(`http://127.0.0.1:8007/api/medicine/search/?keywords=${input}`)
            .then((res) => res.json())
            .then((res) => {
                setMedicine(res);
            })
            .catch((error) => {
                // Xử lý lỗi nếu cần
            });
    }, [input]);
    useEffect(() => {
        // Gọi API tìm kiếm khi input thay đổi, áp dụng debounce 500ms

        fetch(`http://127.0.0.1:8007/api/medicalsupplies/search/?keywords=${input}`)
            .then((res) => res.json())
            .then((res) => {
                setMedicalsupplies(res);
            })
            .catch((error) => {
                // Xử lý lỗi nếu cần
            });
    }, [input]);

    const turnAdd = () => {
        setCheckAdd(true);
        setCheckAddMedicalsupplies(false);
        setCheckAddMobile(false);
        setCheckEdit(false);
    };
    const offAdd = () => {
        setCheckAdd(false);
        localStorage.removeItem('userid');
    };
    const turnAddMobile = () => {
        setCheckAddMobile(true);
        setCheckAddMedicalsupplies(false);
        setCheckAdd(false);
        setCheckEdit(false);
    };
    const offAddMobile = () => {
        setCheckAddMobile(false);
        localStorage.removeItem('userid');
    };
    const turnAddmedicalsupplies = () => {
        setCheckAddMedicalsupplies(true);
        setCheckAddMobile(false);

        setCheckAdd(false);
        setCheckEdit(false);
    };
    const offAddmedicalsupplies = () => {
        setCheckAddMedicalsupplies(false);
        localStorage.removeItem('userid');
    };

    const turnEditMobile = (productid) => {
        setCheckEditMobile(true);
        setCheckEdit(false);
        setCheckAddMedicalsupplies(false);
        fetch(`http://localhost:8007/api/medicine/${productid}`)
            .then((res) => res.json())
            .then((res) => {
                seteMobile(res);
            });
    };

    const turnEditmedicalsupplies = (productid) => {
        setCheckEditmedicalsupplies(true);
        setCheckEdit(false);
        setCheckEditMobile(false);
        fetch(`http://localhost:8007/api/medicalsupplies/${productid}`)
            .then((res) => res.json())
            .then((res) => {
                setemedicalsupplies(res);
            });
    };
    const offEditMobile = () => {
        setCheckEditMobile(false);
        seteMobile({
            name: '',
            type: '',
            description: '',
            image: '',
        });
    };
    const offEditmedicalsupplies = () => {
        setCheckEditmedicalsupplies(false);
        setemedicalsupplies({
            name: '',
            style: '',
            description: '',
            image: '',
        });
    };

    const handleChangeMobile = (event) => {
        const { name, value } = event.target;
        setMobile({ ...mobile, [name]: value });
    };
    const handleChangeInput = (event) => {
        setInput(event.target.value);
    };
    const handleChangemedicalsupplies = (event) => {
        const { name, value } = event.target;
        setsupplies({ ...supplies, [name]: value });
    };

    const handleEditChangeMobile = (event) => {
        const { name, value } = event.target;
        seteMobile({ ...eMobile, [name]: value });
    };

    const handleEditChangemedicalsupplies = (event) => {
        const { name, value } = event.target;
        setemedicalsupplies({ ...emedicalsupplies, [name]: value });
    };

    useEffect(() => {
        if (medicine.length > 0 || medicalsupplies.length > 0) {
            setCheckitem(true);
        } else {
            setCheckitem(false);
        }
    }, [medicine]);
    const addMobile = async () => {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(mobile),
        };
        const response = await fetch('http://localhost:8007/api/medicine/', fetchOptions);
        if (response.ok) {
            alert('Thêm thuốc thành công');
            getAllMobile();
            setCheckAddMobile(false);
        } else {
            alert('Thuốc đã tồn tại');
        }
    };
    const addmedicalsupplies = async () => {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(supplies),
        };
        const response = await fetch('http://localhost:8007/api/medicalsupplies/', fetchOptions);
        if (response.ok) {
            alert('Thêm dụng cụ y tế thành công');
            getAllmedicalsupplies();
            setCheckAddMedicalsupplies(false);
        } else {
            alert('Dụng cụ y tế đã tồn tại');
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('main')}>
                <div className={cx('header')}>
                    <div className={cx('header_main')}>
                        <p>Quản lý vật tư</p>
                        <div className={cx('search_main')}>
                            <div className={cx('input_header')}>
                                <input type="text" placeholder="Search" onChange={handleChangeInput}></input>
                            </div>
                        </div>
                        <div className={cx('button_header_add')}>
                            <div className={cx('add')}>
                                <Button primary onClick={() => turnAddMobile()}>
                                    Thêm thuốc
                                </Button>
                            </div>
                            <div className={cx('add')}>
                                <Button primary large onClick={() => turnAddmedicalsupplies()}>
                                    Thêm dụng cụ
                                </Button>
                            </div>
                        </div>
                    </div>

                    {checkAddMobile ? (
                        <div className={cx('add_account')}>
                            <div className={cx('add_account_main')}>
                                <div className={cx('add_item')}>
                                    <p>Tên sản phẩm</p>
                                    <input
                                        type="text"
                                        placeholder="name"
                                        name="name"
                                        onChange={handleChangeMobile}
                                    ></input>
                                </div>
                                <div className={cx('add_item')}>
                                    <p>Type</p>
                                    <input
                                        type="text"
                                        placeholder="type"
                                        onChange={handleChangeMobile}
                                        name="type"
                                    ></input>
                                </div>
                                <div className={cx('add_item')}>
                                    <p>Công dụng</p>
                                    <input
                                        type="text"
                                        placeholder="Công dụng"
                                        onChange={handleChangeMobile}
                                        name="manufacturer"
                                    ></input>
                                </div>
                                <div className={cx('add_item')}>
                                    <p>Ngày sản xuất</p>
                                    <input
                                        type="text"
                                        placeholder="Ngày sản xuất"
                                        onChange={handleChangeMobile}
                                        name="expiry_date"
                                    ></input>
                                </div>
                                <div className={cx('add_item')}>
                                    <p>Giá thành</p>
                                    <input
                                        type="text"
                                        placeholder="Giá thành"
                                        onChange={handleChangeMobile}
                                        name="price"
                                    ></input>
                                </div>
                                <div className={cx('add_item')}>
                                    <p>Số lượng</p>
                                    <input
                                        type="text"
                                        placeholder="Số lượng"
                                        onChange={handleChangeMobile}
                                        name="quantity"
                                    ></input>
                                </div>
                                <div className={cx('add_item')}>
                                    <p>Link ảnh</p>
                                    <input
                                        type="text"
                                        placeholder="Link ảnh"
                                        onChange={handleChangeMobile}
                                        name="image"
                                    ></input>
                                </div>
                            </div>
                            <div className={cx('button')}>
                                <div className={cx('accept')}>
                                    <Button primary fullwidth onClick={() => addMobile()}>
                                        Thêm sản phẩm
                                    </Button>
                                </div>
                                <div className={cx('accept2')}>
                                    <Button normal large onClick={() => offAddMobile()}>
                                        Đóng
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div></div>
                    )}
                    {checkAddmedicalsupplies ? (
                        <div className={cx('add_account')}>
                            <div className={cx('add_account_main')}>
                                <div className={cx('add_item')}>
                                    <p>Tên dụng cụ</p>
                                    <input
                                        type="text"
                                        placeholder="name"
                                        name="name"
                                        onChange={handleChangemedicalsupplies}
                                    ></input>
                                </div>
                                <div className={cx('add_item')}>
                                    <p>Type</p>
                                    <input
                                        type="text"
                                        placeholder="type"
                                        onChange={handleChangemedicalsupplies}
                                        name="type"
                                    ></input>
                                </div>
                                <div className={cx('add_item')}>
                                    <p>Ngày nhập</p>
                                    <input
                                        type="text"
                                        placeholder="expiry_date"
                                        onChange={handleChangemedicalsupplies}
                                        name="expiry_date"
                                    ></input>
                                </div>
                                <div className={cx('add_item')}>
                                    <p>Số lượng</p>
                                    <input
                                        type="text"
                                        placeholder="quantity"
                                        onChange={handleChangemedicalsupplies}
                                        name="quantity"
                                    ></input>
                                </div>
                                <div className={cx('add_item')}>
                                    <p>Link ảnh</p>
                                    <input
                                        type="text"
                                        placeholder="image"
                                        onChange={handleChangemedicalsupplies}
                                        name="image"
                                    ></input>
                                </div>
                            </div>
                            <div className={cx('button')}>
                                <div className={cx('accept')}>
                                    <Button primary fullwidth onClick={() => addmedicalsupplies()}>
                                        Thêm sản phẩm
                                    </Button>
                                </div>
                                <div className={cx('accept2')}>
                                    <Button normal large onClick={() => offAddmedicalsupplies()}>
                                        Đóng
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div></div>
                    )}
                    {/* -------------------------------------Edit--------------------------------------------------------- */}

                    {checkEditMobile ? (
                        <div className={cx('add_account')}>
                            <div className={cx('add_account_main')}>
                                <div className={cx('add_item')}>
                                    <p>Tên sản phẩm</p>
                                    <input
                                        type="text"
                                        placeholder="name"
                                        name="name"
                                        defaultValue={eMobile.name}
                                        onChange={handleEditChangeMobile}
                                    ></input>
                                </div>
                                <div className={cx('add_item')}>
                                    <p>Type</p>
                                    <input
                                        type="text"
                                        placeholder="type"
                                        onChange={handleEditChangeMobile}
                                        name="type"
                                        defaultValue={eMobile.type}
                                    ></input>
                                </div>
                                <div className={cx('add_item')}>
                                    <p>Công dụng</p>
                                    <input
                                        type="text"
                                        placeholder="manufacturer"
                                        onChange={handleEditChangeMobile}
                                        name="manufacturer"
                                        defaultValue={eMobile.manufacturer}
                                    ></input>
                                </div>
                                <div className={cx('add_item')}>
                                    <p>Hình ảnh</p>
                                    <input
                                        type="text"
                                        placeholder="image"
                                        onChange={handleEditChangeMobile}
                                        name="image"
                                        defaultValue={eMobile.image}
                                    ></input>
                                </div>
                                <div className={cx('add_item')}>
                                    <p>Hạn sử dụng</p>
                                    <input
                                        type="text"
                                        placeholder="expiry_date"
                                        onChange={handleEditChangeMobile}
                                        name="expiry_date"
                                        defaultValue={eMobile.expiry_date}
                                    ></input>
                                </div>
                                <div className={cx('add_item')}>
                                    <p>Giá</p>
                                    <input
                                        type="text"
                                        placeholder="price"
                                        onChange={handleEditChangeMobile}
                                        name="price"
                                        defaultValue={eMobile.price}
                                    ></input>
                                </div>
                                <div className={cx('add_item')}>
                                    <p>Link ảnh</p>
                                    <input
                                        type="text"
                                        placeholder="quantity"
                                        onChange={handleEditChangeMobile}
                                        name="quantity"
                                        defaultValue={eMobile.image}
                                    ></input>
                                </div>
                            </div>
                            <div className={cx('button')}>
                                <div className={cx('accept')}>
                                    <Button primary fullwidth onClick={() => editMobile(eMobile.id)}>
                                        Xác nhận
                                    </Button>
                                </div>
                                <div className={cx('accept2')}>
                                    <Button normal large onClick={() => offEditMobile()}>
                                        Đóng
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div></div>
                    )}
                    {checkEditmedicalsupplies ? (
                        <div className={cx('add_account')}>
                            <div className={cx('add_account_main')}>
                                <div className={cx('add_item')}>
                                    <p>Tên sản phẩm</p>
                                    <input
                                        type="text"
                                        placeholder="name"
                                        name="name"
                                        defaultValue={emedicalsupplies.name}
                                        onChange={handleEditChangemedicalsupplies}
                                    ></input>
                                </div>
                                <div className={cx('add_item')}>
                                    <p>Type</p>
                                    <input
                                        type="text"
                                        placeholder="type"
                                        onChange={handleEditChangemedicalsupplies}
                                        name="type"
                                        defaultValue={emedicalsupplies.type}
                                    ></input>
                                </div>
                                <div className={cx('add_item')}>
                                    <p>Ngày nhập</p>
                                    <input
                                        type="text"
                                        placeholder="expiry_date"
                                        onChange={handleEditChangemedicalsupplies}
                                        name="expiry_date"
                                        defaultValue={emedicalsupplies.expiry_date}
                                    ></input>
                                </div>
                                <div className={cx('add_item')}>
                                    <p>Hình ảnh</p>
                                    <input
                                        type="text"
                                        placeholder="image"
                                        onChange={handleEditChangemedicalsupplies}
                                        name="image"
                                        defaultValue={emedicalsupplies.image}
                                    ></input>
                                </div>
                                <div className={cx('add_item')}>
                                    <p>Số lượng</p>
                                    <input
                                        type="text"
                                        placeholder="quantity"
                                        onChange={handleEditChangemedicalsupplies}
                                        name="quantity"
                                        defaultValue={emedicalsupplies.quantity}
                                    ></input>
                                </div>
                            </div>
                            <div className={cx('button')}>
                                <div className={cx('accept')}>
                                    <Button primary fullwidth onClick={() => editmedicalsupplies(emedicalsupplies.id)}>
                                        Xác nhận
                                    </Button>
                                </div>
                                <div className={cx('accept2')}>
                                    <Button normal large onClick={() => offEditmedicalsupplies()}>
                                        Đóng
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
                {/* -------------------------------------container-------------------------------------------- */}
                <div className={cx('container')}>
                    {checkItem ? (
                        <div className={cx('container_main')}>
                            <div className={cx('type_product')}>
                                <p>Thuốc</p>
                            </div>
                            <div>
                                {medicine.map((product) => {
                                    return (
                                        <div className={cx('product_item')} key={product.id}>
                                            <div className={cx('img')}>
                                                <img src={product.image} alt="anh"></img>
                                            </div>

                                            <div className={cx('name')}>
                                                <p className={cx('name_product')}>Tên: {product.name}</p>
                                                {/* <p> - {product.type}</p> */}
                                            </div>
                                            {/* <div className={cx('name')}>
                                                <p>NSX: {product.expiry_date}</p>
                                            </div> */}
                                            <div className={cx('price')}>
                                                <p>Số lượng: {product.quantity}</p>
                                            </div>

                                            <div className={cx('edit')} onClick={() => turnEditMobile(product.id)}>
                                                <div className={cx('edit_box')}>
                                                    <FontAwesomeIcon icon={faUserPen} />
                                                    <p>Edit</p>
                                                </div>
                                            </div>
                                            <div className={cx('edit')} onClick={() => deleteMobile(product.id)}>
                                                <div className={cx('edit_box')}>
                                                    <FontAwesomeIcon icon={faTrashCan} />
                                                    <p>Delete</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className={cx('type_product')}>
                                <p>Dụng cụ y tế</p>
                            </div>
                            <div>
                                {medicalsupplies.map((product) => {
                                    return (
                                        <div className={cx('product_item')} key={product.id}>
                                            <div className={cx('img')}>
                                                <img src={product.image} alt="anh"></img>
                                            </div>
                                            <div className={cx('name')}>
                                                <p className={cx('name_product')}>Tên: {product.name}</p>
                                            </div>
                                            <div className={cx('price')}>
                                                <p>Số lượng: {product.quantity}</p>
                                            </div>
                                            <div
                                                className={cx('edit')}
                                                onClick={() => turnEditmedicalsupplies(product.id)}
                                            >
                                                <div className={cx('edit_box')}>
                                                    <FontAwesomeIcon icon={faUserPen} />
                                                    <p>Edit</p>
                                                </div>
                                            </div>
                                            <div
                                                className={cx('edit')}
                                                onClick={() => deletemedicalsupplies(product.id)}
                                            >
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
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default Supplies;
