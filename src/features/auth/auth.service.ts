"use server";

import { APIBASE_URL } from "@/lib/config";
import { ResponseError } from "@/lib/error";

export const generateSignInQRCode = async (client: string) => {
  try {
    const res = await fetch(`${APIBASE_URL}/api/auth/generate-code/${client}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = (await res.json()) as {
      data: string;
      status: boolean;
      message: string;
    };

    if (!data.status) {
      throw new ResponseError(data.message, false);
    }

    return data.data;
  } catch (error) {
    console.error(error);
    throw error
  }
};
