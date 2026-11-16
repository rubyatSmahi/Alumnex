import AboutSection from '@/components/home/AboutSection';
import AlumniShowcase from '@/components/home/AlumniShowcase';
import CareerOpportunities from '@/components/home/CareerOpportunities';
import FAQ from '@/components/ui/FAQ';
import HeroSection from '@/components/home/HeroSection';
import JoinCommunitySection from '@/components/home/JoinCommunitySection';
import MentorshipSection from '@/components/home/MentorshipSection';
import SuccessStories from '@/components/home/SuccessStories';
export default function Home() {
    return (<main>
      <HeroSection />
      <AlumniShowcase />
      <CareerOpportunities />
      <MentorshipSection />
      <SuccessStories />
      <AboutSection />
      <JoinCommunitySection />
      <FAQ />
    </main>);
}
