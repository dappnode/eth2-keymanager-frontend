declare global {
  interface Window {
    env: any;
  }
}

// change with your own variables
type EnvType = {
  NODE_ENV: string;
};

export const env: EnvType = { ...process.env, ...window.env };
