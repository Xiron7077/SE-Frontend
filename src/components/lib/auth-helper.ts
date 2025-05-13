'use client'

import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL, // Set the base url, for maximum control, switch this to an environment variable
  timeout: 2000, // Timeout after 2 seconds
  // headers: {
  //   Authorization: "Bearer " + "hello", // Preset the auth header if you're already logged in
  // },
});

async function healthcheck() {
  try {
    await axiosInstance.get("");
    console.log("Health check successful");
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error({
        code: error.code,
        response: error.message,
      });
    }
  }
}

// healthcheck();

// You can also add a custom healthcheck similar verify function that allows you check if the user is authenticated

// Starting with basic auth
interface AuthTokensPayload {
  id: string;
  accessToken: string;
  refreshToken: string;
}

function handleAuthTokens({ id, accessToken, refreshToken }: AuthTokensPayload) {
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("id", id); // Modify as needed

  sessionStorage.setItem("accessToken", accessToken);
  axiosInstance.defaults.headers.common.Authorization = "Bearer " + accessToken;

  return id;
}

// Signup
interface SignupParams {
  email: string;
  password: string;
  username: string;
}

type Pair = [boolean, string];
async function signup({ email, password, username }: SignupParams): Promise<Pair> {
  try {
    console.log(email, password, username);
    const response = await axiosInstance.post("auth/signup", {
      email,
      password,
      username,
    });
    console.log(response.data);

    const id = handleAuthTokens(response.data as AuthTokensPayload);
    sessionStorage.setItem("twoFA", "0");

    console.log("Signup successful");
    return [true, id];

  } catch (error) {
    console.log("Signup failed");
    if (error instanceof AxiosError) {
      console.error({
        code: error.code,
        response: error.message,
      });
      return [false, '0']; // do you need the message? what will you do with the message?
    }

    return [false, '0']; // otherwis
  }
}

// Login
interface LoginParams {
  email: string;
  password: string;
}
async function login({ email, password }: LoginParams): Promise<Pair> {
  try {
    const response = await axiosInstance.post("auth/login", {
      email,
      password,
    });

    const id = handleAuthTokens(response.data as AuthTokensPayload);
    sessionStorage.setItem("twoFA", "0");

    console.log("Login succesful");
    return [true, id];

  } catch (error) {
    console.log("Login failed");
    if (error instanceof AxiosError) {
      return [false, "0"]; // do something else if you need to
    }

    return [false, "0"];
  }
}

// Refresh
async function refresh(): Promise<boolean> {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    localStorage.removeItem("refreshToken");

    const response = await axiosInstance.post("auth/refresh", { refreshToken });

    handleAuthTokens(response.data as AuthTokensPayload);
    sessionStorage.setItem("twoFA", "0");

    console.log("Refresh succesful");
    return true;
  } catch (error) {
    console.log("Refresh failed");
    if (error instanceof AxiosError) {
      return false;
    }

    return false;
  }
}

// Logout
async function logout(): Promise<boolean> {
  try {
    const accessToken = sessionStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    await axiosInstance.post("auth/logout", {
      accessToken,
      refreshToken
    }); // Returns nothing useful

    console.log("Logout succesful");
    return true;
  } catch (error) {
    console.log("Logout failed");
    if (error instanceof AxiosError) {
      return false;
    }

    return false;
  }
}

// Logout everywhere
async function logoutEverywhere(): Promise<boolean> {
  try {
    await axiosInstance.delete("auth/logout-everywhere"); // Returns nothing useful

    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    sessionStorage.setItem("twoFA", "0");

    console.log("Logout Everywhere succesful");
    return true;
  } catch (error) {
    console.log("Logout Everywhere failed");
    if (error instanceof AxiosError) {
      return false;
    }

    return false;
  }
}

// Verify
async function verify(): Promise<boolean> {
  try {
    await axiosInstance.get("auth/verify");

    console.log("Verify successful");
    return true;
  } catch (error) {
    console.log("Verify failed");
    if (error instanceof AxiosError) {
      return false;
    }

    return false;
  }
}

