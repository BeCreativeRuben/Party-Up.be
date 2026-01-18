export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <p className="text-yellow-800">
          <strong>Legal Notice:</strong> These terms and conditions are placeholders and must be
          reviewed and approved by a legal professional before the website goes live. Power Up BV
          should consult with a lawyer to ensure compliance with Belgian law.
        </p>
      </div>

      <div className="prose prose-lg max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. General Information</h2>
          <p className="text-gray-700 mb-4">
            These Terms and Conditions govern the rental of party and event equipment from Power Up
            BV, trading as Party-Up.be. By making a reservation, you agree to these terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Rental Agreement</h2>
          <p className="text-gray-700 mb-4">
            A rental agreement is formed when Party-Up.be confirms your booking request in writing
            (email confirmation). The agreement includes the rental period, items, pricing, and
            terms as specified in the confirmation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Pricing and Payment</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>All prices are in EUR and include VAT where applicable</li>
            <li>Prices are per rental period unless otherwise stated</li>
            <li>A security deposit may be required for certain items</li>
            <li>Payment terms will be specified in your booking confirmation</li>
            <li>Late payment may result in cancellation of the booking</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Rental Period</h2>
          <p className="text-gray-700 mb-4">
            Standard rental period is Friday evening pickup with Sunday evening return. Equipment
            must be returned at the agreed time and location. Late returns may incur additional
            charges.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Equipment Condition</h2>
          <p className="text-gray-700 mb-4">
            Equipment is provided in good, clean condition. The renter is responsible for returning
            equipment in the same condition, normal wear and tear excepted. Equipment must be
            cleaned before return unless cleaning service is included.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Damage and Loss</h2>
          <p className="text-gray-700 mb-4">
            The renter is responsible for any damage, loss, or theft of equipment during the rental
            period. Repair or replacement costs will be deducted from the security deposit or
            invoiced separately.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Cancellations</h2>
          <p className="text-gray-700 mb-4">
            Cancellation terms vary based on notice period. Please refer to your booking
            confirmation for specific cancellation policies. Cancellations must be made in writing.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Liability</h2>
          <p className="text-gray-700 mb-4">
            Party-Up.be is not liable for any injury, damage, or loss resulting from the use of
            rented equipment. Renters must use equipment safely and in accordance with provided
            instructions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Force Majeure</h2>
          <p className="text-gray-700 mb-4">
            Party-Up.be is not liable for failure to perform due to circumstances beyond reasonable
            control, including but not limited to natural disasters, government actions, or
            equipment unavailability.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Governing Law</h2>
          <p className="text-gray-700 mb-4">
            These terms are governed by Belgian law. Any disputes will be subject to the
            jurisdiction of Belgian courts.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact</h2>
          <p className="text-gray-700">
            For questions about these terms, please contact us at{" "}
            <a href="mailto:info@party-up.be" className="text-blue-600 hover:underline">
              info@party-up.be
            </a>
            .
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

