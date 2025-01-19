const log = (message: string, ...data: unknown[]): void => {
    if (process.env.NODE_ENV !== 'development') {
        return;
    }

    // eslint-disable-next-line no-console
    console.log(message, ...data);
};

export default log;
