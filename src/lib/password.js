import bcrypt from "bcrypt";

export async function hashPassword(plainText) {
  return bcrypt.hash(plainText, 12);
}

export async function verifyPassword(plainText, hash) {
  if (!hash) return false;
  return bcrypt.compare(plainText, hash);
}
