let baseUrl, wsUrl, wsPath;

if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://127.0.0.1:6060';
    wsUrl = 'http://127.0.0.1:6060';
    wsPath = 'dojo';
} else if (process.env.NODE_ENV === 'production') {
    baseUrl = '127.0.0.1:4444';
    wsUrl = '';
    wsPath = '';
}
export default { baseUrl, wsUrl, wsPath } ;