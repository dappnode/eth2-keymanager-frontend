export function getUrlParams(): {
  baseUrl: string;
  authToken: string;
  network: string;
  host: string;
} {
  const search = new URLSearchParams(window.location.search);
  return {
    network: search.get("network") || "",
    baseUrl: search.get("baseUrl") || "",
    authToken: search.get("authToken") || "",
    host: search.get("host") || "",
  };
}
