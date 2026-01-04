'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { XCircle, RefreshCw, Home, HelpCircle } from 'lucide-react';

function PaymentFailedContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reason = searchParams.get('reason');
  const orderId = searchParams.get('orderId');

  const commonReasons: { [key: string]: string } = {
    'insufficient_funds': 'Your card has insufficient funds.',
    'card_declined': 'Your card was declined by the bank.',
    'expired_card': 'Your card has expired.',
    'invalid_card': 'Invalid card details provided.',
    'payment_timeout': 'Payment session timed out.',
    'user_cancelled': 'You cancelled the payment.',
  };

  const displayReason = reason && commonReasons[reason] 
    ? commonReasons[reason] 
    : reason || 'Payment could not be processed.';

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        {/* Error Icon */}
        <div className="mb-6">
          <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
            <XCircle className="w-16 h-16 text-red-500" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Payment Failed
        </h1>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          {displayReason}
        </p>

        {orderId && (
          <p className="text-sm text-gray-500 mb-6">
            Order ID: <span className="font-mono font-semibold">{orderId}</span>
          </p>
        )}

        {/* Info Box */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <HelpCircle className="w-8 h-8 mx-auto mb-2 text-orange-600" />
          <p className="text-sm text-orange-800">
            <strong>What should I do?</strong><br />
            Your order has been saved. You can try paying again or choose a different payment method.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button 
            onClick={() => router.push('/checkout')}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          
          <button 
            onClick={() => router.push('/')}
            className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Go to Homepage
          </button>
        </div>

        {/* Common Issues */}
        <div className="mt-8 text-left bg-gray-50 rounded-lg p-4">
          <p className="text-xs font-semibold text-gray-700 mb-2">Common Issues:</p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Check your card has sufficient balance</li>
            <li>• Verify card details are correct</li>
            <li>• Ensure your card supports online payments</li>
            <li>• Try using a different card</li>
            <li>• Or choose Cash on Delivery instead</li>
          </ul>
        </div>

        {/* Contact Info */}
        <p className="text-xs text-gray-500 mt-6">
          Need help? Email us at{' '}
          <a href="mailto:orders@shahsawaarofficial.store" className="text-blue-600 hover:underline">
            orders@shahsawaarofficial.store
          </a>
        </p>
      </div>
    </div>
  );
}

export default function PaymentFailedPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <PaymentFailedContent />
    </Suspense>
  );
}