'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Alert from '@/components/Alert';
import Loading from '@/components/Loading';
import { bookingService } from '@/services/bookingService';
import { getAuthToken } from '@/utils/api';
import { formatDate, formatCurrency, calculateDays } from '@/utils/helpers';

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!getAuthToken()) {
      router.push('/auth/login');
      return;
    }

    const fetchBookings = async () => {
      try {
        const response = await bookingService.getUserBookings();
        setBookings(response.data || []);
      } catch (err) {
        setError(err.message || 'Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [router]);

  const handleCancel = async (bookingId) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await bookingService.cancelBooking(bookingId);
      setBookings((prev) => prev.map((b) => (b._id === bookingId ? { ...b, status: 'cancelled' } : b)));
    } catch (err) {
      setError(err.message || 'Failed to cancel booking');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      {error && <Alert type="error" message={error} />}

      {bookings.length > 0 ? (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-600 text-sm">Car</p>
                  <p className="text-lg font-semibold">{booking.carId?.name}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Booking Status</p>
                  <span
                    className={`px-2 py-1 rounded text-sm font-semibold ${
                      booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-700'
                        : booking.status === 'cancelled'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {booking.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-600 text-sm">From</p>
                  <p className="font-semibold">{formatDate(booking.startDate)}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">To</p>
                  <p className="font-semibold">{formatDate(booking.endDate)}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-gray-600 text-sm">Days</p>
                  <p className="font-semibold">{calculateDays(booking.startDate, booking.endDate)}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total Price</p>
                  <p className="font-semibold text-blue-600">{formatCurrency(booking.totalPrice)}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Pickup Location</p>
                  <p className="font-semibold">{booking.pickupLocation || 'Not specified'}</p>
                </div>
              </div>

              {booking.status === 'pending' && (
                <button
                  onClick={() => handleCancel(booking._id)}
                  className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No bookings yet</p>
          <a href="/cars" className="text-blue-600 font-semibold">
            Browse cars and make your first booking
          </a>
        </div>
      )}
    </div>
  );
}
