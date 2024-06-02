"use server";
import { baseurl } from "@/utils";
import { getrefreshtoken } from "./auth";
import Calls from "./axios";

const $Http = Calls(baseurl);

const getallaccount = async () => {
  const { refreshToken } = await getrefreshtoken();

  const config = {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  };

  try {
    const res = await $Http.get("/account/accounts", config);
    return {
      status: res.status,
      accounts: res.data.accounts,
    };
  } catch (e: any) {
    return {
      message: e?.response?.data.message,
      status: e?.response?.status,
    };
  }
};

export { getallaccount };
