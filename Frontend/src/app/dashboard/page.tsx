'use client';

import Image from 'next/image';
import Link from 'next/link';
import './dash.css'


import React, { useEffect, useState } from 'react';



export default function Dashboard() {

        const [name, setName] = useState('');
        const [error, setError] = useState('');
    
        useEffect(() => {
            // Fetch the user's name when the component mounts
            const fetchUserName = async () => {
                try {
                    const userID = localStorage.getItem('userId')?.replace('"', '')?.replace('"', '');
                    const response = await fetch(`http://localhost:3000/api/user/${userID}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the auth token if required
                        },
                    });
    
                    if (response.ok) {
                        const data = await response.json();
                        setName(data.name); // Set the name in state
                    } else {
                        const errorData = await response.json();
                        setError(errorData.message || 'Failed to fetch user data');
                    }
                } catch (error) {
                    setError('Network error. Please try again.');
                }
            };
    
            fetchUserName();
        }, []); // Empty dependency array ensures this runs only once when the component mounts
    
    
  return (
    <div>
        <div>
        <p className='welcome_banner'>Welcome, {name}!</p>
        </div>
    <div className='financial_container'>
        <div className='financial_box'>

        <p>monthly earnings</p>

        </div>
        <div className='financial_box'>

        <p>monthly spendings</p>

        </div>
        <div className='financial_box'>

        <p>savings</p>


        </div>
        <div className='financial_box'>

        <p>overview</p>

        </div>


    </div>
    </div>

  );
}
