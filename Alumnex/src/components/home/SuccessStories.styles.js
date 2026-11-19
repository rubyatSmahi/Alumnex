'use client';
import { styled } from 'styled-components';
export const Wrapper = styled.section `
  padding-top: 7.75rem;

  @media (max-width: 768px) {
    padding-top: 5rem;
  }
`;
export const Inner = styled.div `
  width: 90%;
  max-width: 1440px;
  margin: 0 auto;
`;
export const Header = styled.header `
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 56rem;
  margin-bottom: 6.25rem;

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

  @media (max-width: 1024px) {
    margin-bottom: 4.5rem;

    h1 {
      font-size: 3.5rem;
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 3.5rem;

    h1 {
      font-size: 2.25rem;
    }

    p {
      font-size: 1rem;
      line-height: 1.5rem;
    }
  }
`;
export const CardContainer = styled.div `
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-auto-rows: 1fr;
    gap: 2rem;
  }
`;
export const Card = styled.div `
  min-width: 0;
  min-height: 41.875rem;
  border-radius: 0.75rem;
  border: 1px solid var(--stroke, rgba(255, 255, 255, 0.04));
  background: #131313;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 768px) {
    min-height: 27.5rem;
  }
`;
export const TextCtn = styled.div `
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 3.25rem;
  padding-bottom: 2.94rem;

  h3 {
    font-size: 2rem;
    font-weight: 500;
    line-height: 1.75rem;
  }

  p {
    color: var(--link-color);
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 1.75rem;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;

    h3 {
      font-size: 1.5rem;
      line-height: 1.75rem;
    }

    p {
      font-size: 1rem;
      line-height: 1.5rem;
    }
  }
`;
export const SVGCtn = styled.div `
  position: relative;
  overflow: hidden;
  background: #101010;
  flex: 1 0 24.55rem;
  display: grid;
  place-items: center;
  color: #c9a16b;
  border-bottom: 1px solid rgba(201, 161, 107, 0.16);

  img {
    object-fit: cover;
  }

  @media (max-width: 768px) {
    flex-basis: 15.28219rem;
    background-position: center center;
    background-size: contain;
  }
`;
export const DemoNote = styled.p `
  color: var(--link-color);
  font-size: 0.875rem;
  text-align: center;
  margin: 0 auto -3rem;
  min-height: 1em;
`;
export const Stats = styled.div `
  margin: 6.25rem auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    margin: 3.75rem auto;
  }

  @media (max-width: 360px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem 1rem;
  }
`;
export const Stat = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;

  h1 {
    font-size: 5rem;
    font-weight: 600;
  }

  p {
    color: var(--link-color);
    font-size: 1.125rem;
    font-weight: 500;
    text-transform: uppercase;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 1.25rem;
    }

    p {
      font-size: 0.75rem;
    }
  }
`;
// export const Number = styled.h1`
//   font-size: 5rem;
//   font-weight: 600;
// `;
// export const SubTitle = styled.p`
//   color: var(--link-color);
//   font-size: 1.125rem;
//   font-weight: 500;
//   text-transform: uppercase;
// `;
export const Banner = styled.div `
  height: 45rem;
  width: 100%;
  position: relative;

  img {
    object-fit: cover;
  }

  @media (max-width: 1024px) {
    height: 35rem;
  }

  @media (max-width: 768px) {
    height: 31.25rem;
    img {
      object-fit: cover;
    }
  }

  @media (max-width: 480px) {
    height: 22rem;
  }
`;
