'use client';
import { Wordmark, XMark } from './AlumnexWordmark.styles';

const AlumnexWordmark = ({ className }) => (
    <Wordmark className={className} aria-label="Alumnex">
        <span>ALUMNE</span>
        <XMark viewBox="0 0 34 34" aria-hidden="true" focusable="false">
            <path d="M5 28C11 19 21 9 29 5" />
            <path d="M7 6C14 9 20 21 27 28" />
            <path d="M3 27C4 31 9 31 13 25" />
            <path d="M24 7C27 5 29 3 31 2" />
        </XMark>
    </Wordmark>
);

export default AlumnexWordmark;
