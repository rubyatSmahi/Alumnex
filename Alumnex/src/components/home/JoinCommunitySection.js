'use client';
import { useState } from 'react';
import { Wrapper, Inner, Header, TestimonialWrapper, Testimonial, Testimony, UserInfo, Name, Avatar, PaginationButtonContainer, Previous, Next, } from './JoinCommunitySection.styles';
import ic_arrow_left from '../../../public/svgs/ic_arrow_left.svg';
import ic_arrow_right from '../../../public/svgs/ic_arrow_right.svg';
import Image from 'next/image';
import MaskText from '@/components/ui/MaskText';
import { useIsMobile } from '@/lib/useIsMobile';
import { desktopHeaderPhrase, testimonials } from './JoinCommunitySection.constants';
const JoinSection = () => {
    const [testimonialsArr, setTestimonialsArr] = useState(testimonials);
    const next = () => {
        const newArr = [...testimonialsArr.slice(1), testimonialsArr[0]];
        setTestimonialsArr(newArr);
    };
    const previous = () => {
        const newArr = [
            ...testimonialsArr.slice(-1),
            ...testimonialsArr.slice(0, -1),
        ];
        setTestimonialsArr(newArr);
    };
    const isMobile = useIsMobile();
    const mappedTestimonials = isMobile
        ? testimonialsArr.slice(0, 1)
        : testimonialsArr.slice(0, 3);
    return (<Wrapper id="stories">
      <Inner>
        <Header>
          <MaskText phrases={desktopHeaderPhrase} tag="h1"/>
          <p className="demo-note">Profiles and sample statements are illustrative only, not real alumni testimonials.</p>
        </Header>
        <TestimonialWrapper>
          {mappedTestimonials.map((t, i) => (<Testimonial key={i}>
              <Testimony>{t.testimony}</Testimony>
              <UserInfo>
                <Name>
                  <MaskText phrases={new Array(t.person)} tag="h3"/>
                  <MaskText phrases={new Array('Illustrative example')} tag="p"/>
                </Name>
                <Avatar>
                  <Image src={t.avatar} alt="Illustrative profile portrait, not a real testimonial"/>
                </Avatar>
              </UserInfo>
            </Testimonial>))}
        </TestimonialWrapper>
        <PaginationButtonContainer>
          <Previous onClick={previous}>
            <Image src={ic_arrow_left} alt="arrow_left"/>
          </Previous>
          <Next onClick={next}>
            <Image src={ic_arrow_right} alt="arrow_right"/>
          </Next>
        </PaginationButtonContainer>
      </Inner>
    </Wrapper>);
};
export default JoinSection;
