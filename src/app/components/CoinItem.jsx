'use client'
import React, { useState } from 'react'
import {AiFillStar, AiOutlineStar} from 'react-icons/ai'
import { Sparklines ,SparklinesLine} from 'react-sparklines';
import Link from 'next/link';
import { UserAuth } from '../context/AuthContext';
import { db } from '../Firebase';
import {arrayUnion,doc , updateDoc} from 'firebase/firestore'
import Image from 'next/image';


const CoinItem = ({coin}) => {

    const [savedCoin,setSavedCoin] = useState(false)
    const {user} = UserAuth()
  
    const coinPath = doc(db,'users',`${user?.email}`
    )
    const saveCoin = async ({}) => {
      if(user?.email){
        setSavedCoin(true)
        await updateDoc(coinPath,{
          watchList : arrayUnion({
            id : coin.id,
            name : coin.name,
            image : coin.image,
            rank : coin.image,
            symbol : coin.symbol
          })
        })
      }else{
        alert('Please sign into save a coin to your watch list')
      }
    }






  return (
    <tr className='h-[80px] border-b overflow-hidden'>
    <td  onClick={saveCoin} >
    {savedCoin ?   <AiFillStar    className='cursor-pointer' /> :   <AiOutlineStar  className='cursor-pointer'/>}
      </td>
    <td>{coin.rank}</td>
    <td>
    <Link  href={`/routs/CoinPage/${coin.id}` } >
      <div  className='flex items-center '    >
        <Image className='w-6 mr-2 rounded-full'    width={25} height={25}  src={coin.image}alt={coin.id} />
        <p className='hidden sm:table-cell' >{coin.name}</p>
      </div>
      </Link>
    </td>
    <td>{coin.symbol.toUpperCase()}</td>
    <td>${coin.current_price.toLocaleString()}</td>


    <td>
      {coin.price_change_percentage_24h > 0 ? (<p  className='text-green-600'>
            
      {coin.price_change_percentage_24h.toFixed(2)}%
      </p>): (<p className='text-red-600' > {coin.price_change_percentage_24h.toFixed(2)}%</p>)}
      
       </td>
      <td  className='w-[180px] hidden md:table-cell' >${coin.total_volume.toLocaleString()}</td>
    
    <td  className='w-[180px] hidden sm:table-cell'>${coin.market_cap.toLocaleString()}</td>
     <td>
        <Sparklines data={coin.sparkline_in_7d.price}>
           <SparklinesLine color="teal" />
        </Sparklines>
  </td>
  </tr>
  )
}

export default CoinItem