import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'
import Form from './form'
import Member from './member'

import './style.scss'

interface member {
  firstName: string,
  lastName: string,
  address: string,
  ssn: `${number}-${number}-${number}`,
}

export default function MainPage() {
  const [members, setMembers] = useState([] as member[])

  const fetchMembers = () => {
    axios.get('http://localhost:8081/api/members', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => { setMembers(res.data) })
      .catch(err => { window.location.href = '/login' })
  }

  useEffect(() => {
    let refresh = setInterval(fetchMembers, 120000)
    fetchMembers()

    const resetIdle = function () {
      clearInterval(refresh)
      refresh = setInterval(fetchMembers, 120000)
    }

    document.onmousemove = resetIdle
    document.onkeydown = resetIdle

    return () => { clearInterval(refresh) }
  }, [fetchMembers])
  
  const cookies = new Cookies()

  const token = cookies.get("access_token")
  if (!token || token == undefined) {
    window.location.href = '/login'
    return <></>
  }

  return (
    <div className="body">
      <div className="navbar">
        <a href="/">Home</a>
        <a href="https://github.com/EzeKoren/devskillsadv">Other page</a>
      </div>
      <div className="content">
        <div className="form-container">
          <Form token={token} members={members} callback={(member:member) => setMembers([...members, member])} />
        </div>
        <div className="table-container">
          <table>
            <tbody>
              <tr className="table-head">
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>SSN</th>
              </tr>
              { members.map(m => <Member member={m}/>) }
            </tbody>
          </table>
        </div>
      </div>
      <div className="footer">
        <span>copyright</span>
        <span>All rights reserved</span>
      </div>
    </div>
  )
}
