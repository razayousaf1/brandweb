'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Redirect to orders page after 5 seconds
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/orders');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        {/* Success Animation */}
        <div className="mb-6">
          <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Payment Successful! 🎉
        </h1>
        
        <p className="text-gray-600 mb-2 leading-relaxed">
          Your payment has been processed successfully.
        </p>
        
        {orderId && (
          <p className="text-sm text-gray-500 mb-6">
            Order ID: <span className="font-mono font-semibold">{orderId}</span>
          </p>
        )}

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <Package className="w-8 h-8 mx-auto mb-2 text-blue-600" />
          <p className="text-sm text-blue-800">
            <strong>What's next?</strong><br />
            We're preparing your order for shipment. You'll receive a confirmation email with tracking details soon.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button 
            onClick={() => router.push('/orders')}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            View My Orders
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button 
            onClick={() => router.push('/')}
            className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-all"
          >
            Continue Shopping
          </button>
        </div>

        {/* Auto Redirect Notice */}
        <p className="text-xs text-gray-400 mt-6">
          Redirecting to your orders in {countdown} seconds...
        </p>

        {/* Contact Info */}
        <p className="text-xs text-gray-500 mt-4">
          Questions? Email us at{' '}
          <a href="mailto:orders@shahsawaarofficial.store" className="text-blue-600 hover:underline">
            orders@shahsawaarofficial.store
          </a>
        </p>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}