'use client';
import Image from 'next/image';
import { Wrapper, Inner, Header, Offers, OfferCard, ImageCtn, TextCtn, } from './CareerOpportunities.styles';
import MaskText from '@/components/ui/MaskText';
import { useIsMobile } from '@/lib/useIsMobile';
import { desktopHeaderPhrases, desktopParagraphPhrase, mobileParagraphPhrase, offers, } from './CareerOpportunities.constants';
const OffersSection = () => {
    const isMobile = useIsMobile();
    return (<Wrapper>
      <Inner>
        <Header>
          <MaskText phrases={desktopHeaderPhrases} tag="h1"/>

          {isMobile ? (<MaskText phrases={mobileParagraphPhrase} tag="p"/>) : (<MaskText phrases={desktopParagraphPhrase} tag="p"/>)}
        </Header>
        <Offers>
          {offers.slice(0, 2).map((offer, i) => (<OfferCard key={i}>
              <ImageCtn>
                <Image src={offer.image} alt={offer.imageAlt} fill sizes="(max-width: 768px) 90vw, 60vw"/>
              </ImageCtn>
              <TextCtn>
                <MaskText phrases={new Array(offer.title)} tag="h2"/>
                <p>{offer.details}</p>
              </TextCtn>
            </OfferCard>))}
        </Offers>
        <Offers>
          {offers.slice(2, 4).map((offer, i) => (<OfferCard key={i} id={offer.id}>
              <ImageCtn>
                <Image src={offer.image} alt={offer.imageAlt} fill sizes="(max-width: 768px) 90vw, 40vw"/>
              </ImageCtn>
              <TextCtn>
                <MaskText phrases={new Array(offer.title)} tag="h2"/>
                <p>{offer.details}</p>
              </TextCtn>
            </OfferCard>))}
        </Offers>
      </Inner>
    </Wrapper>);
};
export default OffersSection;
