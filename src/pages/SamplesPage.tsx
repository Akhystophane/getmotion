import { useState } from 'react'
import { Hero } from '../components/Hero'
import { PhoneShowcase } from '../components/PhoneShowcase'
import { HowItWorks } from '../components/HowItWorks'
import { CTASection } from '../components/CTASection'
import { Footer } from '../components/Footer'
import { LoadingScreen } from '../components/LoadingScreen'

export function SamplesPage() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <main
        style={{
          filter: isLoading ? 'blur(10px)' : 'none',
          transition: 'filter 1s cubic-bezier(0.33, 1, 0.68, 1)',
          opacity: isLoading ? 0.3 : 1,
          transitionProperty: 'filter, opacity'
        }}
      >
        <Hero onReady={() => setIsLoading(false)} />
        <PhoneShowcase />
        <HowItWorks />
        <CTASection />
        {/* <VideoShowcase /> */}
        {/* <UserQualification /> */}
        <Footer />
      </main>
    </>
  )
}
