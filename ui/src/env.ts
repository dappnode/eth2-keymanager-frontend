declare global {
  interface Window {
    env: any;
  }
}

// change with your own variables
type EnvType = {
  NODE_ENV: string;
  REACT_APP_NETWORK: string;
  REACT_APP_WEB3SIGNER_API_URL: string;
  REACT_APP_CONSENSUS_CLIENT: string;
  REACT_APP_EXECUTION_CLIENT: string;
  REACT_APP_WEB3SIGNER_AUTH_TOKEN: string;
};
export const env: EnvType = { ...process.env, ...window.env };
