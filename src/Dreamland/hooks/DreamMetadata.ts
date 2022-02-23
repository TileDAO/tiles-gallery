import axios from 'axios'
import { useEffect, useState } from 'react'
import { DreamMetadata } from '../models/dreamMetadata'

const apiUrl = process.env.REACT_APP_DREAMLAND_API_URL

export default function useDreamMetadata(tile: string | undefined) {
  const [dreamMetadata, setDreamMetadata] = useState<DreamMetadata | null>()

  useEffect(() => {
    if (!tile) return

    const loadDreamImage = async () => {
      const metadata = await axios
        .get<DreamMetadata>(apiUrl + '/' + tile.toLowerCase())
        .catch(e => console.log('No Dream metadata for Tile', tile))

      setDreamMetadata(metadata?.data ?? null)
    }

    loadDreamImage()
  }, [tile])

  return dreamMetadata
}
