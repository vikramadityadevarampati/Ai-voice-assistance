
import React, { useState, useCallback } from 'react';
import { RESTAURANTS } from './constants';
import { RestaurantCard } from './components/RestaurantCard';
import { Header } from './components/Header';
import { useVoiceRecognition } from './hooks/useVoiceRecognition';
import { parseOrderFromText } from './services/geminiService';
import { ParsedOrder } from './types';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { Spinner } from './components/Spinner';

const MicIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93V17h-2v-2.07A8.001 8.001 0 012 8V7a1 1 0 011-1h2a1 1 0 011 1v1a5 5 0 0010 0V7a1 1 0 011 1h2a1 1 0 011 1v1a8.001 8.001 0 01-9 6.93z" clipRule="evenodd" />
    </svg>
);

const App: React.FC = () => {
    const [parsedOrder, setParsedOrder] = useState<ParsedOrder | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    
    const handleTranscriptReady = useCallback(async (transcript: string) => {
        if (!transcript) return;
        setIsProcessing(true);
        try {
            const order = await parseOrderFromText(transcript);
            setParsedOrder(order);
            setIsModalOpen(true);
        } catch (error) {
            console.error(error);
            alert("Sorry, I had trouble understanding your order. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    }, []);

    const { isListening, transcript, startListening, stopListening, hasRecognitionSupport } = useVoiceRecognition(handleTranscriptReady);

    const handleConfirmOrder = () => {
        alert("Order confirmed! (This is a demo)");
        setIsModalOpen(false);
        setParsedOrder(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setParsedOrder(null);
    };

    return (
        <div className="min-h-screen bg-base-100 font-sans">
            <Header />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-base-content">Welcome to AIFoodie</h2>
                    <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
                        Tap the button below and say what you'd like to order. For example, "Get me a Pepperoni Pizza and two Cokes from Pizza Palace."
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {RESTAURANTS.map(restaurant => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))}
                </div>
            </main>

            <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-center items-end" style={{ pointerEvents: 'none' }}>
                <div className="relative flex flex-col items-center" style={{ pointerEvents: 'auto' }}>
                    {isListening && (
                        <div className="absolute bottom-24 w-full max-w-sm bg-base-200 text-base-content p-3 rounded-lg shadow-lg text-center text-sm mb-2">
                           {transcript || "Listening..."}
                        </div>
                    )}
                     <button
                        onClick={isListening ? stopListening : startListening}
                        disabled={!hasRecognitionSupport || isProcessing}
                        className={`relative rounded-full h-20 w-20 flex items-center justify-center transition-all duration-300 shadow-2xl focus:outline-none focus:ring-4 focus:ring-primary/50
                            ${isListening ? 'bg-red-500 animate-pulse' : 'bg-primary'}
                            ${isProcessing ? 'bg-gray-500' : ''}
                        `}
                    >
                        {isProcessing ? <Spinner size="8" color="white" /> : <MicIcon className="h-10 w-10 text-white" />}
                    </button>
                    {!hasRecognitionSupport && <p className="text-red-500 text-xs mt-2">Voice recognition not supported.</p>}
                </div>
            </div>

            <OrderConfirmationModal 
                isOpen={isModalOpen}
                order={parsedOrder}
                onClose={handleCloseModal}
                onConfirm={handleConfirmOrder}
            />
        </div>
    );
};

export default App;
