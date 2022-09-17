import React from 'react'
import axios from 'axios'

import './style.scss'

interface member {
  firstName: string,
  lastName: string,
  address: string,
  ssn: `${number}-${number}-${number}`,
}

export default function Form(props:{ token: String, members: member[], callback: Function }) {

  const checkSSN = (InputSSN: HTMLInputElement, show = false) => {
    InputSSN.setCustomValidity('')
    if (InputSSN.validity.valid) {
      props.members.forEach(member => {
        if (member['ssn'] == InputSSN.value) {
          InputSSN.setCustomValidity('The SSN must not match an already existing entry')
          show && InputSSN.reportValidity()
          return false
        }
      })
      return true
    }
    return false
  }

  const trimElement = (Input: HTMLInputElement) => {
    Input.value = Input.value.trim()
  }

  const addMember = (e: React.FormEvent) => {
    e.preventDefault()
    // @ts-ignore
    const els:HTMLInputElement[] = Array.from(e.target)

    checkSSN(els[3], true)
    
    const member = {
      firstName: els[0].value,
      lastName: els[1].value,
      address: els[2].value,
      ssn: els[3].value
    }
    
    axios.post('http://localhost:8081/api/members', member, {
      headers: { Authorization: `Bearer ${props.token}` }
    }).then(res => props.callback(res.data))
      .catch(err => {
        if (err.response.status == 401) {
          alert("This session has expired.")
          window.location.href = '/login'
        }
      })
  }

  return (
    <form onSubmit={addMember}>
    <div className="text-input-group">
      <input type="text" id="firstName" name="firstName" pattern=".{2,}" required placeholder=' ' onBlur={(e) => trimElement(e.target)} />
      <label htmlFor="firstName">First Name</label>
    </div>
    <div className="text-input-group">
      <input type="text" id="lastName" name="lastName" pattern=".{2,}" required placeholder=' ' onBlur={(e) => trimElement(e.target)} />
      <label htmlFor="lastName">Last Name</label>
    </div>
    <div className="text-input-group">
      <input type="text" id="address" name="address" pattern=".{2,}" required placeholder=' ' onBlur={(e) => trimElement(e.target)} />
      <label htmlFor="address">Address</label>
    </div>
    <div className="text-input-group">
      <input type="text" id="ssn" name="ssn" pattern="\d{3}-\d{2}-\d{4}" required placeholder=' ' onChange={(e) => checkSSN(e.target)} />
      <label htmlFor="ssn">SSN</label>
    </div>
    <div className="button-container">
      {/* @ts-ignore */}
      <input className='btn red' type="button" value="Reset" onClick={ e => e.target.form.reset() } />
      <input className='btn' type="submit" value="Save" />
    </div>
  </form>
  )
}
