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
      return { ...state, loading: false, outlets: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function OutletScreen({ userId }) {
  const [{ loading, error, outlets }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    outlets: [],
  });

  const [showDetails, setShowDetails] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const response = await axios.get('https://zesty-backend.onrender.com/restaurant/get-all-restaurants');
        const filteredOutlets = response.data.filter(outlet => outlet.ownerId === userId);
        dispatch({ type: 'FETCH_SUCCESS', payload: filteredOutlets });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };
    if (userId) fetchData();
  }, [userId]);

  const handleShow = (details) => {
    setData(details);
    setShowDetails(true);
  };

  return (
    <div className="app">
      <Sidebar id={5} />
      <div style={{ width: '100%', overflow: 'hidden' }}>
        <Header />
        <div style={{ padding: '20px' }}>
          <h2 style={{ margin: '15px 0 5px 20px' }}>Your Outlet Information</h2>

          {loading ? (
            <h3>Loading...</h3>
          ) : error ? (
            <h3>Error: {error}</h3>
          ) : outlets.length === 0 ? (
            <h3>No outlets found.</h3>
          ) : (
            <table className="table mt-5">
              <thead>
                <tr>
                  <th>Outlet ID</th>
                  <th>Outlet Name</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {outlets.map((outlet, i) => (
                  <tr key={i}>
                    <td>{outlet._id}</td>
                    <td>
                      <h4>{outlet.restaurantName}</h4>
                    </td>
                    <td>
                      <button
                        onClick={() => handleShow(outlet)}
                        style={{
                          textDecoration: 'underline',
                          background: 'none',
                          padding: 0,
                          width: '100px',
                        }}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {data != null && (
            <Modal show={showDetails} onHide={() => setShowDetails(false)}>
              <Modal.Header closeButton>
                <Modal.Title>{data.restaurantName}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h5>Restaurant Logo:</h5>
                <img
                  className="ms-5"
                  src={`https://zesty-backend.onrender.com/restaurant/get-restaurant-logo/${data._id}`}
                  alt={data.restaurantName}
                  width={250}
                />
                <br />
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Owner Name</td>
                      <td>{data.ownerName}</td>
                    </tr>
                    <tr>
                      <td>Address</td>
                      <td>
                        {data.shopNumber}, {data.floor}, {data.buildingName}, {data.selectedArea}, {data.city}, {data.state}, {data.pincode}.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Modal.Body>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}
