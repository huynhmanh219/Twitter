import { createHash } from "crypto";

export function sha256(data: string): string {
  return createHash("sha256").update(data).digest("hex");
}

export function passwordHash(password:string):string{
  return sha256(password+process.env.PASSWORD_SECRECT);
}