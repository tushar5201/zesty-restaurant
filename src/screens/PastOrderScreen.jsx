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

export default function PastOrdersScreen() {
    const restaurantId = localStorage.getItem("restaurantId");
    const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
        orders: []
    });

    const [showDetails, setShowDetails] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const response = await axios.get(`https://zesty-backend.onrender.com/order/get-all-orders-for-restaurant/${restaurantId}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: error.response?.data?.message || error.message });
            }
        };
        fetchOrders();
    }, [restaurantId]);

    const handleShowDetails = (order) => {
        setSelectedOrder(order);
        setShowDetails(true);
    };

    return (
        <div className='app'>
            <Sidebar id={5} />
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
                                    <th>Total Amount Paid</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, i) => (
                                    <tr key={i}>
                                        <td>{order._id}</td>
                                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td>${order.totalAmountRestaurant}</td>
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
                <Modal show={showDetails} onHide={() => setShowDetails(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Order Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><strong>Customer Name:</strong> {selectedOrder.customerName}</p>
                        <p><strong>Address:</strong> {selectedOrder.deliveryAddress}</p>
                        <h5>Items:</h5>
                        <ul>
                            {selectedOrder.items.map((item, index) => (
                                <li key={index}>
                                    {item.name} - {item.quantity} x ${item.price}
                                </li>
                            ))}
                        </ul>
                        <h5>Restaurant Details:</h5>
                        <p><strong>Restaurant Name:</strong> {selectedOrder.restaurantName || 'N/A'}</p>
                        <p><strong>Restaurant Earnings:</strong> ${selectedOrder.totalAmountRestaurant}</p>
                        <p><strong>Order Status:</strong> {selectedOrder.status || 'N/A'}</p>
                        <p><strong>Payment Status:</strong> {selectedOrder.paymentStatus || 'N/A'}</p>
                    </Modal.Body>
                </Modal>
            )}
        </div>
    );
}
