import path from 'path';

const base = '..';
const config = {
    testDir: path.join(base, '__tests__'),
    preserveOutput: 'failures-only',
    timeout: 2000,
    use: {
        baseURL: 'http://localhost:8080',
        browserName: 'chromium',
        headless: true,
    },
    expect: {
        timeout: 500,
    },
};

export default config;
