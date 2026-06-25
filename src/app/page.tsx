import { Hero } from '@/components/sections/Hero'
import { AboutSection } from '@/components/sections/AboutSection'
import { Stats } from '@/components/sections/Stats'
import { Companies } from '@/components/sections/Companies'
import { TargetAudience } from '@/components/sections/TargetAudience'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { Testimonials } from '@/components/sections/Testimonials'
import { Process } from '@/components/sections/Process'
import { Credentials } from '@/components/sections/Credentials'
import { FAQ } from '@/components/sections/FAQ'
import { Contact } from '@/components/sections/Contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <Stats />
      <Companies />
      <TargetAudience />
      <ServicesSection />
      <Testimonials />
      <Process />
      <Credentials />
      <FAQ />
      <Contact />
    </>
  )
}
