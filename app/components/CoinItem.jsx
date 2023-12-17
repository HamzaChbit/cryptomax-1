'use client'
import React, { useState,useEffect } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Link from 'next/link';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import Image from 'next/image';
const CoinItem = ({ coin }) => {
  
  const [savedCoin,setSavedCoin] = useState(false)
  const {user} = UserAuth()

  const coinPath = doc(db,'users',`${user?.email}`)

 
  const saveToLocalStorage = (coin) => {
    const savedCoins = JSON.parse(localStorage.getItem('savedCoins')) || [];
    const existingCoin = savedCoins.find((saved) => saved.id === coin.id);

    if (!existingCoin) {
      savedCoins.push({
        id: coin.id,
        name: coin.name,
        image: coin.image,
        rank: coin.image,
        symbol: coin.symbol,
      });

      localStorage.setItem('savedCoins', JSON.stringify(savedCoins));
      setSavedCoin(true); // Update the state here
    }
  };

  const saveCoinToFirestore = async () => {
    if (user?.email) {
      await updateDoc(coinPath, {
        watchList: arrayUnion({
          id: coin.id,
          name: coin.name,
          image: coin.image,
          rank: coin.image,
          symbol: coin.symbol,
        }),
      });
      setSavedCoin(true); // Update the state here
    } else {
      alert('Please sign in to save a coin to your watch list');
    }
  };

  const saveCoin = () => {
    if (!savedCoin) {
      saveCoinToFirestore();
      saveToLocalStorage(coin);
    }
  };
  return (
    <tr className='h-[80px] border-b overflow-hidden'>
        <td onClick={saveCoin}>
        {savedCoin ? <AiFillStar className='cursor-pointer' /> : <AiOutlineStar className='cursor-pointer' />}
      </td>
      <td>{coin.market_cap_rank}</td>
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
        {coin.price_change_percentage_24h > 0 ? (
          <p className='text-green-600'>
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        ) : (
          <p className='text-red-600'>
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        )}
      </td>
      <td className='w-[180px] hidden md:table-cell'>
        ${coin.total_volume.toLocaleString()}
      </td>
      <td className='w-[180px] hidden sm:table-cell'>
        ${coin.market_cap.toLocaleString()}
      </td>
      <td>
        <Sparklines data={coin.sparkline_in_7d.price}>
          <SparklinesLine color='teal' />
        </Sparklines>
      </td>
    </tr>
  );
};

export default CoinItem;