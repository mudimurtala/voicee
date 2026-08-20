// src/components/Recorder/Recorder.tsx
import { useState } from 'react'
import { useRecorder } from '../../hooks/useRecorder'
import { uploadAudio } from '../../services/cloudinary'
import { saveRecording } from '../../services/firebase'

export function Recorder() {
  const {
    isRecording,
    audioUrl,
    audioBlob,
    startRecording,
    stopRecording,
    resetRecording,
  } = useRecorder()

  const [isSaving, setIsSaving] = useState(false)
  const [shareLink, setShareLink] = useState<string | null>(null)

  async function handleSave() {
    if (!audioBlob) return

    setIsSaving(true)
    try {
      const cloudUrl = await uploadAudio(audioBlob)
      const id = await saveRecording(cloudUrl)
      setShareLink(`${window.location.origin}/r/${id}`)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      {!audioUrl && (
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`px-6 py-3 rounded-full font-medium text-white transition ${
            isRecording ? 'bg-red-500 animate-pulse' : 'bg-indigo-600'
          }`}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
      )}

      {audioUrl && !shareLink && (
        <div className="flex flex-col items-center gap-3">
          <audio src={audioUrl} controls />
          <div className="flex gap-3">
            <button
              onClick={resetRecording}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700"
            >
              Record Again
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 rounded-md bg-indigo-600 text-white disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save and Get Link'}
            </button>
          </div>
        </div>
      )}

      {shareLink && (
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-600">Your recording is ready to share</p>
          <input
            readOnly
            value={shareLink}
            onClick={(event) => event.currentTarget.select()}
            className="border rounded-md px-3 py-2 w-72 text-center"
          />
        </div>
      )}
    </div>
  )
}
