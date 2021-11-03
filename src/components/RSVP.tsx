import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

type RSVPInfo = {
  guestCount: number
  createdAt: string
}

export default function RSVP() {
  const [rsvps, setRsvps] = useState<RSVPInfo[]>()
  const [totalRSVPs, setTotalRSPVs] = useState<number>()
  const [totalGuests, setTotalGuests] = useState<number>()

  useEffect(() => {
    axios
      .get('https://rsvp-proxy.herokuapp.com/rsvps')
      .then((res: AxiosResponse<{ total: number; rsvps: RSVPInfo[] }>) => {
        setRsvps(res.data.rsvps)
        setTotalRSPVs(res.data.total)

        setTotalGuests(
          res.data.rsvps.reduce((acc, curr) => acc + curr.guestCount, 0),
        )
      })
  })

  return (
    <div
      style={{
        width: '90vw',
        maxWidth: 400,
        margin: '80px auto',
        paddingBottom: 40,
      }}
    >
      <div style={{ marginBottom: 30 }}>
        RSVP to Offchain:{' '}
        <a
          href="https://rsvp.fwb.help/offchain"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://rsvp.fwb.help/offchain
        </a>
      </div>
      <div style={{ marginBottom: 30 }}>
        {totalRSVPs} RSVPs // {totalGuests} guests
      </div>
      <div
        style={{
          marginBottom: 10,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>Registered</span>
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
            <span>{r.guestCount}</span>
          </div>
        ))}
    </div>
  )
}
