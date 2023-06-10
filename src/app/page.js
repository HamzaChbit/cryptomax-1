'use client'
import Navbar from "./components/Navbar/page";
import Home from './routs/[Home]/page';
import { ThemeProvider } from "./context/ThemeContext/page";
import React ,{useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContextProvider } from "./context/AuthContext/page";

export default function App() {

const [coins,setCoins] = useState([])
const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&locale=enhttps://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&locale=en'

useEffect(()=> {
  axios.get(url).then((response) =>  {
    setCoins(response.data)
   
   
  })
},[url])




  return (
<ThemeProvider>
<AuthContextProvider>

<Home coins={coins}/>


</AuthContextProvider>
</ThemeProvider>


  )
}
