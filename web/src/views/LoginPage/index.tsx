import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const cookies = new Cookies()

  const login = (event: React.FormEvent) => {
    event.preventDefault()
    if (!username || !password) return
    
    else
      axios.post('http://localhost:8081/auth', { username, password })
        .then((res) => {
          const expiration = new Date(0)
          expiration.setUTCSeconds(res.data.exp)
          cookies.set('access_token', res.data.token, {
            path: '/',
            expires: expiration
          })
          window.location.href = "/"
        })
        .catch((err) => {
          alert("The username and password are invalid")
        })
  }

  return (
    <div className='login-page'>
      <div className="login-container">
        <form onSubmit={login} className="login">
          <label htmlFor="username">Username</label>
          <input required onChange={(e) => { setUsername(e.target.value) }} type="text" id='username' name='username' />

          <label htmlFor="password">Password</label>
          <input required onChange={(e) => { setPassword(e.target.value) }} type="password" id='password' name='password' />

          <input type='submit' name='login'/>
        </form>
      </div>
    </div>
  )
}
