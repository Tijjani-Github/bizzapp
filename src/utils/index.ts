import { type ClassValue, clsx } from "clsx";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to find the pathname with the most similarity
export function findMostSimilarPathname(url: string, params: Params) {
  const items = params?.slug || params?.id;
  if (!items) return url;

  let parts = url.split("/");
  let partsToRemove = items.length;
  let modifiedParts = parts.slice(0, -partsToRemove);

  return modifiedParts.join("/");
}

export const baseurl = `${process.env.NEXT_PUBLIC_BASEURL}/api/account`;



export function maskEmail(email: string): string {
  const [localPart, domain] = email.split("@");
  if (localPart.length <= 2) {
    return `${localPart}***@${domain}`;
  }
  const maskedLocalPart = `${localPart.slice(0, 2)}***`;
  return `${maskedLocalPart}@${domain}`;
}

/**
 * Shrink a string to a specified length(len).
 * @function shrinkString
 * @param {string} str
 * @param {number} len
 * @returns {string}
 */
export const shrinkString = ({
  str,
  len,
}: {
  str?: string;
  len: number;
}): string => {
  if (!str) return "";
  if (str.length > len) {
    return str.substring(0, len) + "...";
  }
  return str;
};

/**
 * Returns an Encrypted a string .
 * @function encryptString - Encodes or encrypts a string using a base64 Buffer
 * @returns A encoded string .
 */
export const encryptString = (str?: string): string => {
  if (!str) return "";
  const buffer = Buffer.from(str);
  return buffer.toString("base64");
};

/**
 * Decodes and Returns a string .
 * @function decryptString - Decodes or decrypts an encrypted string Buffer
 * @returns A decoded string .
 */

export const decryptString = (str?: string): string => {
  if (!str) return "";
  const buffer = Buffer.from(str, "base64");
  return buffer.toString();
};
