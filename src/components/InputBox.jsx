import React, { useState, useRef } from 'react';
import { Send, Upload, Mic, Image, X, Volume2, Film } from 'lucide-react';

const InputBox = ({ onSendMessage, isLoading, onImageUpload }) => {
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const mainInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleImageGenerate = () => {
    // Pre-fill input with "Generate an image: " prompt
    setInputValue('Generate an image: ');
    if (mainInputRef.current) {
      mainInputRef.current.focus();
    }
  };

  const handleTTS = () => {
    // Pre-fill input with "Read this: " prompt for TTS
    setInputValue('Read this: ');
    if (mainInputRef.current) {
      mainInputRef.current.focus();
    }
  };

  const handleVideoGenerate = () => {
    // Pre-fill input with "Generate a video: " prompt
    setInputValue('Generate a video: ');
    if (mainInputRef.current) {
      mainInputRef.current.focus();
    }
  };


  const [uploadedImage, setUploadedImage] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Image = event.target.result;
        setUploadedImage(base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitWithImage = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      if (uploadedImage) {
        onImageUpload(uploadedImage, inputValue);
        setUploadedImage(null);
      } else {
        onSendMessage(inputValue);
      }
      setInputValue('');
    }
  };

  const handleMicToggle = () => {
    if (isRecording) {
      // Stop recording
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      }
    } else {
      // Check browser support
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Speech recognition is not supported in this browser.\n\nPlease use:\n• Chrome (Desktop/Mobile)\n• Edge (Desktop)\n• Safari (iOS 14.5+)');
        return;
      }

      try {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.lang = 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
          setIsRecording(true);
          console.log('🎤 Speech recognition started - please speak now');
        };

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          const confidence = event.results[0][0].confidence;
          console.log('📝 Transcript:', transcript, '| Confidence:', confidence);
          setInputValue((prev) => (prev.trim() ? prev + ' ' + transcript : transcript));
        };

        recognition.onerror = (event) => {
          console.error('❌ Speech recognition error:', event.error);
          setIsRecording(false);

          let errorMessage = 'Speech recognition error: ';
          switch(event.error) {
            case 'not-allowed':
            case 'service-not-allowed':
              errorMessage = 'Microphone access denied.\n\nPlease:\n1. Click the 🔒 lock icon in address bar\n2. Allow microphone access\n3. Refresh the page';
              break;
            case 'no-speech':
              errorMessage = 'No speech detected. Please try again.';
              break;
            case 'audio-capture':
              errorMessage = 'No microphone found. Please connect a microphone.';
              break;
            case 'network':
              errorMessage = 'Network error. Please check your internet connection.';
              break;
            default:
              errorMessage += event.error;
          }
          alert(errorMessage);
        };

        recognition.onend = () => {
          setIsRecording(false);
          console.log('⏹️ Speech recognition ended');
        };

        recognition.start();
        mediaRecorderRef.current = recognition;
      } catch (error) {
        console.error('Error initializing speech recognition:', error);
        setIsRecording(false);
        alert('Could not start speech recognition.\n\nError: ' + error.message);
      }
    }
  };

  return (
    <div className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
      {uploadedImage && (
        <div className="p-2 md:p-3 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-orange-500/5 via-amber-500/5 to-yellow-500/5">
          <div className="flex items-center gap-2 md:gap-3">
            <img src={uploadedImage} alt="Uploaded preview" className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover border-2 border-orange-500" />
            <span className="text-xs md:text-sm text-slate-600 dark:text-slate-400 flex-grow">Image ready - Type your question and press send</span>
            <button
              type="button"
              onClick={() => setUploadedImage(null)}
              className="p-1.5 md:p-2 rounded-lg hover:bg-red-500/10 text-slate-500 dark:text-slate-400 hover:text-red-500 transition-all duration-200"
              title="Remove Image"
            >
              <X className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmitWithImage} className="p-2 md:p-4">
        {/* Input and Send button on same row, action buttons below */}
        <div className="flex flex-col gap-2">
          {/* Input row with Send button */}
          <div className="flex items-center gap-2">
            <input
              ref={mainInputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={uploadedImage ? "Ask about the uploaded image..." : "Type your message..."}
              disabled={isLoading}
              className="flex-grow px-3 py-2 md:px-4 md:py-3 text-sm md:text-base rounded-2xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 disabled:opacity-50 text-slate-900 dark:text-slate-100"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="p-2 md:p-3 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 text-white disabled:from-gray-400 disabled:to-gray-500 hover:shadow-lg hover:shadow-orange-500/30 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 disabled:cursor-not-allowed flex-shrink-0"
            >
              <Send className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          </div>

          {/* Action buttons row */}
          <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 md:p-3 rounded-2xl transition-all duration-200 bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 flex-shrink-0"
              title="Upload Image"
            >
              <Upload className="h-4 w-4 md:h-5 md:w-5" />
            </button>
            <button
              type="button"
              onClick={handleMicToggle}
              className={`p-2 md:p-3 rounded-2xl transition-all duration-200 flex-shrink-0 ${
                isRecording
                  ? 'bg-red-500 text-white shadow-lg animate-pulse'
                  : 'bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400'
              }`}
              title={isRecording ? 'Stop Recording' : 'Voice Input'}
            >
              <Mic className="h-4 w-4 md:h-5 md:w-5" />
            </button>
            <button
              type="button"
              onClick={handleImageGenerate}
              className="p-2 md:p-3 rounded-2xl transition-all duration-200 bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 flex-shrink-0"
              title="Generate Image"
            >
              <Image className="h-4 w-4 md:h-5 md:w-5" />
            </button>
            <button
              type="button"
              onClick={handleTTS}
              className="p-2 md:p-3 rounded-2xl transition-all duration-200 bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 flex-shrink-0"
              title="Text to Speech"
            >
              <Volume2 className="h-4 w-4 md:h-5 md:w-5" />
            </button>
            <button
              type="button"
              onClick={handleVideoGenerate}
              className="p-2 md:p-3 rounded-2xl transition-all duration-200 bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 flex-shrink-0"
              title="Generate Video"
            >
              <Film className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InputBox;
