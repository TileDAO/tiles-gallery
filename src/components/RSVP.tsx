import { useEthers } from '@usedapp/core'
import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

type RSVPInfo = {
  id: string
  guests: number
  createdAt: string
  account: string
  email: string
  name: string
}

export default function RSVP() {
  const [rsvps, setRsvps] = useState<RSVPInfo[]>()
  const [totalRSVPs, setTotalRSPVs] = useState<number>()
  const [totalGuests, setTotalGuests] = useState<number>()

  const { account } = useEthers()

  const isAdmin =
    account?.toLowerCase() ===
    '0x63A2368F4B509438ca90186cb1C15156713D5834'.toLowerCase()

  const rsvpUrl = 'https://rsvp-proxy.herokuapp.com/rsvps'

  useEffect(() => {
    axios
      .get(isAdmin ? process.env.REACT_APP_RSVP_URL ?? rsvpUrl : rsvpUrl)
      .then((res: AxiosResponse<{ total: number; rsvps: RSVPInfo[] }>) => {
        setRsvps(res.data.rsvps)
        setTotalRSPVs(res.data.total)

        setTotalGuests(
          res.data.rsvps.reduce((acc, curr) => acc + curr.guests, 0),
        )
      })
  }, [account])

  return (
    <div
      style={{
        width: '90vw',
        maxWidth: isAdmin ? 800 : 400,
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
        {totalRSVPs} RSVPs // {totalGuests} guests //{' '}
        {(totalRSVPs ?? 0) + (totalGuests ?? 0)} total
      </div>
      {!isAdmin && (
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
      )}
      {rsvps
        ?.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
        .map(r =>
          isAdmin ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}
              key={r.createdAt}
            >
              <span>
                {r.name} // {r.email}
              </span>
              <span>
                {r.guests ? '+' + r.guests : ''}{' '}
                {new Date(r.createdAt).toLocaleString()}
              </span>
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}
              key={r.createdAt}
            >
              <span>{new Date(r.createdAt).toLocaleString()}</span>
              <span>{r.guests ? '+' + r.guests : ''}</span>
            </div>
          ),
        )}
    </div>
  )
}
