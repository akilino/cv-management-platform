const TOKEN_NAME = import.meta.env.VITE_TOKEN_NAME || "access_token";

export const getAccessToken = () => localStorage.getItem(TOKEN_NAME);

export const getJwtPayload = () => {
  const token = getAccessToken();
  if (!token) return null;

  const [, payload] = token.split(".");
  if (!payload) return null;

  try {
    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
    const paddedPayload = normalizedPayload.padEnd(
      normalizedPayload.length + ((4 - (normalizedPayload.length % 4)) % 4),
      "="
    );
    const decodedPayload = atob(paddedPayload);

    return JSON.parse(decodedPayload);
  } catch (err) {
    console.error("Failed to decode JWT payload:", err);
    return null;
  }
};

export const getUserIdFromToken = () => {
  const payload = getJwtPayload();

  return payload?.userId || payload?.id || payload?.sub || null;
};
