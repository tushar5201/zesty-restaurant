import React, { useReducer, useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, outlet: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function OutletScreen() {
  const [{ loading, error, outlet }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    outlet: [],
  });

  const [showDetails, setShowDetails] = useState(true);
  const [data, setData] = useState(null);
  const restaurantId = localStorage.getItem("restaurantId");

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const response = await axios.get(`https://zesty-backend.onrender.com/restaurant/get/${restaurantId}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };
    fetchData();
  }, []);

  const handleShow = (details) => {
    setData(details);
    setShowDetails(true);
  };

  return (
    <div className="app">
      <Sidebar id={6} />
      <div style={{ width: '100%', overflow: 'hidden' }}>
        <Header />
        <div style={{ padding: '20px' }}>
          <h2 style={{ margin: '15px 0 5px 20px' }}>Your Outlet Information</h2>

          {loading ? <h3>Loading</h3> : error ? error :
            <table className='table mt-5 m-2'>
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody className='p-5'>
                <tr>
                  <td>Restaurant Image</td>
                  <td><img src={outlet.logoImg} width={500} alt="" srcset="" /></td>
                </tr>
                <tr>
                  <td>Restaurant Name</td>
                  <td><h5>{outlet.restaurantName}</h5></td>
                </tr>
                <tr>
                  <td>Owner Name</td>
                  <td>{outlet.ownerName}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>{outlet.shopNumber}, {outlet.floor}, {outlet.buildingName}, {outlet.selectedArea}, {outlet.pincode}, {outlet.city}, {outlet.state}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{outlet.email}</td>
                </tr>
                <tr>
                  <td>Phone Number</td>
                  <td>{outlet.mobile}</td>
                </tr>
                <tr>
                  <td>PAN Number</td>
                  <td>{outlet.pan}</td>
                </tr>
                <tr>
                  <td>GST Number</td>
                  <td>{outlet.gstin}</td>
                </tr>
                <tr>
                  <td>Food Type</td>
                  <td>{outlet.veg}</td>
                </tr>
                <tr>
                  <th>Banking Info</th>
                </tr>
                <tr>
                  <td>IFSC Code</td>
                  <td>{outlet.ifsc}</td>
                </tr>
                <tr>
                  <td>Account Number</td>
                  <td>{outlet.acno}</td>
                </tr>
                <tr>
                  <td>Payment Status</td>
                  <td>{outlet.payment === "Pending" ?
                    <span className='text-warning bg-warning bg-opacity-25' style={{ padding: "5px", borderRadius: "5px" }}>Pending</span>
                    : outlet.payment === "Failed" ? <span className='text-danger bg-danger bg-opacity-25' style={{ padding: "5px", borderRadius: "5px" }}>Failed</span>
                      : outlet.payment === "Success" && <span className='text-success bg-success bg-opacity-25' style={{ padding: "5px", borderRadius: "5px" }}>Success</span>
                  }</td>
                </tr>
                <tr>
                  <td>Verification Status</td>
                  <td>{outlet.verified === "Pending" ?
                    <span className='text-warning bg-warning bg-opacity-25' style={{ padding: "5px", borderRadius: "5px" }}>Pending</span>
                    : outlet.verified === "Rejected" ? <span className='text-danger bg-danger bg-opacity-25' style={{ padding: "5px", borderRadius: "5px" }}>Rejected</span>
                      : outlet.verified === "Approved" && <span className='text-success bg-success bg-opacity-25' style={{ padding: "5px", borderRadius: "5px" }}>Approved</span>
                  }</td>
                </tr>
              </tbody>
            </table>
          }
        </div>
      </div>
    </div>
  );
}
