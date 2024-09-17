export async function register(): Promise<void> {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        // eslint-disable-next-line no-console
        console.log('Registering instrumentation for Node.js runtime');
    }

    if (process.env.NEXT_RUNTIME === 'edge') {
        // eslint-disable-next-line no-console
        console.log('Registering instrumentation for Edge runtime');
    }
}
