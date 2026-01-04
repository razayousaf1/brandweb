import Link from 'next/link';

export default function OrderConfirmedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <svg 
              className="w-12 h-12 text-green-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Order Confirmed! 🎉
        </h1>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          Thank you for confirming your order! We'll start processing it right away and keep you updated via email.
        </p>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>What's next?</strong><br />
            We'll prepare your order and send you tracking information once it ships.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">

          
          <Link 
            href="/"
            className="block w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-all"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Contact Info */}
        <p className="text-xs text-gray-500 mt-6">
          Questions? Email us at{' '}
          <a href="mailto:shahsawaarofficial25@gmail.com" className="text-blue-600 hover:underline">
            shahsawaarofficial@gmail.com or whatsapp us at: +923148812243
          </a>
        </p>
      </div>
    </div>
  );
}