export const getInitials = (name: string): string => {
    const [firstName, lastName = ''] = name.split(' ');
    const firstLetter = firstName[0];
    const secondLetter = lastName[0] || '';

    return `${firstLetter}${secondLetter}`;
};
