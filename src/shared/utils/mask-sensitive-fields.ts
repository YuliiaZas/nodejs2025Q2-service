const sensitiveFieldsDefault = [
  'password',
  'oldPassword',
  'newPassword',
  'accessToken',
  'refreshToken',
];

export function maskSensitiveFields<T extends Record<string, any>>(
  data: T,
  sensitiveFields: string[] = sensitiveFieldsDefault,
): T {
  if (typeof data === 'string') {
    try {
      return maskSensitiveFields(JSON.parse(data), sensitiveFields);
    } catch {
      return data;
    }
  }

  if (!data || typeof data !== 'object' || Array.isArray(data)) return data;

  const maskedData = { ...data } as Record<string, any>;

  for (const key of Object.keys(maskedData)) {
    if (sensitiveFields.includes(key)) {
      maskedData[key] = '****';
    } else if (typeof maskedData[key] === 'object') {
      maskedData[key] = maskSensitiveFields(maskedData[key], sensitiveFields);
    }
  }

  return maskedData as T;
}
