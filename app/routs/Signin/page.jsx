'use client'
import React, { useState } from 'react'
import { AiFillLock, AiOutlineMail } from 'react-icons/ai'
import Link from 'next/link'
import { UserAuth} from '../../context/AuthContext'
import { useRouter } from 'next/navigation'
const Signin = () => {


  const {signIn} = UserAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const router = useRouter();

const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
    
      await signIn(email,password)
    
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }
 
  }

 
     const handelButton = (e) =>{
      if( signIn(email,password)  ) {
        router.push('/routs/Account')
      }else{
         setError(e.message)
       
      }
     }









 



  return (
    <div   >
      <div  className='max-w-[400px] mx-auto min-h-[600px] px-4 py-20' >
        <h1  className='text-2xl font-bold' >Sign In</h1>
        <form  onSubmit={handleSubmit } >
          <div  className='my-4' >
            <label >Email</label>
            <div   className='my-2 w-full relative rounded-2xl shadow-xl ' >
              <input type="email"  className='w-full p-2  bg-primary border border-input rounded-2xl '   onChange={(e)=> setEmail(e.target.value)} />
              <AiOutlineMail className='absolute right-2  top-3 text-gray-400'/>
            </div>
          </div>
          <div className='my-4' >
            <label>Password</label>
            <div   className='my-2 w-full relative rounded-2xl shadow-xl '  >
              <input type="password"  className='w-full p-2  bg-primary border border-input rounded-2xl ' onChange={(e)=> setPassword(e.target.value)} />
              <AiFillLock className='absolute right-2 top-3 text-gray-400'/>
            </div>
          </div>
          <button  className='w-full my-2 p-3 bg-button text-btnText rounded-2xl  shadow-xl '  onClick={handelButton}  >Sign in</button>
        </form>
      <p  className='my-4 ' >Don't have an account ? <Link  href='/routs/Signup'  className='text-accent' >Sign Up</Link> </p>
      </div>
    </div>
  )
}

export default Signin