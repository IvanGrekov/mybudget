export const getMockedUserId = (): number => {
    const userId = process.env.NEXT_PUBLIC_USER_ID;

    if (!userId) {
        throw new Error('User id is not provided');
    }

    return parseInt(userId);
};
