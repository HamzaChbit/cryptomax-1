'use client'
import React, { useState,useEffect } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Link from 'next/link';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { UserAuth } from '../context/AuthContext';

import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import Image from 'next/image';
import { db } from '../Firebase';

const CoinItem = ({ coin }) => {
  
  const [savedCoin, setSavedCoin] = useState(false);
  const { user } = UserAuth();
 


  const coinPath = doc(db, 'users', `${user?.email}`);


  useEffect(() => {
    const fetchUserWatchlist = async () => {
      try {
        if (user?.email) {
          // Fetch user's watchlist from Firestore
          const userDoc = await doc(db, 'users', `${user?.email}`);
          const userSnap = await userDoc.get();

          if (userSnap.exists()) {
            const userWatchlist = userSnap.data().watchList || [];
            const isCoinSaved = userWatchlist.some((item) => item.id === coin.id);
            setSavedCoin(isCoinSaved);
          }
        }
      } catch (error) {
        console.error('Error fetching user watchlist:', error);
      }
    };

    fetchUserWatchlist();
  }, [user?.email, coin.id]);


  const toggleSavedCoin = async () => {
    if (user?.email) {
      if (savedCoin) {
        // Delete the coin from watchlist
        setSavedCoin(false);
        await updateDoc(coinPath, {
          watchList: arrayRemove({
            id: coin.id,
            name: coin.name,
            image: coin.image,
            rank: coin.market_cap_rank,
            symbol: coin.symbol,
          }),
        });
      } else {
        // Save the coin to watchlist
        setSavedCoin(true);
        await updateDoc(coinPath, {
          watchList: arrayUnion({
            id: coin.id,
            name: coin.name,
            image: coin.image,
            rank: coin.market_cap_rank,
            symbol: coin.symbol,
          }),
        });
      }
    } else {
      alert('Please sign in to save or remove a coin from your watch list');
    }
  };
  






  return (
    <tr className='h-[80px] border-b overflow-hidden'>
       <td onClick={toggleSavedCoin}>
        {savedCoin ? <AiFillStar /> : <AiOutlineStar />}
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