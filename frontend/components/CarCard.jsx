import Link from 'next/link';
import { formatCurrency } from '@/utils/helpers';
import { FiStar, FiMapPin } from 'react-icons/fi';

export default function CarCard({ car }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      {/* Image */}
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        <img
          src={car.images?.[0] || 'https://via.placeholder.com/400x300?text=Car'}
          alt={car.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{car.name}</h3>

        <div className="flex items-center justify-between my-2">
          <span className="text-sm text-gray-500 capitalize">{car.category}</span>
          {car.rating && (
            <span className="flex items-center gap-1 text-yellow-500">
              <FiStar size={16} />
              {car.rating}
            </span>
          )}
        </div>

        <p className="text-gray-600 text-sm line-clamp-2">{car.description}</p>

        <div className="my-3 text-sm text-gray-600">
          <p>
            ✓ Seats: {car.seatingCapacity} | {car.transmission} | {car.fuelType}
          </p>
        </div>

        <div className="flex justify-between items-center mb-3">
          <span className="text-2xl font-bold text-blue-600">
            {formatCurrency(car.pricePerDay)}/day
          </span>
          <span
            className={`text-xs px-2 py-1 rounded ${
              car.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {car.available ? 'Available' : 'Unavailable'}
          </span>
        </div>

        <Link
          href={`/cars/${car._id}`}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-center block"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
