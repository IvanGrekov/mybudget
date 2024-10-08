'use client';

import { useReportWebVitals } from 'next/web-vitals';

import { setLocalStorageValue } from 'utils/localStorage.utils';

const LOGABLE_METRICS = ['FCP', 'LCP', 'CLS', 'FID', 'TTFB'];

export function WebVitals(): null {
    useReportWebVitals((metric) => {
        if (LOGABLE_METRICS.includes(metric.name)) {
            setLocalStorageValue({
                key: metric.name,
                value: metric,
            });
        }
    });

    return null;
}
