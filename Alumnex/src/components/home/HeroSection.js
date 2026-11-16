'use client';
import { Wrapper, Inner, HeroTextContainer } from './HeroSection.styles';
import GetStartedButton from '@/components/ui/Button';
import MaskText from '@/components/ui/MaskText';
import { useIsMobile } from '@/lib/useIsMobile';
import { mobileParagraphPhrases, mobilePhrases, paragraphPhrases, phrases, } from './HeroSection.constants';
const HeroSection = () => {
    const isMobile = useIsMobile();
    return (<Wrapper>
      <Inner>
        <HeroTextContainer>
          {isMobile ? (<>
              <MaskText phrases={mobilePhrases} tag="h1"/>
              <MaskText phrases={mobileParagraphPhrases} tag="p"/>
            </>) : (<>
              <MaskText phrases={phrases} tag="h1"/>
              <MaskText phrases={paragraphPhrases} tag="p"/>
            </>)}
        </HeroTextContainer>
        <GetStartedButton padding="1rem 2rem"/>
      </Inner>
    </Wrapper>);
};
export default HeroSection;
