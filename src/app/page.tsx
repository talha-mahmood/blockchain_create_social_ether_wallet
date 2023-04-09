'use client'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState, useMemo } from 'react';
import { getZeroDevSigner, getSocialWalletOwner } from '@zerodevapp/sdk'

import { 
  SocialWallet, 
  GoogleSocialWallet, 
  FacebookSocialWallet,
  GithubSocialWallet,
  DiscordSocialWallet,
  TwitchSocialWallet,
  TwitterSocialWallet
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
      {connected && 
        <div>
          <label>Wallet: {address}</label>
        </div>
      }
      <div>
        {!connected && <button onClick={createWallet} disabled={loading}>{ loading ? 'loading...' : 'Create Wallet'}</button>}
        {connected && 
          <button onClick={disconnect} disabled={loading}>Disconnect</button>
        }
      </div>
    </div>
  )
}

export default Home