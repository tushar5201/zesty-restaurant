import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

export default function Dashboard() {
    return (
        <div className='app'>
            <Sidebar id={1} />
            <div style={{ width: "100%", overflow: "hidden" }}>
                <Header />

                <div style={{padding: "20px"}}>
                    <h1>Dashboard</h1>
                </div>
            </div>
        </div>
    )
}
