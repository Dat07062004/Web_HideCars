import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Car Booking System',
  description: 'Book your favorite car today!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
        <footer className="bg-gray-900 text-white py-6 text-center">
          <p>&copy; 2024 CarBook. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
