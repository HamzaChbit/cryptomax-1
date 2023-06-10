
'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { AiOutlineClose } from 'react-icons/ai'
import {doc,onSnapshot,updateDoc} from 'firebase/firestore'
import { db } from '@/app/Firebase/page'
import { UserAuth } from '@/app/context/AuthContext/page'
import Image from 'next/image'
import { async } from '@firebase/util'


const SavedCoin = () => {

    const [coins,setCoins] = useState([])
    const {user} = UserAuth()

    useEffect(()=>{
        onSnapshot(doc(db,'users',`${user?.email}`),(doc)=>{
            setCoins(doc.data()?.watchList)
        })
    },[user?.email])


        const coinPath = doc(db,'users',`${user?.email}`)
        const deleteCoin = async (passedid) => {
            try {
                const result =coins.filter((item) => item.id  !== passedid)
                await updateDoc(coinPath,{
                    watchList :result
                }) 
            }catch (e){
                console.log(e.message)
            }
        } 

    



  return (
    <div>
     {coins?.length === 0 ? (   <p>You don&#39;t have any coins. Please save a coin to your  add it to watch list.  <Link className='text-sky-500 cursor-pointer' href='/'>Click here to search coin. </Link> </p>):  (

        <table  className='w-full border-collapse text-center' >
            <thead>
                <tr className='border-b' >
                    <th  className='px-4' >Name</th>
                    <th  className='text-left' >Coin</th>
                    <th  className='text-left' >Remove</th>
                </tr>
            </thead>
            <tbody>
                {coins?.map((coin)=>(
                    <tr key={coin.id} className='h-[60px] overflow-hidden ' >
                        <td>{coin?.rank} </td>
                        <td>
                            <Link href={`/routs/CoinPage/${coin.id}`} >
                                <div  className='flex items-center' > 
                                    <Image className=' mr-4' src={coin?.image} alt="/"   width={32} height={32} />
                                    <div  >
                                       
                                        <p className='text-gray-500 text-left text-sm'>{coin?.symbol.toUpperCase()}</p>
                                    </div>
                                </div>
                            </Link>
                        </td>
                        <td className='pl-8' >
                            <AiOutlineClose size={20} onClick={() => deleteCoin(coin.id)} className='cursor-pointer  hover:text-red-600  '/>
                        </td>

                    </tr>
                ))}
            </tbody>
        </table>


     ) }
    </div>
  )
}

export default SavedCoin