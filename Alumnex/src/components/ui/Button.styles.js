'use client';
import Link from 'next/link';
import { styled } from 'styled-components';
export const LinkTo = styled(Link) `
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6.25rem;
  background: var(--burgundy);
  color: var(--white);
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.2s ease, transform 0.2s ease;

  &:hover {
    background: #4a0b18;
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid #c9a16b;
    outline-offset: 3px;
  }
`;
