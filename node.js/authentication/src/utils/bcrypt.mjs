import bcrypt from "bcrypt";

export function hashPassword(password) {
  const salt = bcrypt.genSaltSync(+process.env.BCRYPT_SALT_ROUND);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
}

export function comparePassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}
