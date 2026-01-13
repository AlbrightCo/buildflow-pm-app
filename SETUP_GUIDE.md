# BuildFlow PM - Setup Guide

## Firebase Configuration

To make the application functional, you need to create a `.env.local` file in the `buildflow-app` directory with your Firebase project keys.

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Create a new project (or use an existing one).
3.  Register a web app in the project settings.
4.  Copy the configuration keys.
5.  Create a file named `.env.local` in `buildflow-app/`.
6.  Paste the following content, replacing the values with your actual keys:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Running the App

```bash
npm run dev
```
