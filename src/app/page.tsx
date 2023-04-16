'use client'
import { useState, useMemo } from 'react';
import { getZeroDevSigner, getSocialWalletOwner } from '@zerodevapp/sdk'
import Image from 'next/image';
import myimg from "/public/i.png"

import { 
  SocialWallet

} from '@zerodevapp/social-wallet';


const Home =()=>{
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)

  const socialWallet = useMemo(() => {
    return new SocialWallet()
  }, [])
  
  const createWallet = async () => {
    let defaultProjectId="a616367c-29b0-4f7b-9e85-3c3e69cf8b8c"
    setLoading(true)
    const signer = await getZeroDevSigner({
      projectId: defaultProjectId,
      owner: await getSocialWalletOwner(defaultProjectId, socialWallet)
    })
    setAddress(await signer.getAddress())
    setLoading(false)
  }

  const disconnect = async () => {
    await socialWallet.disconnect()
    setAddress('')
  }

  const connected = !!address

  return (
    
    <div>

      <section className='max-w-screen-2xl mx auto px-4' >

      <div className='flex flex-col md:flex-row mt-9 '>
        {/* Left side */}
        <div className='flex-1'>
          
          <h1 className='text-4xl  sm:text-5xl font-bold text-[#ffffff] '>Create Wallets with Social</h1>
          <p className='mt-6 text-xl text-[#ffffff]'> ZeroDev makes it easy to create AA wallets, and it doesn't get easier than using social logins. This allows you to build a powerful Web3 experience where:</p>
          <ol className='mt-1 text-xl text-[#ffffff]'>
           <li>Your users don't need to download wallets or back up seed phrases.</li>
           <li>You app can offer a Web2-level UX through AA features like gas-less transactions, transaction bundling, etc.</li>
          </ol>
          <div className='mt-5'>
          {connected && 
        <div>
          <label>Wallet: {address}</label>
          <br />
          <button className='bg-teal-700 text-white px-7 py-4 rounded-full shadow-lg text-lg font-medium hover:shadow-lg hover:scale-105 duration-300' onClick={disconnect} disabled={loading}>Disconnect</button>
        </div>
      }
      <div>
        {!connected && <button className='bg-teal-700 text-white px-7 py-4 rounded-full shadow-lg text-lg font-medium hover:shadow-lg hover:scale-105 duration-300'
        onClick={createWallet} disabled={loading}>{ loading ? 'loading...' : 'Create Wallet'}</button>}
        
      </div>
          
  </div>
          
   </div>

        {/* Right side */}
        <div className='flex-1'>
          <Image src={myimg} alt="Web3" className={"border-none"}></Image>
        </div>
      </div>
     

    </section>
    
     
    </div>
  )
}

export default Home