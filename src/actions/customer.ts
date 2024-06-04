"use server";
import { baseurl } from "@/utils";
import Calls from "./axios";
import { getrefreshtoken } from "./auth";

const $Http = Calls(baseurl);

const createnewcustomers = async (values: any) => {
  try {
    const res = await $Http.post("/customers/register", values);
    return {
      status: res.status,
      customer: res.data.data,
      message: res.data.message,
    };
  } catch (e: any) {
    return {
      message: e?.response?.data.message,
      status: e?.response?.status,
      customer: e.response.data.data,
    };
  }
};

const gettemplates = async () => {
  try {
    const res = await $Http.get("/templates");
    return {
      status: res.status,
      templates: res.data.templates,
      message: res.data.message,
    };
  } catch (e: any) {
    return {
      message: e?.response?.data.message,
      status: e?.response?.status,
    };
  }
};

const createComplain = async (customerId: string, description: string) => {
  const values = { customerId, description };
  try {
    const res = await $Http.post("/customers/complaint", values);
    return {
      status: res.status,
      complain: res.data.data,
      message: res.data.message,
    };
  } catch (e: any) {
    return {
      message: e?.response?.data.message,
      status: e?.response?.status,
    };
  }
};

const getAllCustomers = async () => {
  const { refreshToken } = await getrefreshtoken();

  const config = {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  };

  try {
    const res = await $Http.get("/customers", config);
    return {
      status: res.status,
      customers: res.data.data,
      message: res.data.message,
    };
  } catch (e: any) {
    return {
      message: e?.response?.data.message,
      status: e?.response?.status,
    };
  }
};

const getcomplainbyId = async (id: string) => {
  try {
    const res = await $Http.get(`/complains?id=${id}`);
    return {
      status: res.status,
      complain: res.data.data,
      message: res.data.message,
    };
  } catch (e: any) {
    return {
      message: e?.response?.data.message,
      status: e?.response?.status,
    };
  }
};

const getAllcomplains = async () => {
  const { refreshToken } = await getrefreshtoken();

  const config = {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  };

  try {
    const res = await $Http.get("/complains", config);
    return {
      status: res.status,
      complains: res.data.data,
      message: res.data.message,
    };
  } catch (e: any) {
    return {
      message: e?.response?.data.message,
      status: e?.response?.status,
    };
  }
};
export {
  createnewcustomers,
  gettemplates,
  createComplain,
  getAllCustomers,
  getAllcomplains,
  getcomplainbyId,
};
