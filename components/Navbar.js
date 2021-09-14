import Link from 'next/link'
import Image from 'next/image'
import { AuthContext } from '../stores/authContext'
import { useContext } from 'react'

export default function Navbar() {
  const { user, login, logout } = useContext(AuthContext);
  console.log(user);

  return (
    <div className="container">
      <nav>
        <Image src="/rupee.png" width={50} height={48} alt="rupee" />
        <h1>Gaming Vibes</h1>
        <ul>
          <li><Link href="/"><a>Home</a></Link></li>
          <li><Link href="/guides"><a>Guides</a></Link></li>
          <li onClick={login} className="btn">Login/Signup</li>
          <li onClick={logout} className="btn">Logout</li>
        </ul>
      </nav>
      <div className="banner">
        <Image src="/banner.png" width={966} height={276} alt="mario banner" />
      </div>
    </div>
  )
}
