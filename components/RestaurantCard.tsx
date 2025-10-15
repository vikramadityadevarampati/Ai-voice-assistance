
import React from 'react';
import { Restaurant } from '../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);


export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <div className="bg-base-200 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
      <img className="w-full h-48 object-cover" src={restaurant.imageUrl} alt={restaurant.name} />
      <div className="p-6">
        <div className="flex justify-between items-start">
            <h3 className="font-bold text-xl mb-1 text-base-content">{restaurant.name}</h3>
             <div className="flex items-center bg-yellow-500/20 text-yellow-400 rounded-full px-3 py-1 text-sm font-semibold">
                <StarIcon className="w-4 h-4 mr-1 text-yellow-400" />
                <span>{restaurant.rating}</span>
            </div>
        </div>
        <p className="text-gray-400 text-base">{restaurant.cuisine}</p>
      </div>
    </div>
  );
};
