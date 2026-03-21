'use client';

import { useState, useEffect } from 'react';
import CarCard from '@/components/CarCard';
import Loading from '@/components/Loading';
import Alert from '@/components/Alert';
import { carService } from '@/services/carService';

export default function CarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    priceMin: '',
    priceMax: '',
  });

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const response = await carService.getAllCars(filters);
        setCars(response.data || []);
      } catch (err) {
        setError(err.message || 'Failed to load cars');
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(fetchCars, 500);
    return () => clearTimeout(timeout);
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  if (loading && cars.length === 0) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Browse Cars</h1>

      {error && <Alert type="error" message={error} onClose={() => setError('')} />}

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid md:grid-cols-4 gap-4">
          <input
            type="text"
            name="search"
            placeholder="Search by name..."
            value={filters.search}
            onChange={handleFilterChange}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />

          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">All categories</option>
            <option value="economy">Economy</option>
            <option value="comfort">Comfort</option>
            <option value="premium">Premium</option>
            <option value="luxury">Luxury</option>
            <option value="email">Email</option>
          </select>

          <input
            type="number"
            name="priceMin"
            placeholder="Min Price"
            value={filters.priceMin}
            onChange={handleFilterChange}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />

          <input
            type="number"
            name="priceMax"
            placeholder="Max Price"
            value={filters.priceMax}
            onChange={handleFilterChange}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      {/* Cars Grid */}
      {cars.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No cars found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}
