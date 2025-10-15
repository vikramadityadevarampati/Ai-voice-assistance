
import React from 'react';
import { ParsedOrder } from '../types';

interface OrderConfirmationModalProps {
  order: ParsedOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({ order, isOpen, onClose, onConfirm }) => {
  if (!isOpen || !order) return null;
  
  const totalPrice = 19.99; // Dummy price for now

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
      <div className="bg-base-200 rounded-2xl shadow-2xl p-8 max-w-md w-full animate-fade-in-up">
        <h2 className="text-3xl font-bold mb-2 text-primary">Confirm Your Order</h2>
        <p className="mb-6 text-gray-400">Please review your order from <span className="font-semibold text-base-content">{order.restaurantName}</span>.</p>
        
        <div className="space-y-4 max-h-60 overflow-y-auto pr-2 mb-6">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between items-start bg-base-100 p-4 rounded-lg">
              <div>
                <p className="font-bold text-base-content">{item.quantity}x {item.name}</p>
                {item.notes && <p className="text-sm text-gray-400 italic mt-1">"{item.notes}"</p>}
              </div>
            </div>
          ))}
           {order.items.length === 0 && (
            <div className="text-center p-4 bg-base-100 rounded-lg">
                <p className="text-gray-400">I couldn't understand your order. Please try speaking again.</p>
            </div>
           )}
        </div>
        
        <div className="border-t border-gray-700 pt-6">
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-lg font-semibold text-gray-300 bg-gray-700 hover:bg-gray-600 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={order.items.length === 0}
              className="px-6 py-3 rounded-lg font-semibold text-white bg-primary hover:bg-orange-600 transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
