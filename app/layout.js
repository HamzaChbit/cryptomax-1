


import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import { ThemeProvider } from "./context/ThemeContext.jsx";
import Footer from './components/Footer.jsx';
import { AuthContextProvider } from '../app/context/AuthContext.jsx';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CryptoByChbit',
  description: 'CryptoByChbit',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       
 <body>

 <ThemeProvider  >

  <AuthContextProvider>


 <Navbar/>

{children}

< Footer />
</AuthContextProvider>
 </ThemeProvider>
   
     

    


     
   
  
   
      </body>
     
    </html>
  )
}
