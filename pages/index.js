import Head from 'next/head'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div className="bg-black h-screen over">
      <main>
        {/* sidebar */}
        <Sidebar />
      </main>

    </div>
  )
}
