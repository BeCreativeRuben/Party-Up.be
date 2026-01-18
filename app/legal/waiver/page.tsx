export default function WaiverPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Liability Waiver</h1>
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <p className="text-yellow-800">
          <strong>Legal Notice:</strong> This liability waiver is a placeholder and must be
          reviewed and approved by a legal professional to ensure compliance with Belgian law and
          proper risk management.
        </p>
      </div>

      <div className="prose prose-lg max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acknowledgment of Risk</h2>
          <p className="text-gray-700 mb-4">
            By renting equipment from Party-Up.be (Power Up BV), you acknowledge that you
            understand the risks associated with using party and event equipment. You agree to use
            all equipment safely and in accordance with provided instructions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Assumption of Risk</h2>
          <p className="text-gray-700 mb-4">
            You voluntarily assume all risks, known and unknown, associated with the use of rented
            equipment, including but not limited to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Injury to persons or damage to property</li>
            <li>Equipment malfunction or failure</li>
            <li>Weather-related incidents</li>
            <li>Improper setup or use of equipment</li>
            <li>Accidents during transport or use</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Release of Liability</h2>
          <p className="text-gray-700 mb-4">
            To the fullest extent permitted by law, you release, waive, and discharge Power Up BV
            (Party-Up.be), its owners, employees, and agents from any and all liability, claims,
            demands, actions, or causes of action arising out of or related to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Any loss, damage, or injury to person or property</li>
            <li>Use or misuse of rented equipment</li>
            <li>Equipment defects or malfunctions</li>
            <li>Failure to follow instructions or safety guidelines</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Indemnification</h2>
          <p className="text-gray-700 mb-4">
            You agree to indemnify and hold harmless Power Up BV (Party-Up.be) from any claims,
            damages, losses, costs, or expenses (including legal fees) arising from your use of
            rented equipment or violation of rental terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Proper Use and Safety</h2>
          <p className="text-gray-700 mb-4">
            You agree to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Read and follow all provided instructions and safety guidelines</li>
            <li>Use equipment only for its intended purpose</li>
            <li>Ensure proper setup and secure installation</li>
            <li>Supervise all users, especially children</li>
            <li>Inspect equipment before use and report any defects immediately</li>
            <li>Comply with all applicable laws and regulations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
          <p className="text-gray-700 mb-4">
            To the maximum extent permitted by law, Power Up BV&apos;s total liability for any
            claims shall not exceed the rental fee paid for the equipment. We are not liable for
            indirect, incidental, or consequential damages.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acknowledgment</h2>
          <p className="text-gray-700 mb-4">
            By making a reservation and accepting delivery of equipment, you acknowledge that you
            have read, understood, and agree to this Liability Waiver. If you do not agree, do not
            use the equipment and return it immediately.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact</h2>
          <p className="text-gray-700">
            For questions about this waiver, please contact us at{" "}
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

