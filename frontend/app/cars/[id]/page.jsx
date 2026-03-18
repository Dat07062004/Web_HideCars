'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Loading from '@/components/Loading';
import Alert from '@/components/Alert';
import { carService } from '@/services/carService';
import { reviewService } from '@/services/reviewService';
import { formatCurrency } from '@/utils/helpers';
import { FiStar, FiArrowLeft } from 'react-icons/fi';

export default function CarDetailPage() {
  const params = useParams();
  const carId = params.id;
  const router = useRouter();

  const [car, setCar] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carResponse = await carService.getCarById(carId);
        setCar(carResponse.data);

        const reviewsResponse = await reviewService.getCarReviews(carId);
        setReviews(reviewsResponse.data || []);
      } catch (err) {
        setError(err.message || 'Failed to load car details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [carId]);

  const handleBooking = () => {
    router.push(`/booking?carId=${carId}`);
  };

  if (loading) return <Loading />;
  if (!car) return <div className="text-center py-12">Car not found</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <FiArrowLeft /> Back
      </button>

      {error && <Alert type="error" message={error} onClose={() => setError('')} />}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Image */}
        <div>
          <img
            src={car.images?.[0] || 'https://via.placeholder.com/500x400?text=Car'}
            alt={car.name}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-4xl font-bold mb-2">{car.name}</h1>
          <p className="text-gray-600 mb-4 capitalize">{car.category} • {car.transmission} • {car.fuelType}</p>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-3xl font-bold text-blue-600 mb-2">
              {formatCurrency(car.pricePerDay)}/day
            </p>
            <p className="text-gray-600">{car.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-100 p-3 rounded">
              <p className="text-gray-600 text-sm">Seating Capacity</p>
              <p className="text-xl font-semibold">{car.seatingCapacity} Seats</p>
            </div>
            <div className="bg-gray-100 p-3 rounded">
              <p className="text-gray-600 text-sm">Status</p>
              <p className={`text-xl font-semibold ${car.available ? 'text-green-600' : 'text-red-600'}`}>
                {car.available ? 'Available' : 'Unavailable'}
              </p>
            </div>
          </div>

          {car.features && car.features.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Features:</h3>
              <ul className="grid grid-cols-2 gap-2">
                {car.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-green-600">✓</span> {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={handleBooking}
            disabled={!car.available}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {car.available ? 'Book Now' : 'Not Available'}
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Reviews ({reviews.length})</h2>

        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{review.userId?.name}</p>
                    <div className="flex items-center gap-1 text-yellow-500">
                      {[...Array(review.rating)].map((_, i) => (
                        <FiStar key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700 mt-2">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
}
