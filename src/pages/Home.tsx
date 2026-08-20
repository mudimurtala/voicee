// src/pages/Home.tsx
import { Recorder } from '../components/Recorder/Recorder'

export function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Voicee</h1>
        <p className="text-gray-500 mb-6">Record it. Share it. Instantly.</p>
        <Recorder />
      </div>
    </div>
  )
}
