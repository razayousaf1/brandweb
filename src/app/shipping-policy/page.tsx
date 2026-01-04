import Link from "next/link";
import { ArrowLeft, Truck } from "lucide-react";

export default function ShippingPolicyPage() {
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
          <Truck className="w-16 h-16 mx-auto text-[#800000] mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Shipping Policy</h1>
          <p className="text-gray-600">Last Updated: December 27, 2024</p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Shipping Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              At Shahsawaar, we strive to deliver your royal accessories with care and efficiency. We ship across 
              Pakistan only.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Processing Time</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Orders are typically processed within:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li><strong>In-Stock Items:</strong> 5-7 business days</li>
              <li><strong>Pre-Order Items:</strong> As specified on product page</li>
              <li><strong>Customized Items:</strong> 5-7 business days</li>
            </ul>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded mt-4">
              <p className="text-gray-700">
                <strong>Note:</strong> Processing time does not include shipping time. Orders placed on weekends 
                or holidays will be processed on the next business day.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Shipping Rates & Delivery Time</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">🇵🇰 Domestic Shipping (Pakistan)</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Location</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Delivery Time</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 text-gray-700">Within Punjab</td>
                      <td className="px-6 py-4 text-gray-700">5-7 business days</td>
                      <td className="px-6 py-4 text-gray-700">PKR 200</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-gray-700">Outside of Punjab</td>
                      <td className="px-6 py-4 text-gray-700">5-7 business days</td>
                      <td className="px-6 py-4 text-gray-700">PKR 250</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded mb-6">
              <p className="text-gray-700 font-bold mb-2">🎁 FREE SHIPPING</p>
              <p className="text-gray-700">
                Enjoy free shipping on all orders over <strong>PKR 5,000</strong>
              </p>
            </div>

          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Order Tracking</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Once your order ships, you will receive:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>A confirmation email with tracking number</li>
              <li>Ability to track your package online</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Shipping Address</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Please ensure your shipping address is accurate and complete. We cannot be held responsible for 
              packages shipped to incorrect addresses provided by the customer.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded mt-4">
              <p className="text-gray-700">
                <strong>Important:</strong> Address changes cannot be made after the order has been processed. 
                Please double-check your address before completing your order.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Delivery Issues</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you experience any delivery issues, please contact us immediately:
            </p>
            
            <h3 className="text-lg font-bold text-gray-900 mb-3">Lost Packages</h3>
            <p className="text-gray-700 mb-4">
              If your tracking shows the package as delivered but you haven't received it, please:
            </p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
              <li>Check with neighbors or building security</li>
              <li>Verify the shipping address was correct</li>
              <li>Wait 24 hours (delivery confirmation may be premature)</li>
            </ol>

            <h3 className="text-lg font-bold text-gray-900 mb-3">Damaged Packages</h3>
            <p className="text-gray-700 mb-4">
              If your package arrives damaged, please:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Take photos of the damaged package and item</li>
              <li>Contact us within 48 hours</li>
              <li>Keep all packaging materials</li>
              <li>We will arrange a replacement or refund</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Holidays & Delays</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Please note that delivery times may be extended during:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>National holidays and festivals</li>
              <li>Peak shopping seasons (Eid, Wedding Season)</li>
              <li>Weather-related delays</li>
              <li>Carrier delays beyond our control</li>
            </ul>
          </section>

          <section className="mb-8 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📞 Need Help?</h2>
            <p className="text-gray-700 mb-4">
              For shipping inquiries or support, contact us:
            </p>
            <p className="text-gray-700 mb-2"><strong>Email:</strong> shahsawaarofficial25@gmail.com</p>
            <p className="text-gray-700 mb-2"><strong>WhatsApp:</strong> +92 314 8812243</p>
            <p className="text-gray-700"><strong>Support Hours:</strong> 12 AM - 6 PM (PKT), Monday - Saturday</p>
          </section>
        </div>
      </div>
    </div>
  );
}