import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

type RSVPInfo = {
  attendeeCount: number
  createdAt: string
}

export default function RSVP() {
  const [rsvps, setRsvps] = useState<RSVPInfo[]>()
  const [total, setTotal] = useState<number>()

  useEffect(() => {
    axios
      .get('https://rsvp-proxy.herokuapp.com/rsvps')
      .then((res: AxiosResponse<{ total: number; rsvps: RSVPInfo[] }>) => {
        setRsvps(res.data.rsvps)
        setTotal(res.data.total)
      })
  })

  return (
    <div style={{ width: '90vw', maxWidth: 400, margin: '80px auto' }}>
      <div style={{ marginBottom: 30 }}>Total: {total}</div>
      <div
        style={{
          marginBottom: 10,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>Registered at</span>
        <span>Guests</span>
      </div>
      {rsvps
        ?.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
        .map(r => (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}
          >
            <span>{new Date(r.createdAt).toLocaleString()}</span>
            <span>{r.attendeeCount}</span>
          </div>
        ))}
    </div>
  )
}
