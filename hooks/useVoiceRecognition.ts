
import { useState, useEffect, useRef, useCallback } from 'react';

// Fix: Cast window to `any` to access non-standard properties and rename the
// constant to avoid shadowing the global `SpeechRecognition` type.
const SpeechRecognitionApi = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

export const useVoiceRecognition = (onTranscriptReady: (transcript: string) => void) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  // Fix: `SpeechRecognition` now correctly refers to the interface type because
  // the local constant with the same name has been renamed.
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Fix: Use the renamed constant.
    if (!SpeechRecognitionApi) {
      console.error("Speech Recognition API not supported in this browser.");
      return;
    }
    
    // Fix: Use the renamed constant to create a new instance.
    const recognition = new SpeechRecognitionApi();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setTranscript(finalTranscript + interimTranscript);
    };
    
    recognition.onend = () => {
      setIsListening(false);
      // Using a ref to get the latest transcript value in the onend callback
      if (recognitionRef.current && (recognitionRef.current as any).finalTranscript) {
          onTranscriptReady((recognitionRef.current as any).finalTranscript);
          setTranscript('');
          (recognitionRef.current as any).finalTranscript = '';
      }
    };
    
    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    
    return () => {
      recognition.stop();
    };
  }, [onTranscriptReady]);
  
  // This effect updates a property on the ref to hold the latest transcript
  // because the `onend` callback closure captures the initial empty transcript.
  useEffect(() => {
    if (recognitionRef.current) {
      (recognitionRef.current as any).finalTranscript = transcript;
    }
  }, [transcript]);


  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      setTranscript('');
      (recognitionRef.current as any).finalTranscript = '';
      recognitionRef.current.start();
      setIsListening(true);
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, [isListening]);

  // Fix: Use the renamed constant for the support check.
  return { isListening, transcript, startListening, stopListening, hasRecognitionSupport: !!SpeechRecognitionApi };
};
