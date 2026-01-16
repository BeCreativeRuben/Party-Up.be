export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <p className="text-yellow-800">
          <strong>Legal Notice:</strong> This privacy policy is a placeholder and must be
          reviewed and approved by a legal professional to ensure compliance with GDPR and Belgian
          data protection laws.
        </p>
      </div>

      <div className="prose prose-lg max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
          <p className="text-gray-700 mb-4">
            Power Up BV, trading as Party-Up.be (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;),
            is committed to protecting your privacy. This Privacy Policy explains how we collect,
            use, and protect your personal information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
          <p className="text-gray-700 mb-4">We may collect the following information:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Name and contact information (email, phone, address)</li>
            <li>Event details (date, location, number of guests)</li>
            <li>Payment information (processed securely through payment providers)</li>
            <li>Communication records (emails, messages)</li>
            <li>Website usage data (cookies, analytics)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
          <p className="text-gray-700 mb-4">We use your information to:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Process and manage your bookings</li>
            <li>Communicate with you about your reservations</li>
            <li>Send booking confirmations and updates</li>
            <li>Process payments</li>
            <li>Improve our services</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Sharing</h2>
          <p className="text-gray-700 mb-4">
            We do not sell your personal information. We may share your information with:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Service providers (payment processors, email services)</li>
            <li>Legal authorities when required by law</li>
            <li>Business partners only with your explicit consent</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
          <p className="text-gray-700 mb-4">
            We implement appropriate technical and organizational measures to protect your personal
            information against unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
          <p className="text-gray-700 mb-4">Under GDPR, you have the right to:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Access your personal data</li>
            <li>Rectify inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Data portability</li>
            <li>Withdraw consent at any time</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Cookies</h2>
          <p className="text-gray-700 mb-4">
            Our website may use cookies to improve user experience and analyze website traffic. You
            can control cookie settings through your browser preferences.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Data Retention</h2>
          <p className="text-gray-700 mb-4">
            We retain your personal information only for as long as necessary to fulfill the
            purposes outlined in this policy, unless a longer retention period is required by law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Us</h2>
          <p className="text-gray-700 mb-4">
            For questions about this Privacy Policy or to exercise your rights, please contact us
            at:
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong>{" "}
            <a href="mailto:info@party-up.be" className="text-primary-600 hover:underline">
              info@party-up.be
            </a>
          </p>
        </section>
      </div>

      <div className="mt-8 text-sm text-gray-600">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>Power Up BV - Party-Up.be</p>
      </div>
    </div>
  );
}

