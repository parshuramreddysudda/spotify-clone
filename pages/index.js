import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Center from '../components/Center'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div className="h-screen overflow-hidden bg-black ">
      <main className='flex'>
        {/* sidebar */}
        <Sidebar />
        <Center />
      </main>

    </div>
  )
}
export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    }
  }

}
