export const extractPubkey = async (file: File): Promise<string> => {
  const text = await file.text();
  const json = JSON.parse(text);
  return json.pubkey;
};

export const shortenPubkey = (key: string | undefined): string => {
  if (!key) return "";
  var prefix = "";
  var end = 4;
  if (!key.startsWith("0x")) {
    prefix = `0x`;
  } else {
    end = 6;
  }
  return `${prefix}${key.substring(0, end)}...${key.substring(
    key.length - 4,
    key.length
  )}`;
};

export function getEmoji(status: string) {
  switch (status) {
    case "error":
      return "❌";
    case "imported":
      return "✅";
    case "deleted":
      return "✅";
    default:
      return "⚠️";
  }
}
