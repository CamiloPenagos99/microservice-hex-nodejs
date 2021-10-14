export const getURIBase = (node_env = 'local'): string => {
    if (node_env.includes('local')) return 'localhost:8080';
    if (node_env.includes('-test')) return '';
    if (node_env.includes('-dev')) return '';
    return 'localhost:8080';
};
