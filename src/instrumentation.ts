import log from 'utils/log';

export async function register(): Promise<void> {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        log('Registering instrumentation for Node.js runtime');
    }

    if (process.env.NEXT_RUNTIME === 'edge') {
        log('Registering instrumentation for Edge runtime');
    }
}
