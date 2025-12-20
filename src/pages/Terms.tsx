import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { Footer } from '../components/Footer'

export function Terms() {
  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24">
        {/* Header */}
        <motion.div
          className="mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        >
          <Link
            to="/"
            className="inline-block text-black/60 hover:text-black transition-colors text-sm sm:text-base font-sans mb-6"
          >
            ← Back to home
          </Link>
          <h1 className="font-serif text-black text-3xl sm:text-4xl md:text-5xl tracking-wide mb-4">
            Terms of Service
          </h1>
          <p className="font-serif italic text-black/70 text-sm sm:text-base">
            Last updated: December 2025
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          className="prose prose-lg max-w-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
        >
          <div className="space-y-8 sm:space-y-10">
            {/* Section */}
            <section>
              <h2 className="font-serif text-black text-xl sm:text-2xl md:text-3xl tracking-wide mb-4">
                Agreement to Terms
              </h2>
              <p className="font-sans text-black/80 leading-relaxed text-sm sm:text-base md:text-lg">
                By accessing or using GetMotion's services, you agree to be bound by these Terms of Service. 
                If you disagree with any part of these terms, you may not access or use our services.
              </p>
            </section>

            {/* Section */}
            <section>
              <h2 className="font-serif text-black text-xl sm:text-2xl md:text-3xl tracking-wide mb-4">
                Description of Service
              </h2>
              <p className="font-sans text-black/80 leading-relaxed text-sm sm:text-base md:text-lg">
                GetMotion provides motion video creation services. We transform your scripts, audio recordings, 
                and other materials into professional motion videos. Our service includes video production, 
                editing, and delivery of finished video content.
              </p>
            </section>

            {/* Section */}
            <section>
              <h2 className="font-serif text-black text-xl sm:text-2xl md:text-3xl tracking-wide mb-4">
                User Responsibilities
              </h2>
              <p className="font-sans text-black/80 leading-relaxed text-sm sm:text-base md:text-lg mb-4">
                You agree to:
              </p>
              <ul className="font-sans text-black/80 leading-relaxed text-sm sm:text-base md:text-lg space-y-2 ml-6 list-disc">
                <li>Provide accurate, current, and complete information when using our services</li>
                <li>Ensure you have all necessary rights and permissions for any content you submit</li>
                <li>Not submit content that is illegal, harmful, threatening, abusive, or violates any third-party rights</li>
                <li>Not use our services for any unlawful purpose or in violation of any laws</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
            </section>

            {/* Section */}
            <section>
              <h2 className="font-serif text-black text-xl sm:text-2xl md:text-3xl tracking-wide mb-4">
                Content Ownership and Rights
              </h2>
              <p className="font-sans text-black/80 leading-relaxed text-sm sm:text-base md:text-lg mb-4">
                You retain ownership of all content you submit to us. By submitting content, you grant us a 
                license to use, reproduce, modify, and create derivative works from your content solely for the 
                purpose of providing our services to you.
              </p>
              <p className="font-sans text-black/80 leading-relaxed text-sm sm:text-base md:text-lg">
                Upon delivery of the finished video, you receive full ownership and usage rights to the final 
                video content, subject to any third-party rights in materials you provided.
              </p>
            </section>

            {/* Section */}
            <section>
              <h2 className="font-serif text-black text-xl sm:text-2xl md:text-3xl tracking-wide mb-4">
                Payment Terms
              </h2>
              <p className="font-sans text-black/80 leading-relaxed text-sm sm:text-base md:text-lg mb-4">
                Payment terms are as follows:
              </p>
              <ul className="font-sans text-black/80 leading-relaxed text-sm sm:text-base md:text-lg space-y-2 ml-6 list-disc">
                <li>Payment is required before we begin work on your project, unless otherwise agreed</li>
                <li>All prices are as stated at the time of order and are subject to change for future orders</li>
                <li>Refunds are handled on a case-by-case basis and may be subject to our refund policy</li>
                <li>You are responsible for any taxes applicable to your purchase</li>
              </ul>
            </section>

            {/* Section */}
            <section>
              <h2 className="font-serif text-black text-xl sm:text-2xl md:text-3xl tracking-wide mb-4">
                Delivery and Revisions
              </h2>
              <p className="font-sans text-black/80 leading-relaxed text-sm sm:text-base md:text-lg">
                We will deliver your finished video within the timeframe specified at the time of order. 
                Delivery times may vary based on project complexity and current workload. We include a 
                reasonable number of revisions in our standard service. Additional revisions may incur 
                additional charges.
              </p>
            </section>

            {/* Section */}
            <section>
              <h2 className="font-serif text-black text-xl sm:text-2xl md:text-3xl tracking-wide mb-4">
                Intellectual Property
              </h2>
              <p className="font-sans text-black/80 leading-relaxed text-sm sm:text-base md:text-lg">
                All intellectual property rights in our service, including but not limited to our website, 
                software, processes, and methodologies, remain the exclusive property of GetMotion. You may 
                not copy, modify, distribute, or create derivative works based on our service without our 
                express written permission.
              </p>
            </section>

            {/* Section */}
            <section>
              <h2 className="font-serif text-black text-xl sm:text-2xl md:text-3xl tracking-wide mb-4">
                Limitation of Liability
              </h2>
              <p className="font-sans text-black/80 leading-relaxed text-sm sm:text-base md:text-lg">
                To the maximum extent permitted by law, GetMotion shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages, or any loss of profits or revenues, 
                whether incurred directly or indirectly, or any loss of data, use, goodwill, or other 
                intangible losses resulting from your use of our services.
              </p>
            </section>

            {/* Section */}
            <section>
              <h2 className="font-serif text-black text-xl sm:text-2xl md:text-3xl tracking-wide mb-4">
                Indemnification
              </h2>
              <p className="font-sans text-black/80 leading-relaxed text-sm sm:text-base md:text-lg">
                You agree to indemnify and hold harmless GetMotion, its officers, directors, employees, and 
                agents from any claims, damages, losses, liabilities, and expenses (including legal fees) 
                arising out of or relating to your use of our services, your content, or your violation of 
                these Terms of Service.
              </p>
            </section>

            {/* Section */}
            <section>
              <h2 className="font-serif text-black text-xl sm:text-2xl md:text-3xl tracking-wide mb-4">
                Termination
              </h2>
              <p className="font-sans text-black/80 leading-relaxed text-sm sm:text-base md:text-lg">
                We reserve the right to terminate or suspend your access to our services immediately, without 
                prior notice or liability, for any reason, including if you breach these Terms of Service. 
                Upon termination, your right to use the service will cease immediately.
              </p>
            </section>

            {/* Section */}
            <section>
              <h2 className="font-serif text-black text-xl sm:text-2xl md:text-3xl tracking-wide mb-4">
                Changes to Terms
              </h2>
              <p className="font-sans text-black/80 leading-relaxed text-sm sm:text-base md:text-lg">
                We reserve the right to modify or replace these Terms of Service at any time. If a revision 
                is material, we will provide at least 30 days notice prior to any new terms taking effect. 
                What constitutes a material change will be determined at our sole discretion.
              </p>
            </section>

            {/* Section */}
            <section>
              <h2 className="font-serif text-black text-xl sm:text-2xl md:text-3xl tracking-wide mb-4">
                Governing Law
              </h2>
              <p className="font-sans text-black/80 leading-relaxed text-sm sm:text-base md:text-lg">
                These Terms of Service shall be governed by and construed in accordance with the laws of 
                France, without regard to its conflict of law provisions.
              </p>
            </section>

            {/* Section */}
            <section>
              <h2 className="font-serif text-black text-xl sm:text-2xl md:text-3xl tracking-wide mb-4">
                Contact Information
              </h2>
              <p className="font-sans text-black/80 leading-relaxed text-sm sm:text-base md:text-lg">
                If you have any questions about these Terms of Service, please contact us at{' '}
                <a
                  href="mailto:emmanuel@getmotion.video"
                  className="text-black/70 hover:text-black transition-colors underline"
                >
                  emmanuel@getmotion.video
                </a>
                .
              </p>
            </section>
          </div>
        </motion.div>
      </div>
      <Footer />
    </main>
  )
}

