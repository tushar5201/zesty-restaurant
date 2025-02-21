import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function PaymentSuccess() {
    const [restaurant, setRestaurant] = useState(null);
    const restaurantId = localStorage.getItem("restaurantId");
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const res = await axios.get(`https://zesty-backend.onrender.com/restaurant/get-menu-images/${restaurantId}`);
            console.log(res.data);

            setRestaurant(res.data);
        } catch (error) {
            console.error("Error fetching restaurant data:", error);
        }
    }

    const updatePaymentStatus = async () => {
        try {
            const res = await axios.put(`https://zesty-backend.onrender.com/restaurant/update-payment-status/${restaurantId}`);
            if (res.status === 200) {
                console.log("status updated");
            } else if (res.status === 401) {
                console.log("error in updating");
            } else if (res.status === 405) {
                console.log("internal server error");
            } else {
                console.log("unknown error");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const checkVerified = async () => {
        const res = await axios.get(`https://zesty-backend.onrender.com/restaurant/get/${restaurantId}`);   
        if(res.data.verified === "Approved") {
            navigate("/dashboard");
        } else if(res.data.verified === "Rejected") {
            window.alert("Your application has been rejected please try again");
            localStorage.removeItem("restaurantId");
            navigate("/signinProcess");
        }
    }

    useEffect(() => {
        updatePaymentStatus();
        checkVerified();
        fetchData();
    }, [restaurantId]);

    return (
        <div>
            {/* <h2 style={{ color: "black" }}>Restaurant Menu</h2> */}
            {restaurant ? (
                <div className='text-center'>
                    {/* <h3 style={{color: "black"}}>{restaurant.restaurantName}</h3> */}
                    {/* <p>{restaurant.description}</p> */}

                    {/* <h4>Menu Images</h4> */}
                    {/* <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}> */}
                        {/* {restaurant.images.map((img, index) => (
                            <img
                                key={index}
                                src={img.data} // Adjust this URL as per your backend storage
                                alt="menu"
                                width="150"
                                height="200"
                                style={{ borderRadius: "10px", boxShadow: "2px 2px 10px rgba(0,0,0,0.2)" }}
                            />
                        ))}

                        <img src={`https://zesty-backend.onrender.com/restaurant/get-restaurant-logo/${restaurantId}`} alt="" width="150" height="200" /> */}
                        <img src="/images/zesty-without-bg-black.png" alt="" height={"500px"} width={"500px"} />
                        <h4>Your application is submitted to admin for verification</h4>
                    {/* </div> */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export function PaymentFailed() {
    return (
        <div>
            <h1>OOps !!</h1>
            <h3>Payment Failed Please try after some time</h3>
        </div>
    )
}