// Send Reset Password Mail
interface SendResetPasswordMailParams {
  email: string;
}
async function sendResetPasswordMail({ email }: SendResetPasswordMailParams): Promise<boolean> {
  try {
    await axiosInstance.post("auth/send-reset-password-email?email=" + email);

    console.log("Send Reset Password Mail sucessful");
    return true;
  } catch (error) {
    console.log("Send Reset Password Mail failed");
    if (error instanceof AxiosError) {
      return false;
    }

    return false;
  }
}

// Reset Password
interface ResetPasswordParams {
  email: string;
  newPassword: string;
  otp: string;
}
async function resetPassword({ email, newPassword, otp }: ResetPasswordParams): Promise<boolean> {
  try {
    await axiosInstance.post("auth/reset-password", {
      email,
      newPassword,
      otp,
    });

    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    sessionStorage.setItem("twoFA", "0");

    console.log("Reset Password successful");
    return true;
  } catch (error) {
    console.log("Reset Password failed");
    if (error instanceof AxiosError) {
      return false;
    }

    return false;
  }
}

// Send 2FA Otp through Email
async function send2FAOtp(): Promise<boolean> {
  try {
    await axiosInstance.post("auth/two-fa/send-otp");

    console.log("Send 2FA Otp succesful");
    return true;
  } catch (error) {
    console.log("Send 2FA Otp failed");
    if (error instanceof AxiosError) {
      return false;
    }

    return false;
  }
}

// Verify 2FA Otp through Email
interface OtpParams {
  otp: string;
}
async function verify2FAOtpThroughEmail({ otp }: OtpParams): Promise<boolean> {
  try {
    const response = await axiosInstance.post("auth/two-fa/verify-email-otp", { otp });

    handleAuthTokens(response.data as AuthTokensPayload);
    sessionStorage.setItem("twoFA", "1");
    console.log("Verify 2FA Otp succesful");
    return true;
  } catch (error) {
    console.log("Verify 2FA Otp failed");
    if (error instanceof AxiosError) {
      return false;
    }

    return false;
  }
}

// Generate 2FA QR code
async function generate2FAQRCode(): Promise<string | false> {
  try {
    const response = await axiosInstance.post("auth/two-fa/generate");

    console.log("Generate 2FA QR Code succesful");
    return response.data;
  } catch (error) {
    console.log("Generate 2FA QR Code failed");
    if (error instanceof AxiosError) {
      return false;
    }

    return false;
  }
}

// Verify Authenticator OTP for 2FA
async function verify2FAOtpThroughAuthenticator({ otp }: OtpParams) {
  try {
    const response = await axiosInstance.post("auth/two-fa/verify-authenticator-otp", { otp });

    handleAuthTokens(response.data as AuthTokensPayload);
    sessionStorage.setItem("twoFA", "1");
    console.log("Verify 2FA Otp succesful");
    return true;
  } catch (error) {
    console.log("Verify 2FA Otp failed");
    if (error instanceof AxiosError) {
      return false;
    }

    return false;
  }
}

// Verify 2FA Authentication Status
async function verify2FA() {
  try {
    await axiosInstance.get("auth/two-fa/verify");

    console.log("Verify successful");
    return true;
  } catch (error) {
    console.log("Verify failed");
    if (error instanceof AxiosError) {
      return false;
    }

    return false;
  }
}

// Google OAuth
interface GoogleLoginParams {
  code: string;
}
async function googleLogin({ code }: GoogleLoginParams) : Promise<Pair> {
  try {
    const response = await axiosInstance.post("auth/google/login", { code });

    const id = handleAuthTokens(response.data as AuthTokensPayload);
    sessionStorage.setItem("twoFA", "0");
    console.log("Google Login successful");
    return [true, id];
  } catch (error) {
    console.log("Google Login failed");
    if (error instanceof AxiosError) {
      return [false, '0'];
    }

    return [false, '0'];
  }
}

export {
  signup,
  login,
  refresh,
  logout,
  logoutEverywhere,
  verify,
  sendResetPasswordMail,
  resetPassword,
  send2FAOtp,
  verify2FAOtpThroughEmail,
  generate2FAQRCode,
  verify2FAOtpThroughAuthenticator,
  verify2FA,
  googleLogin,
};
