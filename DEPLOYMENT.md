# Deployment Guide for FusionBotX

## Netlify Deployment

### Prerequisites
- GitHub account
- Netlify account (free tier works)
- Bytez API key
- Gemini API key

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Add Netlify serverless function for video generation"
git push origin main
```

### Step 2: Deploy to Netlify

1. **Connect Repository**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your FusionBotX repository

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`

   These are already configured in `netlify.toml`, so Netlify will auto-detect them.

3. **Set Environment Variables**
   - Go to Site settings → Environment variables
   - Add the following variables:
     - `VITE_GEMINI_API_KEY` = `your_gemini_api_key`
     - `VITE_BYTEZ_API_KEY` = `your_bytez_api_key`

4. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete (~2-3 minutes)

### Step 3: Verify Deployment

Your site will be available at: `https://your-site-name.netlify.app`

Test the video generation:
1. Click the 🎬 Film button
2. Type: "Generate a video: A cat playing"
3. Video should generate and display

### How It Works

**Development (localhost)**:
- Frontend: `http://localhost:5000` (Vite)
- Backend: `http://localhost:3001` (Express server)
- Uses local Express server for video generation

**Production (Netlify)**:
- Frontend: `https://your-site.netlify.app`
- Backend: `https://your-site.netlify.app/.netlify/functions/generate-video`
- Uses Netlify serverless function for video generation

The code automatically detects the environment using `import.meta.env.PROD` and switches between local server and Netlify function.

### Troubleshooting

**Function Timeout**
- Netlify free tier has 10-second function timeout
- Video generation might take longer
- Consider upgrading to Pro tier or using a different deployment platform

**Build Errors**
- Check build logs in Netlify dashboard
- Ensure all dependencies are in `package.json`
- Verify environment variables are set correctly

**API Key Issues**
- Make sure environment variables start with `VITE_` prefix
- They must be set in Netlify dashboard, not just in `.env` file

### Alternative: Manual Testing

Test Netlify function locally using Netlify CLI:
```bash
npm install -g netlify-cli
netlify dev
```

This will run both frontend and functions locally, simulating the Netlify environment.
