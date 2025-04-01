export const getEnv = (key: string) => {
  const value = process.env[key];
  if (!value) throw new Error(`'${key}' 환경변수를 찾을 수 없습니다.`);

  return value;
};
