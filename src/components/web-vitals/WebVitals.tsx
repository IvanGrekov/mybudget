'use client';

import { useReportWebVitals } from 'next/web-vitals';

const LOGGABLE_METRICS = ['FCP', 'LCP', 'CLS', 'FID', 'TTFB'];

export function WebVitals(): null {
    useReportWebVitals((metric) => {
        if (LOGGABLE_METRICS.includes(metric.name)) {
            // eslint-disable-next-line no-console
            console.log(metric);
        }
    });

    return null;
}
