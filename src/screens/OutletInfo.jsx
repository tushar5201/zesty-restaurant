import React, { useReducer, useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
// import { toast } from 'react-toastify';

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

export default function OutletScreen() {
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
        const response = await axios.get('https://zesty-backend.onrender.com/restaurant/get-all-restaurants'); // URL to fetch all restaurants
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
      <Sidebar id={5} />
      <div style={{ width: '100%', overflow: 'hidden' }}>
        <Header />
        <div style={{ padding: '20px' }}>
          <h2 style={{ margin: '15px 0 5px 20px' }}>All Outlet Information</h2>

          {loading ? (
            <h3>Loading...</h3>
          ) : error ? (
            <h3>Error: {error}</h3>
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
                    <tr>
                      <td>Latitude</td>
                      <td>{data.latitude}</td>
                    </tr>
                    <tr>
                      <td>Longitude</td>
                      <td>{data.longitude}</td>
                    </tr>
                    <tr>
                      <td>Email Address</td>
                      <td>{data.email}</td>
                    </tr>
                    <tr>
                      <td>Mobile Number</td>
                      <td>{data.mobile}</td>
                    </tr>
                    <tr>
                      <td>PAN Number</td>
                      <td>{data.pan}</td>
                    </tr>
                    <tr>
                      <td>GST Number</td>
                      <td>{data.gstin}</td>
                    </tr>
                    <tr>
                      <td>
                        <h5 className="mt-2">Bank Details</h5>
                      </td>
                    </tr>
                    <tr>
                      <td>Account Number</td>
                      <td>{data.acno}</td>
                    </tr>
                    <tr>
                      <td>IFSC Code</td>
                      <td>{data.ifsc}</td>
                    </tr>
                    <tr>
                      <td>Food Type</td>
                      <td>{data.veg}</td>
                    </tr>
                    <tr>
                      <td>Payment Status</td>
                      <td>
                        {data.payment === 'Pending' ? (
                          <span className="text-warning bg-warning bg-opacity-25" style={{ padding: '5px', borderRadius: '5px' }}>
                            Pending
                          </span>
                        ) : data.payment === 'Failed' ? (
                          <span className="text-danger bg-danger bg-opacity-25" style={{ padding: '5px', borderRadius: '5px' }}>
                            Failed
                          </span>
                        ) : (
                          data.payment === 'Success' && (
                            <span className="text-success bg-success bg-opacity-25" style={{ padding: '5px', borderRadius: '5px' }}>
                              Success
                            </span>
                          )
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Verification Status</td>
                      <td>
                        {data.verified === 'Pending' ? (
                          <span className="text-warning bg-warning bg-opacity-25" style={{ padding: '5px', borderRadius: '5px' }}>
                            Pending
                          </span>
                        ) : data.verified === 'Rejected' ? (
                          <span className="text-danger bg-danger bg-opacity-25" style={{ padding: '5px', borderRadius: '5px' }}>
                            Rejected
                          </span>
                        ) : (
                          data.verified === 'Approved' && (
                            <span className="text-success bg-success bg-opacity-25" style={{ padding: '5px', borderRadius: '5px' }}>
                              Approved
                            </span>
                          )
                        )}
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
