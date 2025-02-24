import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Pricing from '../components/Pricing'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AdsScreen() {
    const restaurantId = localStorage.getItem("restaurantId");
    const [ad, setAd] = useState(null);
    const checkExist = async () => {
        const res = await axios.get(`https://zesty-backend.onrender.com/ad/get-ad-image/${restaurantId}`);
        setAd(res.data);
    }

    useEffect(() => {
        checkExist();
    }, []);
    return (
        <div className='app'>
            <Sidebar id={4} />
            <div style={{ width: "100%", padding: "0", margin: "0" }}>
                <Header />

                <div style={{ padding: "20px" }}>
                    <h1>Ads</h1>
                    {ad === null ? (
                        <Pricing />
                    ) : (
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Advertisement Banner</th>
                                    <th>Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><img src={`https://zesty-backend.onrender.com/ad/get-ad-image/${restaurantId}`} alt="" width={"600px"} /></td>
                                    <td><Link className="btn btn-primary">Edit</Link></td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    )
}
