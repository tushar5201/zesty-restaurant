import React, { useEffect, useReducer, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Row, Col, Modal } from "react-bootstrap";
import axios from "axios";

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, orders: action.payload };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

const reducer1 = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loadingRes: true }
        case 'FETCH_SUCCESS':
            return { ...state, loadingRes: false, restaurantMenu: action.payload }
        case 'FETCH_FAIL':
            return { ...state, loadingRes: false, errorRes: action.payload }
        default:
            return state;
    }
}

export default function PastOrdersScreen() {
    const restaurantId = localStorage.getItem("restaurantId");
    const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
        orders: []
    });

    const [{ loadingRes, errorRes, restaurantMenu }, dispatchRes] = useReducer(reducer1, {
        loading: true,
        error: '',
        restaurantMenu: []
    });

    const [showDetails, setShowDetails] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const fetchOrders = async () => {
        dispatch({ type: 'FETCH_REQUEST' });
        try {
            const response = await axios.get(`/order/get-all-orders-for-restaurant/${restaurantId}`);
            dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
        } catch (error) {
            dispatch({ type: 'FETCH_FAIL', payload: error.response?.data?.message || error.message });
        }
    };

    const fetchRestaurantData = async () => {
        dispatchRes({ type: 'FETCH_REQUEST' });
        try {
            const restaurant = await axios.get(`https://zesty-backend.onrender.com/restaurant/get/${restaurantId}`);
            dispatchRes({ type: 'FETCH_SUCCESS', payload: restaurant.data.menu });
        } catch (error) {
            dispatchRes({ type: 'FETCH_FAIL', payload: error.message })
        }
    }

    useEffect(() => {
        fetchOrders();
        fetchRestaurantData();
    }, [restaurantId]);

    const handleShowDetails = (order) => {
        setSelectedOrder(order);
        setShowDetails(true);
    };

    return (
        <div className='app'>
            <Sidebar id={3} />
            <div style={{ width: "100%", overflow: "hidden" }}>
                <Header />
                <div style={{ padding: "20px" }}>
                    <h2>Past Orders</h2>
                    {loading ? <h3>Loading...</h3> : error ? <h3>{error}</h3> : (
                        <table className='table mt-5'>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Date</th>
                                    <th>Order Status</th>
                                    <th>Total Amount</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, i) => (
                                    <tr key={i}>
                                        <td>{order._id}</td>
                                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            {order.orderStatus === "Delivered" ?
                                                <span className='text-success bg-success bg-opacity-25' style={{ padding: "5px", borderRadius: "5px" }}>{order.orderStatus}
                                                </span>
                                                :
                                                <span className='text-danger bg-danger bg-opacity-25' style={{ padding: "5px", borderRadius: "5px" }}>Rejected</span>
                                            }
                                        </td>
                                        <td>₹ {order.totalAmountRestaurant}</td>
                                        <td>
                                            <button onClick={() => handleShowDetails(order)}>Details</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {selectedOrder && (
                <Modal show={showDetails} onHide={() => setShowDetails(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Order Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>Items:</h5>
                        <table className='table'>
                            <tbody>
                                {loadingRes ? <h6>Loading...</h6> : errorRes ? errorRes :
                                    <>
                                        {selectedOrder.order.map((item) => (
                                            <tr>
                                                <td>{item.quantity} x {
                                                    restaurantMenu.map((menuItem) =>
                                                        item.itemId === menuItem._id &&
                                                        <span>{menuItem.name}</span>
                                                    )}
                                                </td>
                                                <td className='text-end'>
                                                    {
                                                        restaurantMenu.map((menuItem) =>
                                                            item.itemId === menuItem._id &&
                                                            <span className='me-3'>{menuItem.price}</span>
                                                        )}
                                                </td>
                                            </tr>
                                        ))}

                                        {/* Total Amount */}
                                        <tr>
                                            <th>Total Amount</th>
                                            <th className="text-end">
                                                ₹ {selectedOrder.totalAmountRestaurant}
                                            </th>
                                        </tr>

                                        {/* Order Status */}
                                        <tr>
                                            <td>Order Status</td>
                                            <td className='d-flex justify-content-end'>
                                                {selectedOrder.orderStatus === "Delivered" ?
                                                    <span className='text-success bg-success bg-opacity-25' style={{ padding: "5px", borderRadius: "5px" }}>{selectedOrder.orderStatus}
                                                    </span>
                                                    :
                                                    <span className='text-danger bg-danger bg-opacity-25' style={{ padding: "5px", borderRadius: "5px" }}>Rejected</span>
                                                }
                                            </td>
                                            {/* <td>{data.verified === "Pending" ?
                                                <span className='text-warning bg-warning bg-opacity-25' style={{ padding: "5px", borderRadius: "5px" }}>Pending</span>
                                                : data.verified === "Rejected" ? <span className='text-danger bg-danger bg-opacity-25' style={{ padding: "5px", borderRadius: "5px" }}>Rejected</span>
                                                    : data.verified === "Approved" && <span className='text-success bg-success bg-opacity-25' style={{ padding: "5px", borderRadius: "5px" }}>Approved</span>
                                            }</td> */}
                                        </tr>
                                    </>
                                }
                            </tbody>
                        </table>
                    </Modal.Body>
                </Modal>
            )}
        </div>
    );
}
