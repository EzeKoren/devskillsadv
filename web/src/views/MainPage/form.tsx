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
  }

  return (
    <form onSubmit={addMember}>
    <div className="row">
      <label htmlFor="firstName">First Name</label>
      <input type="text" id="firstName" name="firstName" pattern=".{2,}" required />
    </div>
    <div className="row">
      <label htmlFor="lastName">Last Name</label>
      <input type="text" id="lastName" name="lastName" pattern=".{2,}" required />
    </div>
    <div className="row">
      <label htmlFor="address">Address</label>
      <input type="text" id="address" name="address" pattern=".{2,}" required />
    </div>
    <div className="row">
      <label htmlFor="ssn">SSN</label>
      <input type="text" id="ssn" name="ssn" pattern="\d{3}-\d{2}-\d{4}" required onChange={(e) => checkSSN(e.target)} />
    </div>
    <div className="row">
      {/* @ts-ignore */}
      <input type="button" value="Reset" onClick={ e => e.target.form.reset() } />
      <input type="submit" value="Save" />
    </div>
  </form>
  )
}
