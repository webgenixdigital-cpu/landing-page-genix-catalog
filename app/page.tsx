// app/page.tsx
import Header from '@/components/landing/Header'
import Hero from '@/components/landing/Hero'
import Trust from '@/components/landing/Trust'
import Compare from '@/components/landing/Compare'
import Benefits from '@/components/landing/Benefits'
import HowItWorks from '@/components/landing/HowItWorks'
import Pricing from '@/components/landing/Pricing'
import Faq from '@/components/landing/Faq'
import FooterCta from '@/components/landing/FooterCta'
import Footer from '@/components/landing/Footer'
import WhatsappFloat from '@/components/landing/WhatsappFloat'

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <Trust />
      <Compare />
      <Benefits />
      <HowItWorks />
      <Pricing />
      <Faq />
      <FooterCta />
      <Footer />
      <WhatsappFloat />
    </>
  )
}
