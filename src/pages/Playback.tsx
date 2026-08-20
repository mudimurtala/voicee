// src/pages/Playback.tsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRecording } from '../services/firebase'

export function Playback() {
  const { id } = useParams()
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRecording() {
      if (!id) return
      const data = await getRecording(id)
      setAudioUrl(data?.audioUrl ?? null)
      setLoading(false)
    }
    fetchRecording()
  }, [id])

  if (loading) {
    return <p className="text-center mt-20 text-gray-500">Loading...</p>
  }

  if (!audioUrl) {
    return <p className="text-center mt-20 text-gray-500">Recording not found</p>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-xl font-bold mb-4">Voicee</h1>
        <audio src={audioUrl} controls autoPlay />
      </div>
    </div>
  )
}
