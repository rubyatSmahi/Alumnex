'use client';
import Image from 'next/image';
import { Wrapper, Inner, Header, BannerCtn, Edges, Edge, Title, BriefNote, } from './MentorshipSection.styles';
import MaskText from '@/components/ui/MaskText';
import RevealCover from '@/components/ui/RevealCover';
import { Div } from './AlumniShowcase.styles';
import { imageVariants } from './AlumniShowcase';
import { useIsMobile } from '@/lib/useIsMobile';
import mentorship_image from '../../../public/images/mentorship.jpg';
import AlumniIcon from '@/components/ui/AlumniIcon';
import { desktopBriefNotePhrase, desktopHeaderPhrase, desktopParagraphPhrase, edges, mobileBriefNotePhrase, mobileHeaderPhrase, mobileParagraphPhrase, } from './MentorshipSection.constants';
const MentorshipSection = () => {
    const isMobile = useIsMobile();
    return (<Wrapper>
      <Inner>
        <Header>
          {isMobile ? (<>
              <MaskText phrases={mobileHeaderPhrase} tag="h1"/>
              <MaskText phrases={mobileParagraphPhrase} tag="p"/>
            </>) : (<>
              <MaskText phrases={desktopHeaderPhrase} tag="h1"/>
              <MaskText phrases={desktopParagraphPhrase} tag="p"/>
            </>)}
        </Header>
        <BannerCtn>
          <RevealCover />
          <Div variants={imageVariants} initial="hidden" whileInView="visible" viewport={{ amount: 0.25, once: true }}>
            <Image src={mentorship_image} alt="An alumna greeting a colleague" fill sizes="(max-width: 768px) 90vw, 85vw"/>
          </Div>
        </BannerCtn>
        <Edges>
          {edges.map((edge, i) => (<Edge key={i}>
              <Title>
                <AlumniIcon name={edge.icon} size={24}/>
                <MaskText phrases={new Array(edge.point)} tag="h3"/>
              </Title>
              <MaskText phrases={new Array(edge.details)} tag="p"/>
            </Edge>))}
        </Edges>
      </Inner>
      <BriefNote>
        {isMobile ? (<MaskText phrases={mobileBriefNotePhrase} tag="p"/>) : (<MaskText phrases={desktopBriefNotePhrase} tag="p"/>)}
      </BriefNote>
    </Wrapper>);
};
export default MentorshipSection;
