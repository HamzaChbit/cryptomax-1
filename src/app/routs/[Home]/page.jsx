"use client"


import React from 'react'
import CoinSearch from '@/app/components/CoinSerach/page'
import Trending from '@/app/components/Trending/page'
import Footer from '@/app/components/Footer/page'


const Home = ({coins}) => {


  return (
    <div>
    < CoinSearch  coins={coins} />
  < Trending />
  
    </div>
 
  )
}

export default Home