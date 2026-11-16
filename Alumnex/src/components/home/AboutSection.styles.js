'use client';
import { styled } from 'styled-components';
export const Wrapper = styled.section `
  padding-top: 7.5rem;

  @media (max-width: 768px) {
    padding-top: 6rem;
  }
`;
export const Inner = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 1440px;
  margin: 0 auto;
`;
export const Header = styled.header `
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 56rem;
  margin: 0 auto 7.38rem;

  h3 {
    color: var(--gold, #c9a16b);
    font-size: 1.125rem;
    font-weight: 500;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 4.75rem;
    font-weight: 400;
  }

  p {
    max-width: 41.75rem;
    color: var(--link-color);
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
export const HeaderMainText = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;
export const CardsContainer = styled.div `
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
  margin-bottom: 7.77rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-bottom: 4rem;
  }
`;
export const PhotoCard = styled.div `
  min-height: 18rem;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(201, 161, 107, 0.35);
  border-radius: 0.75rem;
  background: #121212;

  img {
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  span {
    position: absolute;
    inset: auto 0 0;
    padding: 3rem 1.25rem 1.25rem;
    background: linear-gradient(transparent, rgba(8, 8, 8, 0.9));
    color: #fff;
    font-size: 1.125rem;
  }

  &:hover img {
    transform: scale(1.04);
  }

  @media (max-width: 768px) {
    min-height: 15rem;
  }
`;
