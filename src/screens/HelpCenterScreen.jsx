import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { Card, Container } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function HelpCenterScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post("https://zesty-backend.onrender.com/ask-help", { email, name, query });
            if (res.status === 200) {
                toast.dark("Your query has been sent.");
                navigate("/dashboard");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='app'>
            <Sidebar id={7} />
            <div style={{ width: "100%", padding: "0", margin: "0" }}>
                <Header />

                <Container>
                    <h1 className='p-3'>Help Center</h1>
                    <Card className='text-center mt-3 w-50 mx-auto p-5'>
                        <div className="form-floating mt-3">
                            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} id="name" placeholder='Category name' className='in form-control' style={{ width: "100%" }} />
                            <label style={{ color: "#222" }}>Enter Name</label>
                        </div>

                        <div className="form-floating mb-2">
                            <input type="email" name="name" value={email} onChange={(e) => setEmail(e.target.value)} id="name" placeholder='Category name' className='in form-control' style={{ width: "100%" }} />
                            <label style={{ color: "#222" }}>Enter Email</label>
                        </div>

                        <textarea rows={5} name="name" value={query} onChange={(e) => setQuery(e.target.value)} id="name" placeholder='Enter your query' className='in form-control' style={{ width: "100%" }}></textarea>

                        {!loading ?
                            <button className='btn btn-dark mt-5' onClick={handleSubmit}>Submit</button>
                            : <h5>Sending...</h5>
                        }
                    </Card>
                </Container>
            </div>
        </div>
    )
}
