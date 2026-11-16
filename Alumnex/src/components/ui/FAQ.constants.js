export const desktopHeaderPhrase = ['Frequently asked', 'questions'];
export const mobileHeaderPhrase = ['Frequently', 'asked', 'questions'];
export const animate = {
    initial: {
        y: '100%',
        opacity: 0,
    },
    open: (i) => ({
        y: '0%',
        opacity: 1,
        transition: { duration: 1, delay: 0.1 * i, ease: [0.33, 1, 0.68, 1] },
    }),
};
export const faqData = [
    {
        question: 'How do I create an Alumnex account?',
        answer: 'Sign up with your university email, verify your graduation or student status, and complete your profile to start networking with the community.',
    },
    {
        question: 'How do I connect with alumni or mentors?',
        answer: 'Use the directory, search by batch or department, and message or request mentorship directly through a verified alumni profile.',
    },
    {
        question: 'Can students browse job and internship opportunities?',
        answer: 'Yes. Students can discover opportunities posted by alumni and employers, then apply or request guidance from the right network.',
    },
    {
        question: 'Do administrators manage events and verification?',
        answer: 'Administrative users can review registrations, approve profiles, manage departments, and track engagement through the portal dashboard.',
    },
];
