import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

export default function OutletInfoScreen() {
    return (
        <div className='app'>
            <Sidebar id={5} />
            <div style={{ width: "100%", padding: "0", margin: "0" }}>
                <Header />
            </div>
        </div>
    )
}
