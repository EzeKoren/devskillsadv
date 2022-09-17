import React from 'react'

interface member {
  firstName: string,
  lastName: string,
  address: string,
  ssn: `${number}-${number}-${number}`,
}

export default function Member(props:{member: member}) {
  const member = props.member
  return (
    <tr className="table-row">
      <td>{member.firstName}</td>
      <td>{member.lastName}</td>
      <td>{member.address}</td>
      <td>{member.ssn}</td>
    </tr>
  )
}
