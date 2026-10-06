export const testSiteKey = "1x00000000000000000000AA";
export const testSecretKey = "1x0000000000000000000000000000000AA";

const testKeyPattern = /^[123]x0{10,}[A-F]{2}$/;

export const isTestKey = (key: string | undefined): boolean =>
  key !== undefined && testKeyPattern.test(key);
