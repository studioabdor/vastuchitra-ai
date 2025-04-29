# Vastu Chitra AI

An AI-powered architectural visualization platform that generates Indian architectural images from sketches using Stable Diffusion.

## Features

- 🎨 Sketch-to-Image Generation
- 🏗️ Indian Architectural Style Focus
- 🌓 Light/Dark Mode
- 🔐 Secure Authentication
- ☁️ Serverless Architecture
- 📱 Responsive Design

## Tech Stack

- Frontend: React.js with TypeScript
- Backend: Firebase
  - Authentication
  - Cloud Functions
  - Firestore Database
  - Cloud Storage
- AI: Stable Diffusion API
- Styling: Tailwind CSS

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase CLI
- Stable Diffusion API key

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/vastu-chitra-ai.git
cd vastu-chitra-ai
```

2. Install dependencies:
```bash
# Install frontend dependencies
npm install

# Install Cloud Functions dependencies
cd functions
npm install
cd ..
```

3. Create a `.env` file in the root directory with your Firebase configuration:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_STABILITY_API_KEY=your_stability_api_key
```

4. Set up Firebase:
```bash
# Login to Firebase
firebase login

# Initialize Firebase project
firebase init
```

## Development

1. Start the development server:
```bash
npm run dev
```

2. Start Firebase emulators:
```bash
firebase emulators:start
```

## Deployment

1. Build the frontend:
```bash
npm run build
```

2. Deploy to Firebase:
```bash
firebase deploy
```

## Security Rules

The application includes security rules for:
- Firestore Database
- Cloud Storage
- Authentication

Review and customize the rules in:
- `firestore.rules`
- `storage.rules`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Stable Diffusion API
- Firebase
- React.js
- Tailwind CSS
