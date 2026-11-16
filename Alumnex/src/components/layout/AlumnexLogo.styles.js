'use client';
import Link from 'next/link';
import { styled } from 'styled-components';

export const LogoLink = styled(Link) `
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  flex-shrink: 0;
  white-space: nowrap;
`;

export const IconFrame = styled.span `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  flex: 0 0 46px;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    width: 38px;
    height: 38px;
    flex-basis: 38px;
  }
`;
