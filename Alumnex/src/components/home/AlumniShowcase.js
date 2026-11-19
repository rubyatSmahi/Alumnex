'use client';
import Image from 'next/image';
import big_banner from '../../../public/images/Big_banner.jpg';
import featured_mobile_banner from '../../../public/images/Featured_mobile_banner.jpg';
import ParallaxText from '@/components/ui/ParallaxText';
import { Wrapper, Inner, ImageContainer, ParallaxImages, Div } from './AlumniShowcase.styles';
import RevealCover from '@/components/ui/RevealCover';
import { useIsMobile } from '@/lib/useIsMobile';
export const imageVariants = {
    hidden: {
        scale: 1.6,
    },
    visible: {
        scale: 1,
        transition: {
            duration: 1.4,
            ease: [0.6, 0.05, -0.01, 0.9],
            delay: 0.2,
        },
    },
};
const Featured = () => {
    const isMobile = useIsMobile();
    return (<Wrapper id="directory">
      <Inner>
        <ImageContainer>
          <RevealCover />
          <Div variants={imageVariants} initial="hidden" whileInView="visible" viewport={{ amount: 0.25, once: true }}>
            {isMobile ? (<Image src={featured_mobile_banner} alt="Alumnex alumni community" fill sizes="(max-width: 768px) 90vw, 85vw"/>) : (<Image src={big_banner} alt="Alumnex alumni community" fill sizes="(max-width: 768px) 90vw, 85vw"/>)}
          </Div>
        </ImageContainer>
        <h2>One community. Many paths.</h2>
        <ParallaxImages>
          <ParallaxText baseVelocity={-4}>
            Alumni connections · Career mentorship · Community events ·
          </ParallaxText>
        </ParallaxImages>
      </Inner>
    </Wrapper>);
};
export default Featured;
