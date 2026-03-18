'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { authService } from '@/services/authService';
import { getAuthToken } from '@/utils/api';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(!!getAuthToken());
  }, []);

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    router.push('/auth/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          🚗 CarBook
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link href="/cars" className="text-gray-700 hover:text-blue-600">
            Browse Cars
          </Link>
          {isLoggedIn ? (
            <>
              <Link href="/my-bookings" className="text-gray-700 hover:text-blue-600">
                My Bookings
              </Link>
              <Link href="/profile" className="text-gray-700 hover:text-blue-600">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
              <Link href="/auth/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 p-4 flex flex-col gap-3">
          <Link href="/cars" className="text-gray-700 hover:text-blue-600">
            Browse Cars
          </Link>
          {isLoggedIn ? (
            <>
              <Link href="/my-bookings" className="text-gray-700 hover:text-blue-600">
                My Bookings
              </Link>
              <Link href="/profile" className="text-gray-700 hover:text-blue-600">
                Profile
              </Link>
              <button onClick={handleLogout} className="text-red-500 text-left hover:text-red-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
              <Link href="/auth/register" className="bg-blue-600 text-white px-4 py-2 rounded">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
