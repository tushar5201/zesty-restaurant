import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

export default function PastOrderScreen() {
    return (
        <div>
            <div className='app'>
                <Sidebar id={3} />
                <div style={{ width: "100%", padding: "0", margin: "0" }}>
                    <Header />

                    <div style={{ padding: "20px" }}>
                        past
                        {/* Write code here */}
                    </div>
                </div>
            </div>
        </div>
    )
}
