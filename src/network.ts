/**
 * Returns the network: ethereum | gnosis | prater
 */
export const getNetwork = (): string => {
  const network = process.env.NETWORK;
  if (network === "ethereum") return "ethereum";
  if (network === "gnosis") return "gnosis";
  if (network === "prater") return "prater";
  return "unknown";
};
