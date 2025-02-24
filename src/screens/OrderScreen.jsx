import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

export default function OrderScreen() {
    return (
        <div className='app'>
            <Sidebar id={2} />
            <div style={{ width: "100%", padding: "0", margin: "0" }}>
                <Header />
            </div>
        </div>
    )
}
