import Layout from '@components/Layout'
import './App.css'
import Router from '@components/Router'
import { useEffect, useState } from 'react'
import { auth } from '@remote/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import Loader from '@components/Loader'

function App() {
  // auth를 체크하기 전에 (initialize 전)에는 loader를 띄워주는 용도
  const [init, setInit] = useState<boolean>(false)

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth.currentUser,
  )

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
      setInit(true)
    })
  }, [auth])
  return (
    <Layout>
      {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
    </Layout>
  )
}

export default App
