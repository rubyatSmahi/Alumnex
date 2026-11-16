'use client';
import Image from 'next/image';
import bigAlumni from '../../../public/images/Big_Alumni.jpg';
import alumniEvent from '../../../public/images/Big_Alumni_photo.jpg';
import graduates from '../../../public/images/Big_banner.jpg';
import AlumniIcon from '@/components/ui/AlumniIcon';
import MaskText from '@/components/ui/MaskText';
import { useIsMobile } from '@/lib/useIsMobile';
import { desktopHeaderPhrase, desktopParagraphPhrase, edges, mobileHeaderPhrase, mobileParagraphPhrase } from './AboutSection.constants';
import { Wrapper, Inner, Header, HeaderMainText, CardsContainer, PhotoCard } from './AboutSection.styles';
import { Edge, Edges, Title } from './MentorshipSection.styles';

const communityPhotos = [
    { image: bigAlumni, alt: 'Professional alumni community', label: 'Professional connections' },
    { image: alumniEvent, alt: 'Alumni gathering at a community event', label: 'Community events' },
    { image: graduates, alt: 'Graduates celebrating together', label: 'Lifelong university ties' },
];

const IntroSection = () => {
    const isMobile = useIsMobile();

    return (
        <Wrapper>
            <Inner>
                <Header>
                    <h3>Introducing</h3>
                    <HeaderMainText>
                        {isMobile ? (
                            <>
                                <MaskText phrases={mobileHeaderPhrase} tag="h1" />
                                <MaskText phrases={mobileParagraphPhrase} tag="p" />
                            </>
                        ) : (
                            <>
                                <MaskText phrases={desktopHeaderPhrase} tag="h1" />
                                <MaskText phrases={desktopParagraphPhrase} tag="p" />
                            </>
                        )}
                    </HeaderMainText>
                </Header>
                <CardsContainer>
                    {communityPhotos.map((photo) => (
                        <PhotoCard key={photo.label}>
                            <Image src={photo.image} alt={photo.alt} fill sizes="(max-width: 768px) 90vw, 30vw" />
                            <span>{photo.label}</span>
                        </PhotoCard>
                    ))}
                </CardsContainer>
                <Edges>
                    {edges.map((edge) => (
                        <Edge key={edge.point}>
                            <Title>
                                <AlumniIcon name={edge.icon} size={24} />
                                <MaskText phrases={new Array(edge.point)} tag="h3" />
                            </Title>
                            <MaskText phrases={new Array(edge.details)} tag="p" />
                        </Edge>
                    ))}
                </Edges>
            </Inner>
        </Wrapper>
    );
};

export default IntroSection;
