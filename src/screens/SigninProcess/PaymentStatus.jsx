import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { SigninContext } from '../../context/signinContext';

export default function PaymentSuccess() {

    // const { formData, setFormData } = useContext(SigninContext);
    // console.log(formData);

    // const [data1, setData] = useState(JSON.parse(localStorage.getItem("restaurantData")));
    // console.log(data1);
    // const obj = Object.assign(data1, { payment: "Done", verified: "false" });
    // localStorage.clear();
    // localStorage.setItem("restaurantData", JSON.stringify(obj));

    const [restaurant, setRestaurant] = useState(null);

    useEffect(() => {
        const handleSubmit = async () => {

        }

        const fetchData = async () => {
            try {
                const res = await axios.get(`/restaurant/get/${localStorage.getItem("restaurantId")}`);
                setRestaurant(res.data);
            } catch (error) {
                console.error("Error fetching restaurant data:", error);
            }
        }
        fetchData();
        // handleSubmit();
    }, []);

    return (
        <div>
            <h2>Restaurant Menu</h2>
            {restaurant ? (
                <div>
                    <h3>{restaurant.restaurantName}</h3>
                    <p>{restaurant.description}</p>

                    <h4>Menu Images</h4>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        {restaurant.menuImg.map((img, index) => (
                            <img
                                key={index}
                                src={`${img}`} // Adjust this URL as per your backend storage
                                alt="menu"
                                width="150"
                                height="200"
                                style={{ borderRadius: "10px", boxShadow: "2px 2px 10px rgba(0,0,0,0.2)" }}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export function PaymentFailed() {
    const data = JSON.parse(localStorage.getItem("restaurantData"));
    const obj = Object.assign(data, { payment: "Pending" });
    localStorage.clear();
    localStorage.setItem("restaurantData", JSON.stringify(obj));

    return (
        <div>
            <h1>OOps !!</h1>
            <h3>Payment Failed Please try after some time</h3>
        </div>
    )
}