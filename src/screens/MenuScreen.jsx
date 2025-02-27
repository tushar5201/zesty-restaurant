import React, { useEffect, useReducer, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { Col, Modal, Row } from 'react-bootstrap'
import { Link } from "react-router-dom"
import axios from 'axios'
import { toast } from 'react-toastify'

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true }
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, menu: action.payload }
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}

export default function MenuScreen() {

    const [showDetails, setShowDetails] = useState(false);
    const [details, setDetails] = useState(null);
    const [search, setSearch] = useState("");

    const [{ loading, error, menu }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
        menu: []
    });
    const restaurantId = localStorage.getItem("restaurantId");

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const menu = await axios.get(`https://zesty-backend.onrender.com/restaurant/get/${restaurantId}`);
                console.log(menu.data);

                dispatch({ type: 'FETCH_SUCCESS', payload: menu.data })
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: error.message })
            }
        }
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        const res = await fetch('https://zesty-backend.onrender.com/menu/delete-menu-item', {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ id })
        })

        if (res.status === 200) {
            toast.dark("Menu Item deleted successfully.");
            window.location.reload(true);
        } else if (res.status === 401) {
            toast.dark("Menu Item delete failed.");
        }
    }

    const handleShow = (details) => {
        setDetails(details);
        setShowDetails(true);
    }

    return (
        <div className='app'>
            <Sidebar id={3} />
            <div style={{ width: "100%", overflow: "hidden" }}>
                <Header />

                <div style={{ padding: "20px" }}>
                    <Row>
                        <Col md={8}>
                            <h2 style={{ margin: "15px 0 5px 20px" }}>Menu</h2>
                        </Col>
                        <Col md={2}>
                            <input type="text" value={search} placeholder='Search..' className='in form-control mt-4' onChange={(e) => setSearch(e.target.value)} />
                        </Col>
                        <Col>
                            <Link to={"/restaurant/add-menu-item"} className='btn btn-outline-dark mt-4'>Add Menu Item</Link>
                        </Col>
                    </Row>

                    <table className='table mt-3'>
                        <thead>
                            <tr>
                                <th>Item Id</th>
                                <th>Item Name</th>
                                <th>Item Details</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>

                        {loading ? <h3>Loading...</h3> : error ? { error } : (
                            <tbody>
                                {search === "" && menu.menu.map((menuItem, i) => (
                                    <tr key={i} style={{ verticalAlign: "middle" }}>
                                        <td>{menuItem._id}</td>
                                        <td><h5>{menuItem.name}</h5></td>
                                        <td><button onClick={() => handleShow(menuItem)} style={{ textDecoration: "underline", background: "none", padding: 0, width: "100px" }}>Details</button></td>
                                        <td><Link to={`/restaurant/update-menu-item/${menuItem._id}`} className='btn btn-primary'>Update</Link></td>
                                        <td><button className='btn btn-danger' onClick={() => handleDelete(menuItem._id)}>Delete</button></td>
                                    </tr>
                                ))}
                                {menu.menu
                                    .filter((item) => {
                                        const searchTerm = search.toLowerCase();
                                        const name = item.name.toLowerCase();
                                        return searchTerm && name.startsWith(searchTerm);
                                    })
                                    .map((menuItem, i) => (
                                        <tr key={i} style={{ verticalAlign: "middle" }}>
                                            <td>{menuItem._id}</td>
                                            <td><h5>{menuItem.name}</h5></td>
                                            <td><button onClick={() => handleShow(menuItem)} style={{ textDecoration: "underline", background: "none", padding: 0, width: "100px" }}>Details</button></td>
                                            <td><Link to={`/restaurant/update-menu-item/${menuItem._id}`} className='btn btn-primary'>Update</Link></td>
                                            <td><button className='btn btn-danger' onClick={() => handleDelete(menuItem._id)}>Delete</button></td>
                                        </tr>
                                    ))}
                            </tbody>
                        )}

                        {details != null &&
                            <Modal show={showDetails} onHide={() => setShowDetails(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>{menu.restaurantName}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    item Name : <h2 className='ms-3'>{details.name}</h2>
                                    item Image : <br />
                                    {/* <img className='ms-5' src={`https://zesty-backend.onrender.com/menu/get-menu-image/${details._id}`} alt={details.name} width={150} /><br /> */}
                                    <img src={details.image} className='mt-5' alt={details.name} width={150} srcset="" /><br />
                                    <table className='table'>
                                        <tbody>
                                            <tr>
                                                <td>Item Price</td>
                                                <td>{details.price}</td>
                                            </tr>
                                            <tr>
                                                <td>Item Description</td>
                                                <td>{details.description}</td>
                                            </tr>
                                            <tr>
                                                <td>Item Type</td>
                                                <td>{details.foodType}</td>
                                            </tr>
                                            <tr>
                                                <td>Item Category</td>
                                                <td>{details.category}</td>
                                            </tr>
                                            {details.addOnes[0].name === "" ? (<h5 className='mt-3'>No addones set</h5>) : (
                                                <table style={{ width: "100%" }} className='table'>
                                                    <tbody>
                                                        <h5 className='mt-2'>Add ones</h5>
                                                        {details.addOnes.map((addon) => (
                                                            <tr>
                                                                <td>{addon.name}</td>
                                                                <td>{addon.price} ₹</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            )
                                            }

                                            {details.variant.small.price === "" ? (<h5 className='mt-3'>No variants selected</h5>) :
                                                <div>
                                                    <h5 className='mt-2'>Variants</h5>
                                                    <table style={{ width: "100%" }} className='table'>
                                                        <thead>
                                                            <tr>
                                                                <th>Size</th>
                                                                <th>Price(₹)</th>
                                                                <th>Quantity</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Small</td>
                                                                <td>{details.variant.small.price}</td>
                                                                <td>{details.variant.small.quantity}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Medium</td>
                                                                <td>{details.variant.medium.price}</td>
                                                                <td>{details.variant.medium.quantity}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Large</td>
                                                                <td>{details.variant.large.price}</td>
                                                                <td>{details.variant.large.quantity}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>}
                                        </tbody>
                                    </table>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button className="btn btn-secondary" onClick={() => setShowDetails(false)}>
                                        Close
                                    </button>
                                </Modal.Footer>
                            </Modal>
                        }
                    </table>
                </div>
            </div>
        </div>
    )
}
