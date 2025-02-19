import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Accordion, Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AddMenuItem() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [foodType, setFoodType] = useState("Veg");
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [packagingCharge, setPackagingCharge] = useState("");
    const [small, setSmall] = useState({ price: "", quantity: "" });
    const [medium, setMedium] = useState({ price: "", quantity: "" });
    const [large, setLarge] = useState({ price: "", quantity: "" });
    const [variant, setVariant] = useState({ small: small, medium: medium, large: large });
    const [addOnes, setAddOnes] = useState([{ name: "", price: "" }]);
    const navigate = useNavigate();
    const restaurantId = localStorage.getItem("restaurantId");

    const submitHandler = async (e) => {

        const menuItemData = new FormData();
        menuItemData.append("name", name);
        menuItemData.append("description", description);
        menuItemData.append("image", image);
        menuItemData.append("foodType", foodType);
        menuItemData.append("category", category);
        menuItemData.append("price", price);
        menuItemData.append("packagingCharge", packagingCharge);
        menuItemData.append("variant", JSON.stringify(variant));
        menuItemData.append("addOnes", JSON.stringify(addOnes));
        menuItemData.append("restaurantId", restaurantId);

        try {
            // const res = await axios.post("https://zesty-backend.onrender.com/menu/add-item", menuItemData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true });
            const res = await axios.post("/menu/add-item", menuItemData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true });
            if (res.status === 200) {
                toast.dark("Menu Added");
                navigate("/admin/menu");
            } else if (res.status === 405) {
                toast.dark("menu saving failed");
            } else {
                toast.dark("internal server error");
            }
        } catch (error) {
            console.log(error);
            toast.dark("failed to add.")
        }
    }

    const handleFoodType = (option) => {
        setFoodType(option);
    };

    const fetchCategories = async () => {
        try {
            const category = await axios.get('https://zesty-backend.onrender.com/category/get-all-category');
            setCategories(category.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddonChange = (e, i) => {
        const { name, value } = e.target;
        const changeVal = [...addOnes];
        changeVal[i][name] = value;
        setAddOnes(changeVal);
    }

    useEffect(() => {
        fetchCategories();
        setVariant({ ...variant, small: small, medium: medium, large: large });
    }, [small, medium, large]);

    return (
        <div style={{ width: "100%", padding: "0", margin: "0" }}>
            <Header />

            <Container>
                <Card className='text-center mt-5 w-50 mx-auto p-5'>
                    <h3><u>Add Menu Item</u></h3>

                    <form>
                        <div className="form-floating mt-5 mb-2">
                            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} id="name" placeholder='Category name' className='in form-control' style={{ width: "100%" }} />
                            <label style={{ color: "#222" }}>Item Name</label>
                        </div>

                        <div className="form-floating mt-3 mb-2">
                            <input type="text" name="name" value={description} onChange={(e) => setDescription(e.target.value)} id="name" placeholder='Category name' className='in form-control' style={{ width: "100%" }} />
                            <label style={{ color: "#222" }}>Item Description</label>
                        </div>

                        <select name="" id="" className='in form-control' onChange={(e) => setCategory(e.target.value)}>
                            {categories.map((category) => (
                                <option value={category.name}>{category.name}</option>
                            ))}
                        </select>

                        <label htmlFor="" className='mt-4 float-start'>Food Type: </label>
                        <Row className='mt-4'>
                            <Col>
                                <a
                                    onClick={() => handleFoodType('Veg')}
                                    style={{
                                        border: foodType === 'Veg' ? '4px solid #000' : '1px solid #000',
                                        padding: '10px 20px',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        margin: '5px',
                                    }}
                                >
                                    <img src="/images/vegSymbol.png" width={"30px"} alt="siuh" />{' '}
                                    Veg
                                </a>

                            </Col>

                            <Col>
                                <a
                                    onClick={() => handleFoodType('Non-Veg')}
                                    style={{
                                        border: foodType === 'Non-Veg' ? '4px solid #000' : '1px solid #000',
                                        padding: '10px 20px',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        margin: '5px',
                                    }}
                                >
                                    <img src="/images/nonVegSymbol.png" width={"30px"} alt="siuh" /> {' '}
                                    Non-Veg
                                </a>
                            </Col>
                        </Row>

                        <div className="form-floating mt-5 mb-2">
                            <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])} id="image" placeholder='Menu Item Image' className='in form-control' style={{ width: "100%" }} />
                            <label style={{ color: "#222" }}>Menu Item Image</label>
                        </div>
                        {image && (
                            <div className="text-center">
                                <img src={URL.createObjectURL(image)} alt='category' height={'200px'} />
                            </div>
                        )}

                        <div className="form-floating mt-3 mb-2">
                            <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} id="name" placeholder='Item' className='in form-control' style={{ width: "100%" }} />
                            <label style={{ color: "#222" }}>Item Price</label>
                        </div>

                        <div className="form-floating mt-3 mb-2">
                            <input type="number" name="charges" value={packagingCharge} onChange={(e) => setPackagingCharge(e.target.value)} id="name" placeholder='Packaging Charges' className='in form-control' style={{ width: "100%" }} />
                            <label style={{ color: "#222" }}>Packaging Charges</label>
                        </div>

                        <Accordion>
                            <Accordion.Item eventKey='0'>
                                <Accordion.Header>Variants</Accordion.Header>
                                <Accordion.Body>
                                    <label htmlFor="">For Small Container</label>
                                    <Row>
                                        <Col>
                                            <div className="form-floating mt-3 mb-2">
                                                <input type="number" name="price" value={small.price} onChange={(e) => setSmall({ ...small, price: e.target.value })} id="name" placeholder='Category name' className='in form-control' style={{ width: "100%" }} />
                                                <label style={{ color: "#222" }}>Price</label>
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="form-floating mt-3 mb-2">
                                                <input type="text" name="quantity" value={small.quantity} onChange={(e) => setSmall({ ...small, quantity: e.target.value })} id="name" placeholder='Category name' className='in form-control' style={{ width: "100%" }} />
                                                <label style={{ color: "#222" }}>Quantity</label>
                                            </div>
                                        </Col>
                                    </Row>
                                    <label htmlFor="">For Medium Container</label>
                                    <Row>
                                        <Col>
                                            <div className="form-floating mt-3 mb-2">
                                                <input type="number" name="price" value={medium.price} onChange={(e) => setMedium({ ...medium, price: e.target.value })} id="name" placeholder='Category name' className='in form-control' style={{ width: "100%" }} />
                                                <label style={{ color: "#222" }}>Price</label>
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="form-floating mt-3 mb-2">
                                                <input type="text" name="quantity" value={medium.quantity} onChange={(e) => setMedium({ ...medium, quantity: e.target.value })} id="name" placeholder='Category name' className='in form-control' style={{ width: "100%" }} />
                                                <label style={{ color: "#222" }}>Quantity</label>
                                            </div>
                                        </Col>
                                    </Row>
                                    <label htmlFor="">For Large Container</label>
                                    <Row>
                                        <Col>
                                            <div className="form-floating mt-3 mb-2">
                                                <input type="number" name="price" value={large.price} onChange={(e) => setLarge({ ...large, price: e.target.value })} id="name" placeholder='Category name' className='in form-control' style={{ width: "100%" }} />
                                                <label style={{ color: "#222" }}>Price</label>
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="form-floating mt-3 mb-2">
                                                <input type="text" name="quantity" value={large.quantity} onChange={(e) => setLarge({ ...large, quantity: e.target.value })} id="name" placeholder='Category name' className='in form-control' style={{ width: "100%" }} />
                                                <label style={{ color: "#222" }}>Quantity</label>
                                            </div>
                                        </Col>
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>

                        <Accordion className='mt-3'>
                            <Accordion.Item eventKey='0'>
                                <Accordion.Header>Add ones</Accordion.Header>
                                <Accordion.Body>
                                    <Button className='btn btn-dark' onClick={() => setAddOnes([...addOnes, { name: "", price: "" }])}>Add</Button>

                                    {addOnes.map((addon, i) => (
                                        <Row>
                                            <Col lg={9}>
                                                <div className="form-floating mt-3 mb-2">
                                                    <input type="text" name="name" value={addon.name} onChange={(e) => handleAddonChange(e, i)} id="name" placeholder='Category name' className='in form-control' style={{ width: "100%" }} />
                                                    <label style={{ color: "#222" }}>Name</label>
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className="form-floating mt-3 mb-2">
                                                    <input type="number" name="price" value={addon.price} onChange={(e) => handleAddonChange(e, i)} id="name" placeholder='Category name' className='in form-control' style={{ width: "100%" }} />
                                                    <label style={{ color: "#222" }}>Price</label>
                                                </div>
                                            </Col>
                                        </Row>
                                    ))}

                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>

                        <Link className='btn btn-dark mt-5' onClick={submitHandler}>Add Menu Item</Link>
                    </form>
                </Card>
            </Container>
        </div>
    )
}
