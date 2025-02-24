import React, { useState } from 'react'
import Header from '../components/Header'
import { Card, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function CreateAds() {
    const restaurantId = localStorage.getItem("restaurantId");
    const [image, setImage] = useState("");
    const [restaurantName, setRestroName] = useState("");
    const [mobile, setMobile] = useState("");

    const getData = async () => {
        const res = await axios.get(`https://zesty-backend.onrender.com/restaurant/get/${restaurantId}`);
        setRestroName(res.data.restaurantName);
        setMobile(res.data.mobile);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        getData();
        const data = {
            name: restaurantName,
            mobileNumber: mobile,
            amount: 19900
        }

        try {
            const res = await axios.post("https://zesty-backend.onrender.com/payment/create-order", data);
            console.log(res.data);

            const adData = new FormData();
            adData.append("image", image);
            adData.append("restaurantId", restaurantId);
            const res1 = await axios.post("https://zesty-backend.onrender.com/ad/create-ad", adData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (res1.status === 200) {
                console.log(res1.data);
            } else {
                toast.error("err in inserting.");
            }
            window.location.href = res.data.url;
        } catch (error) {

        }
    }
    return (
        <div>
            <Header />
            <Container>
                <Card className='text-center mt-5 w-50 mx-auto p-5'>
                    <h3><u>Create Advertisement</u></h3>

                    <form action="">
                        <div className="form-floating mt-5 mb-2">
                            <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])} id="image" placeholder='Add your advertisement image' className='in form-control' style={{ width: "100%" }} />
                            <label style={{ color: "#222" }}>Add your advertisement image</label>
                        </div>
                        <p className='text-muted text-start'>*Image should be rectangle</p>
                        <p className='text-muted text-start'>*Image should 1200x600 px or 1920x960 px (with high resolution)</p>
                        {image && (
                            <div className="text-center">
                                <img src={URL.createObjectURL(image)} alt='category' height={'200px'} />
                            </div>
                        )}
                        <Link className='btn btn-dark mt-5' onClick={submitHandler}>Pay Now</Link>
                    </form>
                </Card>
            </Container>
        </div>
    )
}
