import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
// import { io } from "socket.io-client";
import "../assets/css/totalOrdersCard.css";

export default function TotalOrdersCard({ type, total, image }) {
    // const [mode, setMode] = useState();

    // const socket = io("http://localhost:5000/");

    // const updateStatus = (orderId, newStatus) => {
    //     const statusData = {orderId, newStatus};
    //     socket.emit("updateStatus", statusData);
    // }

    // useEffect(() => {
    //     updateStatus("1", mode);
    // })

    return (
        <Card style={{ height: "100px" }} className='card-home'>
            {/* <Form.Select aria-label="Default select example" onChange={(e) => setMode(e.target.value)}>
                <option>Open this select menu</option>
                <option value="logIn">Log in</option>
                <option value="logOut">Log Out</option>
            </Form.Select> */}
            <Row style={{marginTop: "7px"}}>
                <Col md={3}>
                    <Card style={{ width: "45px", height: "50px", backgroundColor: "#d7f5ee", justifyContent: "center", alignItems: "center", border: "none" }}>
                        <img src={image} style={{width: "30px"}} alt="" />
                    </Card>
                </Col>
                <Col style={{marginLeft: "10px"}}>
                    <h5 style={{margin: 1}}>{total}</h5>
                    {/* <hr /> */}
                    <p>Total {type}</p>
                </Col>
            </Row>
        </Card>
    )
}
