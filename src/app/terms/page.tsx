import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export default function TermsConditionsPage() {
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
          <FileText className="w-16 h-16 mx-auto text-[#800000] mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
          <p className="text-gray-600">Last Updated: December 27, 2024</p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By accessing and using Shahsawaar's website (shahsawaarofficial.store), you accept and agree to be 
              bound by the terms and provision of this agreement. If you do not agree to these Terms and Conditions, 
              please do not use our website or purchase our products.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use of Website</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree to use our website only for lawful purposes and in a way that does not infringe the rights 
              of, restrict or inhibit anyone else's use and enjoyment of the website.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Prohibited behavior includes:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Harassing or causing distress to any other user</li>
              <li>Using the website to transmit spam or malware</li>
              <li>Attempting to interfere with the website's functionality</li>
              <li>Collecting or harvesting information about other users</li>
              <li>Impersonating another person or entity</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Product Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We make every effort to display our products and their colors as accurately as possible. However, 
              we cannot guarantee that your computer monitor's display will accurately reflect the actual color 
              of the products.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>All product descriptions are approximate</li>
              <li>Weights and measurements may vary slightly</li>
              <li>Images are for illustration purposes</li>
              <li>We reserve the right to limit quantities</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Pricing and Payment</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              All prices are listed in Pakistani Rupees (PKR) and are subject to change without notice. We reserve 
              the right to modify or discontinue products without prior notification.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Prices include applicable taxes unless otherwise stated</li>
              <li>Payment must be made in full before order shipment</li>
              <li>We accept various payment methods as displayed at checkout</li>
              <li>Pricing errors may result in order cancellation</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Orders and Fulfillment</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you place an order, you are making an offer to purchase the product(s). We reserve the right 
              to accept or decline your order for any reason.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Order confirmation does not guarantee product availability</li>
              <li>We reserve the right to limit order quantities</li>
              <li>Orders may be cancelled due to pricing errors</li>
              <li>You will be notified if we cannot fulfill your order</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              All content on this website, including but not limited to text, graphics, logos, images, and software, 
              is the property of Shahsawaar and is protected by Pakistani and international copyright laws.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              You may not:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Reproduce, duplicate, or copy content from our website</li>
              <li>Use our brand name or logo without permission</li>
              <li>Create derivative works from our content</li>
              <li>Sell or distribute our content for commercial purposes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. User Accounts</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you create an account on our website, you are responsible for:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Maintaining the confidentiality of your account information</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
              <li>Ensuring your account information is accurate and current</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Warranty and Liability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our products come with a limited warranty for manufacturing defects. We are not liable for:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Damage caused by misuse or improper care</li>
              <li>Normal wear and tear</li>
              <li>Indirect, incidental, or consequential damages</li>
              <li>Loss of profits or business opportunities</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To the maximum extent permitted by law, Shahsawaar shall not be liable for any direct, indirect, 
              incidental, special, or consequential damages resulting from:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Use or inability to use our website or products</li>
              <li>Unauthorized access to your personal information</li>
              <li>Errors or omissions in website content</li>
              <li>Interruption or cessation of our services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms and Conditions are governed by and construed in accordance with the laws of Pakistan. 
              Any disputes arising from these terms shall be subject to the exclusive jurisdiction of Pakistani courts.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to update or modify these Terms and Conditions at any time without prior notice. 
              Your continued use of the website following any changes constitutes acceptance of those changes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Severability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If any provision of these Terms and Conditions is found to be invalid or unenforceable, the remaining 
              provisions shall continue in full force and effect.
            </p>
          </section>

          <section className="mb-8 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📧 Contact Information</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <p className="text-gray-700 mb-2"><strong>Company:</strong> Shahsawaar Official</p>
            <p className="text-gray-700 mb-2"><strong>Email:</strong> shahsawaarofficial25@gmail.com</p>
            <p className="text-gray-700 mb-2"><strong>Whatsapp:</strong> +92 314 8812243</p>
            <p className="text-gray-700 mb-2"><strong>Website:</strong> shahsawaarofficial.store</p>
            <p className="text-gray-700"><strong>Address:</strong> House no 414, street no 19, eden lane villas 2, Lahore, Pakistan</p>
          </section>

          <div className="bg-[#800000] text-white p-6 rounded-lg mt-8">
            <p className="text-center font-semibold">
              By using our website and services, you acknowledge that you have read, understood, 
              and agree to be bound by these Terms and Conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}