"use server";

import { LoginSchema, RegisterSchema } from "@/schema";
import * as z from "zod";
import { baseurl } from "@/utils";
import Calls from "./axios";
import { auth } from "@/auth";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

const $Http = Calls(baseurl);

interface DecodedToken {
  exp: number;
}

const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Login Failed. Please check your email and password.",
    };
  }

  const { identifier, password } = validatedFields.data;
  const cookie = cookies();

  const loginvalues = { identifier, password };

  try {
    const res = await $Http.post("/account/auth/login", loginvalues);

    cookie.set("access_token", res.data.refreshToken, {
      maxAge: 60 * 60 * 24,
      httpOnly: true,
      path: "/",
      priority: "high",
    });
    const user = { ...res.data.user, refreshToken: res.data.refreshToken };
    return {
      status: res.status,
      message: res.data.message,
      user: user,
    };
  } catch (e: any) {
    return {
      message: e?.response?.data.message,
      status: e?.response?.status,
    };
  }
};

const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Login Failed. Please check your email and password.",
    };
  }

  const {
    email,
    fullName,
    username,
    password,
    passwordConfirm,
    image,
    location,
    role,
    department,
    gender,
  } = validatedFields.data;

  if (password !== passwordConfirm) {
    return {
      error: "Password and Confirm Password do not match.",
    };
  }

  const userdata = {
    email,
    fullName,
    username,
    password,
    gender,
    image,
    location,
    role,
    department,
  };

  try {
    const res = await $Http.post("/account/auth/register", userdata);

    return {
      status: res.status,
      message: res.data.message,
      user: res.data.user,
    };
  } catch (e: any) {
    return {
      message: e?.response?.data.message,
      status: e?.response?.status,
    };
  }
};

const getrefreshtoken = async () => {
  const cookie = cookies();
  const refresh = cookie.get("access_token")?.value;

  if (!refresh) {
    return {
      status: 401,
      message: "No refresh token available",
    };
  }

  const config = {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      accept: "application/json",
      Authorization: `Bearer ${refresh}`,
    },
  };

  try {
    const decoded: DecodedToken | null = jwtDecode<DecodedToken>(refresh!);

    if (!decoded) {
      return {
        status: 401,
        message: "Invalid token",
      };
    }

    const expInMilliseconds = decoded.exp * 1000;
    const expirationDate = new Date(expInMilliseconds);

    const oneHourFromNow = new Date(Date.now() - 3600000);

    if (expirationDate > oneHourFromNow) {
      return {
        status: 200,
        refreshToken: refresh,
      };
    }

    const res = await $Http.get("/account/auth/refresh-token", config);

    cookie.set("access_token", res.data.refreshToken, {
      maxAge: 60 * 60 * 24,
      httpOnly: true,
      path: "/",
      priority: "high",
    });

    return {
      status: res.status,
      refreshToken: res.data.refreshToken,
    };
  } catch (e: any) {
    return {
      message: e?.response?.data.message,
      status: e?.response?.status,
    };
  }
};

export { login, register, getrefreshtoken };
