'use client';
import { styled } from 'styled-components';
export const Wrapper = styled.section ``;
export const Inner = styled.div `
  max-width: 1440px;
  width: 90%;
  margin: 12.38rem auto 0;

  @media (max-width: 768px) {
    margin-top: 6.44rem;
  }
`;
export const Header = styled.header `
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
  max-width: 56rem;
  margin: 0 auto 6.75rem;

  h1 {
    font-size: 4.75rem;
    font-weight: 400;
  }

  p {
    max-width: 41.75rem;
    color: #989898;
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 1.75rem;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.25rem;
    }

    p {
      font-size: 1rem;
      line-height: 1.5rem;
    }
  }
`;
export const ImageCtn = styled.div `
  position: relative;
  overflow: hidden;
  flex: 1;
  color: #c9a16b;

  img {
    object-fit: cover;
  }

  @media (max-width: 768px) {
    min-height: 0;
  }
`;
export const TextCtn = styled.div `
  padding: 2.5rem;
  padding-top: 3.25rem;
  max-width: 32.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: auto;

  h2 {
    font-size: 2rem;
    font-weight: 500;
    line-height: 1.75rem;
  }

  p {
    color: var(--link-color);
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    h2 {
      font-size: 1.5rem;
    }
  }
`;
export const Offers = styled.div `
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  &:last-child {
    margin-top: 2rem;
    grid-template-columns: 1fr 2fr;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;

    &:last-child {
      grid-template-columns: 1fr;
    }
  }
`;
export const OfferCard = styled.div `
  overflow: hidden;
  height: 31.25rem;
  border-radius: 0.75rem;
  border: 1px solid var(--stroke, rgba(255, 255, 255, 0.04));
  display: flex;
  flex-direction: column;
  background: #131313;
  border-color: rgba(201, 161, 107, 0.16);

`;
