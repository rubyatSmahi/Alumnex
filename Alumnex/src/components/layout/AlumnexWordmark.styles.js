'use client';
import { styled } from 'styled-components';

export const Wordmark = styled.span `
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  color: #390711;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.055em;
  line-height: 1;
  -webkit-text-stroke: 0.45px #f5f3f0;
  text-shadow: 0 0 1px rgba(245, 243, 240, 0.7);

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const XMark = styled.svg `
  width: 1.2em;
  height: 1.2em;
  margin-left: -0.02em;
  overflow: visible;

  path {
    fill: none;
    stroke: #c9a16b;
    stroke-width: 3.2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  path:nth-child(3),
  path:nth-child(4) {
    stroke-width: 1.7;
  }
`;
