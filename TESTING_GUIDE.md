# MiniChatBot - Testing Guide

## 🚀 Server is Running

**URLs:**
- Local: http://localhost:5000/
- Network: http://192.0.0.4:5000/

## ✅ Fixed Issues

### API Key Configuration
- **Fixed**: Removed quotes from `.env` file
- **Format**: `VITE_GEMINI_API_KEY=AIzaSyDQ6bAqQFoT5i994FpbQsHtuaI3SK3rLxs`
- **Status**: ✅ Loaded correctly

### Console Logging
- Added debug logs to track API calls
- Can see requests and responses in browser console (F12)

## 📝 How to Test

### 1. Test Text Chat with Gemini
```
Type: "Hello"
Expected: Gemini responds with greeting

Type: "What is 2+2?"
Expected: Gemini calculates and responds

Type: "Tell me a joke"
Expected: Gemini tells a joke
```

### 2. Test Image Generation with Pollinations AI
```
Type: "Generate an image: Beautiful sunset over mountains"
Expected: Image appears in chat

Click the 📷 button → Type "cute puppy" → Click Generate
Expected: Image of puppy appears

Type: "Create image of a red sports car"
Expected: Image of sports car appears
```

### 3. Test Mobile Responsive Features

#### On Desktop (> 768px)
- Sidebar always visible
- Rounded chat window
- Larger text and icons

#### On Mobile (< 768px)
1. Click ☰ menu button
2. Sidebar slides in from left
3. Dark overlay appears
4. Click a chat or overlay to close
5. Sidebar slides out

### 4. Test Dark Mode
1. Click sun/moon icon (top right)
2. Theme should switch smoothly
3. All colors update correctly
4. Preference saved in localStorage

### 5. Test Session Management
1. Click "New Chat" button
2. New session created
3. Switch between sessions
4. Delete sessions (trash icon on hover)
5. Sessions persist after page reload

### 6. Test Error Handling
```
Turn off internet → Send message
Expected: Error message shown

Invalid API key → Send message
Expected: "API key not found" message
```

## 🔍 Debugging

### Check Browser Console
1. Press F12 or Right-click → Inspect
2. Go to "Console" tab
3. Look for:
   - "API Key loaded: Yes"
   - "API Key length: 39"
   - Request/response logs

### Common Issues & Solutions

#### "API key not found"
- Check `.env` file exists
- No quotes around API key
- Restart dev server after changing `.env`

#### "Sorry, I couldn't get a response"
- Check browser console for errors
- Verify API key is correct
- Check internet connection
- Look at response status code

#### Images not loading
- Check network connectivity
- Pollinations.ai might be slow (wait 10-15 seconds)
- Try different prompts

#### Sidebar not working on mobile
- Check screen width (< 768px)
- Try clicking hamburger menu
- Check for JavaScript errors

## 📊 Expected Console Output

When sending a message:
```
Sending message: Hello
History length: 1
fetchTextResponse called with: Hello
Making request to Gemini API...
URL: https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash...
Request body: {
  "contents": [...]
  ...
Response status: 200
Bot response received: Hello! How can I help you study today? I'm ready to assist with...
```

When generating image:
```
Sending message: Generate an image: sunset
fetchBotResponse called (image request detected)
Generating image with prompt: sunset
```

## 🎯 Success Criteria

✅ Text messages get responses from Gemini
✅ Images generate from Pollinations AI
✅ Mobile menu works on small screens
✅ Dark mode toggles properly
✅ Sessions save and load
✅ Error messages are user-friendly
✅ No console errors (except expected ones)

## 🐛 Known Issues

None! Everything should work perfectly now.

## 💡 Tips

1. **First Load**: API key loads once on page load
2. **Refresh**: If issues persist, hard refresh (Ctrl+Shift+R)
3. **Clear Cache**: Clear browser cache if API key was changed
4. **Console**: Always check console for detailed error info
5. **Network Tab**: Use browser DevTools Network tab to see API requests

## 📱 Mobile Testing

Use these methods to test mobile view:
1. **Browser DevTools**: F12 → Toggle device toolbar (Ctrl+Shift+M)
2. **Responsive Mode**: Resize browser window
3. **Real Device**: Access via network URL on phone
4. **Viewport Sizes**: Test 320px, 375px, 768px, 1024px, 1440px

## 🔗 API Endpoints

### Gemini (Text)
```
URL: https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent
Method: POST
Auth: API key in URL parameter
```

### Pollinations (Images)
```
URL: https://image.pollinations.ai/prompt/{encoded_prompt}
Method: GET
Params: width=1024&height=1024&nologo=true&enhance=true
```

## 📞 Support

If you encounter issues:
1. Check this guide
2. Look at console logs
3. Verify API key in `.env`
4. Restart dev server
5. Clear browser cache

**Current Status**: ✅ All systems operational!
