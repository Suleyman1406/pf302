import bcrypt from "bcrypt";

export function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync(+process.env.BCRYPT_SALT_ROUND!);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
}

export function comparePassword(password: string, hashedPassword: string) {
  return bcrypt.compareSync(password, hashedPassword);
}
