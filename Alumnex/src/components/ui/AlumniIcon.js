import { forwardRef } from 'react';

const iconPaths = {
    academic: (
        <>
            <path d="m2 9 10-5 10 5-10 5L2 9Z" />
            <path d="M6 11v5c2.5 2 9.5 2 12 0v-5M22 9v6" />
        </>
    ),
    community: (
        <>
            <circle cx="9" cy="8" r="3" />
            <path d="M3 20v-1a6 6 0 0 1 12 0v1H3ZM16 5.5a3 3 0 0 1 0 5.8M18 14a5 5 0 0 1 3 4.5V20h-3" />
        </>
    ),
    mentorship: (
        <>
            <circle cx="8" cy="8" r="3" />
            <circle cx="17" cy="8" r="3" />
            <path d="M2.5 19a5.5 5.5 0 0 1 11 0M15 15a5 5 0 0 1 6.5 4" />
            <path d="M11 12h3M12.5 10.5v3" />
        </>
    ),
    career: (
        <>
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" />
        </>
    ),
    profile: (
        <>
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <circle cx="9" cy="10" r="2" />
            <path d="M5.5 16a3.5 3.5 0 0 1 7 0M15 9h3M15 13h3M15 17h3" />
        </>
    ),
    event: (
        <>
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M7 3v4M17 3v4M3 10h18M8 14h2M14 14h2M8 17h2" />
        </>
    ),
    achievement: (
        <>
            <circle cx="12" cy="9" r="6" />
            <path d="m8 14-1 7 5-2 5 2-1-7M9.5 9l1.5 1.5L14.5 7" />
        </>
    ),
};

const AlumniIcon = forwardRef(function AlumniIcon({ name = 'community', size = 28, className }, ref) {
    return (
        <svg
            ref={ref}
            aria-hidden="true"
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            focusable="false"
        >
            {iconPaths[name] || iconPaths.community}
        </svg>
    );
});

export default AlumniIcon;
