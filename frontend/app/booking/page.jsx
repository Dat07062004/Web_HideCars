'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Alert from '@/components/Alert';
import { bookingService } from '@/services/bookingService';
import { carService } from '@/services/carService';
import { calculateDays, calculateTotalPrice, formatCurrency, formatDate } from '@/utils/helpers';
import { getAuthToken } from '@/utils/api';

function BookingPageContent() {
  const searchParams = useSearchParams();
  const carId = searchParams.get('carId');
  const router = useRouter();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    carId,
    startDate: '',
    endDate: '',
    pickupLocation: '',
    dropoffLocation: '',
    specialRequests: '',
  });
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (!getAuthToken()) {
      router.push('/auth/login');
      return;
    }

    if (carId) {
      const fetchCar = async () => {
        try {
          const response = await carService.getCarById(carId);
          setCar(response.data);
        } catch (err) {
          setError('Failed to load car details');
        }
      };
      fetchCar();
    }
  }, [carId, router]);

  useEffect(() => {
    if (formData.startDate && formData.endDate && car) {
      const price = calculateTotalPrice(car.pricePerDay, formData.startDate, formData.endDate);
      setTotalPrice(price);
    }
  }, [formData.startDate, formData.endDate, car]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await bookingService.createBooking(formData);
      setSuccess('Booking created successfully!');
      setTimeout(() => router.push('/my-bookings'), 1500);
    } catch (err) {
      setError(err.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Book a Car</h1>

      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}

      {car && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">{car.name}</h2>
            <p className="text-2xl font-bold text-blue-600">{formatCurrency(car.pricePerDay)}/day</p>
          </div>
          <p className="text-gray-600">{car.description}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Pickup Location</label>
            <input
              type="text"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              placeholder="Enter pickup location"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Dropoff Location</label>
            <input
              type="text"
              name="dropoffLocation"
              value={formData.dropoffLocation}
              onChange={handleChange}
              placeholder="Enter dropoff location"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Special Requests</label>
          <textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            placeholder="Any special requests?"
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {totalPrice > 0 && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-700">
              Days: {calculateDays(formData.startDate, formData.endDate)}
            </p>
            <p className="text-2xl font-bold text-blue-600">
              Total: {formatCurrency(totalPrice)}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !car}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Booking...' : 'Complete Booking'}
        </button>
      </form>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingPageContent />
    </Suspense>
  );
}
