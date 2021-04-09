export const WALLET_LIQUALITY = 'WALLET_LIQUALITY';
export const WALLET_METAMASK = 'WALLET_METAMASK';

export const NETWORK_ID = +process.env.VUE_APP_NETWORK_ID || 30;
export const WS_PROVIDER = process.env.VUE_APP_WS_PROVIDER || 'wss://public-node.rsk.co:433';
export const HTTP_PROVIDER = process.env.VUE_APP_HTTP_PROVIDER || 'https://public-node.rsk.co:433';
export const COMMIT_HASH = process.env.VUE_APP_GIT_HASH || '';

// actions
export const SESSION_CONNECT_WEB3 = 'SESSION_CONNECT_WEB3';
export const SESSION_GET_CHAIN_ID = 'SESSION_GET_CHAIN_ID';

// mutations
export const SESSION_SET_PROPERTY = 'SESSION_SET_PROPERTY';

// getters
export const SESSION_GET_WALLET_NAME = 'SESSION_GET_WALLET_NAME';
export const SESSION_IS_CONNECTED = 'SESSION_IS_CONNECTED';
