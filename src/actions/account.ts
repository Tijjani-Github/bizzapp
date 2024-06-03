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

const getAllColab = async () => {
  const { refreshToken } = await getrefreshtoken();

  const config = {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  };

  try {
    const res = await $Http.get("/account/collaborations", config);
    return {
      status: res.status,
      collab: res.data.colaborations,
    };
  } catch (e: any) {
    return {
      message: e?.response?.data.message,
      status: e?.response?.status,
    };
  }
};
const getAllDept = async () => {
  const { refreshToken } = await getrefreshtoken();

  const config = {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  };

  try {
    const res = await $Http.get("/account/departments", config);
    return {
      status: res.status,
      departments: res.data.departments,
    };
  } catch (e: any) {
    return {
      message: e?.response?.data.message,
      status: e?.response?.status,
    };
  }
};

const createnewagent = async (values: any) => {
  const { refreshToken } = await getrefreshtoken();
  const config = {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  };

  try {
    const res = await $Http.post("/account/auth/register", values, config);
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

const getAgentbyid = async (agentid?: string) => {
  const { refreshToken } = await getrefreshtoken();
  const config = {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  };
  try {
    const res = await $Http.get(`/account/account?id=${agentid}`, config);
    return {
      status: res.status,
      agent: res.data.agent,
    };
  } catch (e: any) {
    return {
      message: e?.response?.data.message,
      status: e?.response?.status,
    };
  }
};

export { getallaccount, createnewagent, getAgentbyid, getAllColab, getAllDept };
