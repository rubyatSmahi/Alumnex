'use client';
import Image from 'next/image';
import future_banner from '../../../public/images/Big_Alumni_photo.jpg';
import future_mobile_banner from '../../../public/images/Small_alumni_photo.jpg';
import { Wrapper, Inner, Header, CardContainer, Card, TextCtn, SVGCtn, Stats, Stat, Banner, DemoNote } from './SuccessStories.styles';
import MaskText from '@/components/ui/MaskText';
import { useIsMobile } from '@/lib/useIsMobile';
import { cardsInfo, desktopHeaderPhrase, desktopParagraphPhrase, mobileHeaderPhrase, mobileParagraphPhrase, stats, } from './SuccessStories.constants';
import AlumniIcon from '@/components/ui/AlumniIcon';
const ProfessionalFuture = () => {
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
        <CardContainer>
          {cardsInfo.map((info, i) => (<Card key={i}>
              <TextCtn>
                <MaskText phrases={new Array(info.title)} tag="h3"/>
                <MaskText phrases={new Array(info.details)} tag="p"/>
              </TextCtn>
              <SVGCtn>
                <AlumniIcon name={info.icon} size={48}/>
              </SVGCtn>
            </Card>))}
        </CardContainer>
        <DemoNote>Illustrative demo metrics only. Replace these values with verified platform data.</DemoNote>
        <Stats>
          {stats.map((stat, i) => (<Stat key={i}>
              <MaskText phrases={new Array(stat.number)} tag="h1"/>
              <MaskText phrases={new Array(stat.subtitle)} tag="p"/>
            </Stat>))}
        </Stats>
      </Inner>
      <Banner>
        {isMobile ? (<Image src={future_mobile_banner} alt="Alumni community gathering" fill sizes="100vw"/>) : (<Image src={future_banner} alt="Alumni community gathering" fill sizes="100vw"/>)}
      </Banner>
    </Wrapper>);
};
export default ProfessionalFuture;
