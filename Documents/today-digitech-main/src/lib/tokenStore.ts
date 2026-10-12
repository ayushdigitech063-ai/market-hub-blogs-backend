let memoryAccessToken: string | null = null;

export const setAccessToken = (token: string | null): void => {
  memoryAccessToken = token;
};

export const getAccessToken = (): string | null => {
  return memoryAccessToken;
};
