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

        <Link
          href="/login"
          className="rounded-full mb-[30px] border border-solid border-[#eaab00] dark:border-white/[.145] transition-colors flex items-center justify-center justify-self-center hover:bg-[#eaab00] dark:hover:bg-[#1a1a1a]  hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 w-[400px]"
        >
          Speak with Finance Robro
        </Link>

    <div className='financial_container'>
        <div className='financial_box'>

        <p className='titles_formatting'>monthly earnings</p>
        <p className='numbers_formatting'>30 576 $</p>

        </div>
        <div className='financial_box'>

        <p className='titles_formatting'>monthly spendings</p>
        <p className='numbers_formatting_negative'>20 576 $</p> 

        </div>
        <div className='financial_box'>

        <p className='titles_formatting'>savings</p>
        <p className='numbers_formatting'>350 576 $</p>


        </div>
        <div className='financial_box'>

        <p className='titles_formatting'>overview</p>
        <p className='numbers_formatting'>350 276 $</p>

        </div>

        <div className='financial_box_graph'>

        <p className='titles_formatting'>graph view</p>
        <p className='numbers_formatting'>##################</p>

        </div>


    </div>
    <Link
          href="/login"
          className="rounded-full mb-[20px] border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center justify-self-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 max-w-[200px]"
        >
          Log Out
        </Link>
    </div>

  );
}
