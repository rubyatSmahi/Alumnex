import mentorshipImage from '../../../public/images/mentorship.jpg';
import careerOpportunitiesImage from '../../../public/images/career_opportunities.webp';
import professionalProfileImage from '../../../public/images/professional_profile.jpg';
import campusEventImage from '../../../public/images/campus_event.jpg';

// For desktop
export const desktopHeaderPhrases = [
    'Grow with a stronger',
    'alumni community.',
];
export const desktopParagraphPhrase = [
    'Alumnex brings together graduates, students, and mentors through career opportunities,',
    'networking, and shared experiences that continue long after graduation.',
];
// For mobile
export const mobileParagraphPhrase = [
    'Alumnex brings together graduates, students, and mentors through',
    'career opportunities, networking, and shared experiences beyond campus.',
];
export const offers = [
    {
        icon: 'mentorship',
        title: 'Mentorship Matches',
        details: 'Connect with alumni who can guide students through internships, careers, and leadership growth.',
        image: mentorshipImage,
        imageAlt: 'An alumna greeting a colleague',
    },
    {
        icon: 'career',
        title: 'Career Opportunities',
        details: 'Discover relevant jobs, internships, and openings shared by the university network.',
        image: careerOpportunitiesImage,
        imageAlt: 'Alumni discussing professional opportunities',
    },
    {
        icon: 'profile',
        title: 'Professional Profiles',
        details: 'Showcase experience, education, and milestones that help the community stay connected.',
        image: professionalProfileImage,
        imageAlt: 'Professional portrait representing an alumni profile',
    },
    {
        icon: 'event',
        title: 'Campus Events',
        details: 'Join reunions, employer sessions, and networking events that strengthen university ties.',
        image: campusEventImage,
        imageAlt: 'Alumni gathering at a university event',
        id: 'events',
    },
];
