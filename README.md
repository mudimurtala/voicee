# Voicee

Record your voice. Save it. Share it with a single link.

**Live app:** https://voiceesound.netlify.app/

Voicee is a simple web app that lets anyone record audio straight from their browser and instantly get a shareable link. No account needed, no download required. Whoever opens the link can listen right away.

## Why I built this

I came across a platform that did exactly this, a clean way to record and share voice through a link, and got curious about how something like that actually works under the hood. Rather than just admire it, I decided to build my own version from scratch, learning the full stack behind it along the way: browser audio capture, file storage, a database, and deployment.

## What it does

- Record audio directly in the browser using your microphone
- Preview your recording before saving it
- Save the recording and instantly generate a short, unique shareable link
- Anyone who opens that link lands on a clean playback page and can listen immediately
- Works from any device with a browser and a microphone, no installation needed

## Tech stack

- **React with TypeScript**, built using Vite
- **Tailwind CSS** for styling
- **MediaRecorder API** (built into the browser) for capturing audio
- **Cloudinary** for storing the actual audio files
- **Firebase Firestore** for storing each recording's metadata and generating its shareable id
- **React Router** for handling the recording page and the playback page
- **Netlify** for hosting and continuous deployment from GitHub

## How it works

1. The browser's MediaRecorder API captures audio while you record
2. Once you stop, the recording plays back locally so you can confirm it before saving
3. On save, the audio file uploads to Cloudinary, which returns a permanent public url
4. That url gets stored in a Firestore document under a short, randomly generated id
5. Your shareable link is built from that id, something like `voiceesound.netlify.app/r/x7k2p9`
6. When anyone opens that link, the app looks up the matching Firestore document, pulls the real audio url, and plays it inside its own player

## Project structure

```
src/
├── components/
│   ├── Recorder/     recording UI and controls
│   ├── Player/        playback UI
│   └── shared/
├── pages/
│   ├── Home.tsx        the recording page
│   └── Playback.tsx    the page a shared link opens to
├── services/
│   ├── cloudinary.ts   handles uploading audio
│   └── firebase.ts     handles saving and reading recordings
├── hooks/
│   └── useRecorder.ts  the core recording logic
└── types/
    └── recording.ts
```

## Running it locally

Clone the repository and install dependencies:

```
git clone https://github.com/mudimurtala/voicee.git
cd voicee
npm install
```

You will need your own Cloudinary and Firebase project keys. Create a `.env.local` file in the root with:

```
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Then start the dev server:

```
npm run dev
```

## What is coming next

This is an active project, and a few features are planned for a future round:

- A waveform visual and a live timer while recording, so there is visual feedback beyond just a button
- A one click copy button next to the generated link, instead of needing to manually select and copy the text
- Possibly a simple history view for recordings made in a session

## Author

Built by Muritala Mudi (Mudi), a frontend and full stack developer based in Ilorin, Nigeria.
