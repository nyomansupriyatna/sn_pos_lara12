import { Link, usePage } from '@inertiajs/react';
import { dashboard, login } from '@/routes';
import type { SharedData } from '@/types';

export default function POSLanding(
{canRegister = true,
}: {
    canRegister?: boolean;
}) {

const { auth } = usePage<SharedData>().props;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white/10 backdrop-blur-md shadow-lg">
        <Link href={dashboard()} className="flex items-center gap-3 hover:cursor-pointer">
          <div className="bg-white text-indigo-800 font-bold text-2xl rounded-full shadow-md">
              <img src="storage/images/sn-logo.png" alt="Logo SN"  className='h-12'/>
          </div>
          <h1 className="text-xl font-semibold tracking-wide">SN Point Of Sales</h1>
        </Link>
        <div className="space-x-6 hidden md:flex">
          <a href="/properties" className="hover:text-yellow-300 transition">Billing</a>
          <a href="#" className="hover:text-yellow-300 transition">Transaksi</a>
          <a href="#" className="hover:text-yellow-300 transition">Laporan</a>
        </div>
        
        {auth.user ? (
            <Link
                href={dashboard()}
                className="bg-yellow-400 hover:bg-yellow-300 text-indigo-900 font-semibold px-5 py-2 rounded-2xl shadow-md transition"
            >
                Dashboard
            </Link>
        ) : (
            <>

                <Link 
                    href={login()}
                    className="bg-yellow-400 hover:bg-yellow-300 text-indigo-900 font-semibold px-5 py-2 rounded-2xl shadow-md transition">
                    Login
                </Link> 

                {/* {canRegister && (
                    <Link
                        href={register()}
                        className="bg-yellow-400 hover:bg-yellow-300 text-indigo-900 font-semibold px-5 py-2 rounded-2xl shadow-md transition"
                    >
                        Register
                    </Link>
                )} */}
            </>
        )}
      </nav>

      {/* Hero Section */}
      <div className="flex flex-1 items-center justify-center px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl w-full">
          {/* Text Section */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Sistem Point Of Sales Mudah & Cepat
            </h2>
            <p className="text-lg text-gray-200">
              Kelola penjualan dan laporan penjualan dengan cepat dan mudah.
            </p>
           
          </div>

          {/* Image Section */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
              alt="POS Illustration"
              className="rounded-3xl shadow-2xl border border-white/20"
            />
            <div className="absolute -bottom-6 -left-6 bg-yellow-400 text-indigo-900 px-6 py-4 rounded-2xl shadow-xl font-bold">
              Fast • Secure • Reliable
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 bg-white/10 backdrop-blur-md text-sm">
        © {new Date().getFullYear()} SN Point Of Sales. All rights reserved.
      </footer>
    </div>
  );
}
