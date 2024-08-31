export async function register(): Promise<void> {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        console.log('Registering instrumentation for Node.js runtime');
    }

    if (process.env.NEXT_RUNTIME === 'edge') {
        console.log('Registering instrumentation for Edge runtime');
    }
}
