'use client';

import Image from 'next/image';
import Link from 'next/link';
import './dash.css'


import React, { useEffect, useState } from 'react';
import { parse } from 'path';
import PieChart from "../components/PieChart";

export default function Dashboard() {

        const [name, setName] = useState('');
        const [error, setError] = useState('');
        const [cumulativeEarnings, setCumulativeEarnings] = useState({} as any);
        const [cumulativeSpendings, setCumulativeSpendings] = useState({} as any);
        const [savings, setSavings] = useState(0);
        const [earningsPrior, setEarningsPrior] = useState(0);
        const [spendingPrior, setSpendingPrior] = useState(0);
        const [savingsPrior, setSavingsPrior] = useState(0);
    
        useEffect(() => {
            // Fetch the user's name when the component mounts
            const fetchUserName = async () => {
                try {
                    const userID = localStorage.getItem('userId')?.replace('"', '')?.replace('"', '');
                    if (!userID) {
                        setError('User ID not found in local storage');
                        return;
                    }

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
                        setCumulativeEarnings(data.data.cumulativeEarnings);
                        setCumulativeSpendings(data.data.cumulativeSpendings);
                        // variables for calcualting monthly spending 
                        const spend_cal_1 = data.data.cumulativeEarnings[2024][1];
                        const spend_cal_2 = data.data.cumulativeSpendings[2024][1];
                        setSavings(spend_cal_1 - spend_cal_2 );
                        // variables for calcualting monthly spending Prior
                        const spend_cal_3 = data.data.cumulativeEarnings[2024][0];
                        const spend_cal_4 = data.data.cumulativeSpendings[2024][0];
                        setSavingsPrior( parseFloat(((spend_cal_3 - spend_cal_4)/100 ).toFixed(2)));
                        // variables to get monthly difference
                        const earnPrior = ((data.data.cumulativeEarnings[2024][0] - data.data.cumulativeEarnings[2024][1]) /100).toFixed(2);
                        setEarningsPrior(parseFloat(earnPrior));
                        const spendPrior = ((data.data.cumulativeSpendings[2024][0]- data.data.cumulativeSpendings[2024][1]) /100).toFixed(2);
                        setSpendingPrior(parseFloat(spendPrior));
                        
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
        <div className='welcome_container'>
        <p className='welcome_banner'>Welcome, {name}!</p>
        

        <Link
          href="/AiChat"
          className="rounded-full mb-[30px] border border-solid border-[#eaab00] dark:border-white/[.145] transition-colors flex items-center justify-center justify-self-center hover:bg-[#eaab00] dark:hover:bg-[#1a1a1a]  hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 w-[400px]"
        >
          Speak with Finance Robro
        </Link>
        </div>

        <div className='financial_container'>
            <div className='financial_box'>

                <p className='titles_formatting'>monthly earnings</p>
                <p className='numbers_formatting'>{cumulativeEarnings["2024"] ? cumulativeEarnings["2024"][1] : 0} $</p>
                <p className='percentage_formatting'>{earningsPrior} % from last month</p>
            </div>
            <div className='financial_box'>

                <p className='titles_formatting'>monthly spendings</p>
                <p className='numbers_formatting_negative'>{cumulativeSpendings["2024"] ? cumulativeSpendings["2024"][1] : 0} $</p>
                <p className='percentage_formatting'>{spendingPrior} % from last month</p>
            </div>
            <div className='financial_box'>

                <p className='titles_formatting'>savings</p>
                <p className='numbers_formatting'>#### $</p>


            </div>
            <div className='financial_box'>

                <p className='titles_formatting'>monthly overview</p>
                <p className='numbers_formatting_display'>{savings} $</p>
                <p className='percentage_formatting'>{savingsPrior} % from last month</p>

            </div>
            <div className='financial_box_graph'>
                <Link href="/pie-chart" className="flex items-center justify-center w-full h-full cursor-pointer">
                    <div className="w-80 sm:w-96">
                        <PieChart/>
                    </div>
                </Link>
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
