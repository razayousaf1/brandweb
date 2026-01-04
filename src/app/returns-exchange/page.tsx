import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";

export default function ReturnsExchangePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-[#800000] hover:text-red-900 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <RefreshCw className="w-16 h-16 mx-auto text-[#800000] mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Returns & Exchange Policy</h1>
          <p className="text-gray-600">Last Updated: December 27, 2024</p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Our Commitment</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              At Shahsawaar, we want you to be completely satisfied with your purchase. If you're not happy with 
              your order, we're here to help with returns and exchanges according to the terms below.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Return Window</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have <strong>7 days</strong> from the date of delivery to return or exchange your item(s). 
              After 7 days, unfortunately we cannot offer you a refund or exchange.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Eligibility for Returns</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To be eligible for a return, your item must be:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Unused and in the same condition that you received it</li>
              <li>In the original packaging with all tags attached</li>
              <li>Accompanied by the receipt or proof of purchase</li>
              <li>Free from scratches, marks, or signs of wear</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Non-Returnable Items</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The following items cannot be returned:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Customized or personalized jewelry</li>
              <li>Items that have been worn or used</li>
              <li>Items without original tags or packaging</li>
              <li>Sale or clearance items (unless defective)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. How to Initiate a Return</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To start a return, please follow these steps:
            </p>
            <ol className="list-decimal list-inside text-gray-700 space-y-3 mb-4">
              <li>Contact our customer service team within 7 days of delivery</li>
              <li>Provide your order number and reason for return</li>
              <li>Wait for our team to send you return instructions</li>
              <li>Pack the item securely in its original packaging</li>
              <li>Ship the item back to the address provided</li>
            </ol>
            <div className="bg-gray-50 p-6 rounded-lg mt-4">
              <p className="text-gray-700 mb-2"><strong>Contact us at:</strong></p>
              <p className="text-gray-700 mb-2">Email: shahsawaarofficial25@gmail.com</p>
              <p className="text-gray-700">Phone: +92 314 8812243</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Exchange Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We offer exchanges for different sizes or styles within 7 days of delivery. The item must meet 
              all return eligibility requirements. Exchange shipping costs may apply depending on the reason 
              for exchange.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Refund Process</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Once we receive your returned item, we will inspect it and notify you of the approval or rejection 
              of your refund. If approved, your refund will be processed within <strong>5-7 business days </strong> 
              to your original payment method.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Shipping Costs</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li><strong>Defective Items:</strong> We cover return shipping costs</li>
              <li><strong>Change of Mind:</strong> Customer is responsible for return shipping</li>
              <li><strong>Wrong Item Sent:</strong> We cover all shipping costs</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Damaged or Defective Items</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you receive a damaged or defective item, please contact us immediately with photos of the damage. 
              We will arrange for a replacement or full refund at no cost to you.
            </p>
          </section>

          <section className="mb-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
            <h3 className="text-xl font-bold text-gray-900 mb-3">📦 Return Address</h3>
            <p className="text-gray-700">
              Please contact us for the return address before shipping any items back. 
              Do not send items without prior authorization.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}