'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import bitcoine from "../../../../public/Bitcoin.svg.png" 



const Trending = () => {
const [trending,setTrending] = useState([])
 const url = "https://api.coingecko.com/api/v3/search/trending";

useEffect(()=> {
axios.get(url).then((response)=>{
    setTrending(response.data.coins);
    console.log(response.data.coins)
})
},[])


const imageClass = {
    borderRadius : "100%",
    marginRight : "12px"
} 

  return (
    <div className='rounded-div my-12 py-8 text-primary' >

       <h1 className='text-2xl font-bold py-4' > Trending Coins </h1> 
       <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {trending.map((coin)=> (
            <div className='rounded-div flex justify-between p-4 hover:scale-105 ease-in  '   key={coin.item.id} >
                <div className='flex w-full items-center justify-between' > 
                    <div  className='flex'>
                        <Image  style={imageClass}  src={`${coin.item.small}`} alt={coin.item.id} width={25} height ={15}  />
                        <div>
                            <p className='font-bold'>{coin.item.name}</p>
                            <p>{coin.item.symbol}</p>
                        </div>
                    </div>
                    <div  className='flex items-center' >
                        <Image  src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"   width={25} height ={15} alt="/" className='w-4 mr-2'/>
                        <p>{coin.item.price_btc.toFixed(7)}</p>
                    </div>
                    
                </div>
            </div>
        ))}
       </div>
       
        </div>
  )
}

export default Trending