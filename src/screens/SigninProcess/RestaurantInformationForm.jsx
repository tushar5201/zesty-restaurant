import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import { toast } from 'react-toastify';
import { SigninContext } from '../../context/signinContext';

export default function RestaurantInformationForm({ onNext }) {

    const handleContinue = () => {
        onNext();
    }

    const { formData, setFormData } = useContext(SigninContext);

    const [pincode, setPincode] = useState("");
    const [area, setArea] = useState([]);
    const [workingDays, setWorkingDays] = useState([]);
    const [logoImg, setLogoImg] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const handleCheckChange = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;

        if (checked) {
            setWorkingDays([...workingDays, value]);
        } else {
            setWorkingDays(workingDays.filter((e) => (e !== value)))
        }
        setFormData({ ...formData, "workingDays": workingDays })
    }

    const fetchAddress = async (e) => {
        setPincode(e.target.value.slice(0, 6));
        setFormData({ ...formData, "pincode": pincode });
        if (pincode.length === 6) {
            try {
                const res = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
                const data = res.data[0].PostOffice[0];
                setFormData({ ...formData, "city": data.District, "state": data.State });

                for (let index = 0; index < res.data[0].PostOffice.length; index++) {
                    const element = res.data[0].PostOffice[index].Name;
                    area.push(element);
                }
            } catch (error) {
                toast.error("Invalid Pincode");
            }
        }
    }

    const handleLogo = (e) => {
        setFormData({ ...formData, "logoImg": e.target.files[0] });
        setLogoImg(e.target.files[0]);
    }

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                setFormData({ ...formData, "latitude": latitude, "longitude": longitude });
            }, (err) => {
                console.log(err.message);
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (latitude === "" && longitude === "") {
            toast.dark("Please allow to access location");
            getLocation();
        } else {
            handleContinue();
        }
    }

    return (
        <div>
            <h4 style={{ width: "250px", color: "#000" }}><strong>Restaurant Information</strong></h4>
            <Form onSubmit={handleSubmit}>
                <Card className='form-card'>
                    <h5>Basic Details</h5>

                    <div className="form-floating">
                        <input type="text" name="ownername" value={formData["ownerName"]} onChange={(e) => setFormData({ ...formData, "ownerName": e.target.value })} placeholder="Owner's Full Name" className='in form-control' required />
                        <label style={{ color: "#222" }}>Owner's Full Name</label>
                    </div>

                    <div className="form-floating">
                        <input type="text" name="restaurantName" value={formData["restaurantName"]} onChange={(e) => setFormData({ ...formData, "restaurantName": e.target.value })} placeholder="Restaurant Name" className='in form-control' required />
                        <label style={{ color: "#222" }}>Restaurant Name</label>
                    </div>

                    <input type='file' name='logoImg' className='in form-control' placeholder='Name' onChange={handleLogo} /><br />
                    {logoImg && (
                        <div className="text-center">
                            <img src={URL.createObjectURL(logoImg)} alt='carousel' height={'200px'} />
                        </div>
                    )}

                    <h5 className='mt-3'>Address Details</h5>
                    <div className="form-floating">
                        <input type="number" name="pincode" value={pincode} onChange={fetchAddress} placeholder="Pin Code" className='in form-control' required />
                        <label style={{ color: "#222" }}>Pin Code</label>
                    </div>

                    <Row>
                        <Col>
                            <div className="form-floating">
                                <input type="text" name="shopnumber" value={formData["shopNumber"]} onChange={(e) => setFormData({ ...formData, "shopNumber": e.target.value })} placeholder="Shop/Plot Number" className='in form-control' required />
                                <label style={{ color: "#222" }}>Shop/Plot Number</label>
                            </div>
                        </Col>
                        <Col>
                            <div className="form-floating">
                                <input type="text" name="floor" value={formData["floor"]} onChange={(e) => setFormData({ ...formData, "floor": e.target.value })} placeholder="Floor" className='in form-control' />
                                <label style={{ color: "#222" }}>Floor</label>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="form-floating">
                                <input type="text" name="buildingName" value={formData["buildingName"]} onChange={(e) => setFormData({ ...formData, "buildingName": e.target.value })} placeholder="Building/Mall/Complex Name" className='in form-control' />
                                <label style={{ color: "#222" }}>Building/Mall/Complex Name</label>
                            </div>
                        </Col>
                        <Col>
                            <select className='form-select' onChange={(e) => setFormData({ ...formData, "selectedArea": e.target.value })} style={{ height: "55px", marginTop: "10px" }}>
                                {
                                    area.map((a) => (
                                        <option value={a}>{a}</option>
                                    ))
                                }
                            </select>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="form-floating">
                                <input type="text" name="city" value={formData["city"]} onChange={(e) => setFormData({ ...formData, "city": e.target.value })} placeholder="City" className='in form-control' disabled />
                                <label style={{ color: "#222" }}>City</label>
                            </div>
                        </Col>
                        <Col>
                            <div className="form-floating">
                                <input type="text" name="state" value={formData["state"]} onChange={(e) => setFormData({ ...formData, "state": e.target.value })} placeholder="State" className='in form-control' disabled />
                                <label style={{ color: "#222" }}>State</label>
                            </div>
                        </Col>
                    </Row>
                </Card>

                <Card className='form-card mt-4'>
                    <h5>Owner Contact Details</h5>

                    <div className="form-floating">
                        <input type="email" name="email" value={formData["email"]} onChange={(e) => setFormData({ ...formData, "email": e.target.value })} placeholder="Email Address" className='in form-control' required />
                        <label style={{ color: "#222" }}>Email Address</label>
                    </div>

                    <div className="form-floating">
                        <input type="number" name="phone" maxLength={10} value={formData["mobile"]} onChange={(e) => setFormData({ ...formData, "mobile": e.target.value })} placeholder="Mobile Number" className='in form-control' required />
                        <label style={{ color: "#222" }}>Mobile Number</label>
                    </div>
                </Card>

                <Card className='form-card mt-4'>
                    <h5>Working Days</h5>
                    <Row>
                        <Col>
                            <div className="form-check mt-2">
                                <input className="form-check-input" type="checkbox" onChange={handleCheckChange} value="Monday" id="flexCheckDefault" />
                                <label className="form-check-label ms-2" for="flexCheckDefault">
                                    Monday
                                </label>
                            </div>
                            <div className="form-check mt-2">
                                <input className="form-check-input" type="checkbox" onChange={handleCheckChange} value="Tuesday" id="flexCheckDefault" />
                                <label className="form-check-label ms-2" for="flexCheckDefault">
                                    Tuesday
                                </label>
                            </div>
                            <div className="form-check mt-2">
                                <input className="form-check-input" type="checkbox" onChange={handleCheckChange} value="Wednesday" id="flexCheckDefault" />
                                <label className="form-check-label ms-2" for="flexCheckDefault">
                                    Wednesday
                                </label>
                            </div>
                            <div className="form-check  mt-2">
                                <input className="form-check-input" type="checkbox" onChange={handleCheckChange} value="Thursday" id="flexCheckDefault" />
                                <label className="form-check-label ms-2" for="flexCheckDefault">
                                    Thursday
                                </label>
                            </div>
                        </Col>
                        <Col>
                            <div className="form-check mt-2">
                                <input className="form-check-input" type="checkbox" onChange={handleCheckChange} value="Friday" id="flexCheckDefault" />
                                <label className="form-check-label ms-2" for="flexCheckDefault">
                                    Friday
                                </label>
                            </div>
                            <div className="form-check mt-2">
                                <input className="form-check-input" type="checkbox" onChange={handleCheckChange} value="Saturday" id="flexCheckDefault" />
                                <label className="form-check-label ms-2" for="flexCheckDefault">
                                    Saturday
                                </label>
                            </div>
                            <div className="form-check mt-2">
                                <input className="form-check-input" type="checkbox" onChange={handleCheckChange} value="Sunday" id="flexCheckDefault" />
                                <label className="form-check-label ms-2" for="flexCheckDefault">
                                    Sunday
                                </label>
                            </div>
                        </Col>
                    </Row>
                </Card>


                <button type='submit' className='btn-continue'>Continue</button>
            </Form>
        </div >
    )
}
