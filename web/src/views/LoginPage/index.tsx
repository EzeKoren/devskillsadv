import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'

import './style.scss'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const cookies = new Cookies()

  const login = (event: React.FormEvent) => {
    event.preventDefault()
    
    if (!username || !password) return
    
    else {
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
          // @ts-ignore
          const els:HTMLInputElement[] = Array.from(event.target)
          els[0].setCustomValidity('The username and password are invalid')
          els[1].setCustomValidity('The username and password are invalid')
          els[1].reportValidity()
        })
      }
  }

  return (
    <div className='login-page'>
      <div className="login-container">
        <form onSubmit={login} className="login">
          <div className="title">Log In</div>
          <div className="text-input-group">
            <input className="text-input" required onChange={(e) => { e.target.setCustomValidity(''); setUsername(e.target.value) }} type="text" id='username' name='username' placeholder=' ' />
            <label htmlFor="username">Username</label>
          </div>
          <div className="text-input-group">
            <input className="text-input" required onChange={(e) => { e.target.setCustomValidity(''); setPassword(e.target.value) }} type="password" id='password' name='password' placeholder=' ' />
            <label htmlFor="password">Password</label>
          </div>
          <input className="btn" type='submit' value='Login'/>
        </form>
      </div>
      <div className="background-container" />
    </div>
  )
}
