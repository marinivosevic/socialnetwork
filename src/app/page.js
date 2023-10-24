import Image from 'next/image'
import Navbar from './components/Navbar'

import FriendsTab from './components/FriendsTab'
import PostDIv from './components/PostDIv'


export default function Home() {
  return (
    <main  className='bg-red-900'>
      <div>
     
      <div className='flex h-screen'>
        <Navbar />
        <PostDIv/>
        <FriendsTab/>
      </div>
      </div>
    </main>
  )
}
