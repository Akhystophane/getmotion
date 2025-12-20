import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { Footer } from '../components/Footer'

export function PrivacyPolicy() {
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
            Privacy Policy
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
                Introduction
              </h2>
              <p className="font-sans text-black/80 leading-relaxed text-sm sm:text-base md:text-lg">
                At GetMotion, we respect your privacy and are committed to protecting your personal data. 
                This privacy policy explains how we collect, use, and safeguard your information when you 
                use our service.
              </p>
            </section>

            {/* Section */}
            <section>
              <h2 className="font-serif text-black text-xl sm:text-2xl md:text-3xl tracking-wide mb-4">
                Information We Collect
              </h2>
              <p className="font-sans text-black/80 leading-relaxed text-sm sm:text-base md:text-lg mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="font-sans text-black/80 leading-relaxed text-sm sm:text-base md:text-lg space-y-2 ml-6 list-disc">
                <li>Contact information (name, email address)</li>
                <li>Content you submit (scripts, audio files, images, and other materials)</li>
                <li>Payment information (processed securely through third-party payment processors)</li>
                <li>Communication records (emails, messages, and other correspondence)</li>
              </ul>
            </section>

            {/* Section */}
            <section>
              <h2 className="font-serif text-black text-xl sm:text-2xl md:text-3xl tracking-wide mb-4">
                How We Use Your Information
              </h2>
              <p className="font-sans text-black/80 leading-relaxed text-sm sm:text-base md:text-lg mb-4">
                We use the information we collect to:
              </p>
              <ul className="font-sans text-black/80 leading-relaxed text-sm sm:text-base md:text-lg space-y-2 ml-6 list-disc">
                <li>Provide, maintain, and improve our services</li>
                <li>Process your orders and deliver video content</li>
                <li>Communicate with you about your orders and our services</li>
                <li>Send you updates, newsletters, and promotional materials (with your consent)</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Detect, prevent, and address technical issues and security threats</li>
              </ul>
            </section>

            {/* Section */}
            <section>
              <h2 className="font-serif text-black text-xl sm:text-2xl md:text-3xl tracking-wide mb-4">
                Data Storage and Security
              </h2>
              <p className="font-sans text-black/80 leading-relaxed text-sm sm:text-base md:text-lg">
                We implement appropriate technical and organizational measures to protect your personal data 
                against unauthorized access, alteration, disclosure, or destruction. However, no method of 
                transmission over the internet or electronic storage is 100% secure, and we cannot guarantee 
                absolute security.
              </p>
            </section>

            {/* Section */}
            <section>
              <h2 className="font-serif text-black text-xl sm:text-2xl md:text-3xl tracking-wide mb-4">
                Data Retention
              </h2>
              <p className="font-sans text-black/80 leading-relaxed text-sm sm:text-base md:text-lg">
                We retain your personal data only for as long as necessary to fulfill the purposes outlined 
                in this privacy policy, unless a longer retention period is required or permitted by law. 
                When we no longer need your data, we will securely delete or anonymize it.
              </p>
            </section>

            {/* Section */}
            <section>
              <h2 className="font-serif text-black text-xl sm:text-2xl md:text-3xl tracking-wide mb-4">
                Your Rights
              </h2>
              <p className="font-sans text-black/80 leading-relaxed text-sm sm:text-base md:text-lg mb-4">
                You have the right to:
              </p>
              <ul className="font-sans text-black/80 leading-relaxed text-sm sm:text-base md:text-lg space-y-2 ml-6 list-disc">
                <li>Access and receive a copy of your personal data</li>
                <li>Rectify inaccurate or incomplete data</li>
                <li>Request deletion of your personal data</li>
                <li>Object to or restrict the processing of your data</li>
                <li>Data portability (receive your data in a structured format)</li>
                <li>Withdraw consent at any time where processing is based on consent</li>
              </ul>
            </section>

            {/* Section */}
            <section>
              <h2 className="font-serif text-black text-xl sm:text-2xl md:text-3xl tracking-wide mb-4">
                Third-Party Services
              </h2>
              <p className="font-sans text-black/80 leading-relaxed text-sm sm:text-base md:text-lg">
                We may use third-party services to help us operate our business and provide services to you. 
                These third parties have access to your information only to perform specific tasks on our behalf 
                and are obligated not to disclose or use it for any other purpose.
              </p>
            </section>

            {/* Section */}
            <section>
              <h2 className="font-serif text-black text-xl sm:text-2xl md:text-3xl tracking-wide mb-4">
                Cookies and Tracking
              </h2>
              <p className="font-sans text-black/80 leading-relaxed text-sm sm:text-base md:text-lg">
                We may use cookies and similar tracking technologies to track activity on our service and 
                hold certain information. You can instruct your browser to refuse all cookies or to indicate 
                when a cookie is being sent.
              </p>
            </section>

            {/* Section */}
            <section>
              <h2 className="font-serif text-black text-xl sm:text-2xl md:text-3xl tracking-wide mb-4">
                Changes to This Policy
              </h2>
              <p className="font-sans text-black/80 leading-relaxed text-sm sm:text-base md:text-lg">
                We may update this privacy policy from time to time. We will notify you of any changes by 
                posting the new privacy policy on this page and updating the "Last updated" date. You are 
                advised to review this privacy policy periodically for any changes.
              </p>
            </section>

            {/* Section */}
            <section>
              <h2 className="font-serif text-black text-xl sm:text-2xl md:text-3xl tracking-wide mb-4">
                Contact Us
              </h2>
              <p className="font-sans text-black/80 leading-relaxed text-sm sm:text-base md:text-lg">
                If you have any questions about this privacy policy or wish to exercise your rights, please 
                contact us at{' '}
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

