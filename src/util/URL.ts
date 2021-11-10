export const getURIBase = (node_env: string): string => {
    if (node_env.includes('local')) return 'localhost:8080';
    if (node_env.includes('testing')) return '';
    if (node_env === 'development') return 'cm-tracking-almacenar-pin-guia-lodr37gsga-uc.a.run.app';
    return 'localhost:8080';
};
