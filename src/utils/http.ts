import { config } from "./config";

type RequestBodyType = {
  [k: string]: FormDataEntryValue | Object;
};

// const transactionId = localStorage.getItem("transaction-id");

async function postMethod(endpoint: string, requestBody: RequestBodyType) {
  const res = await fetch(`${config.apiUrl}/api/${endpoint}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  return res;
}

async function putMethod(endpoint: string, requestBody: RequestBodyType) {
  const res = await fetch(`${config.apiUrl}/api/${endpoint}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  return res;
}

async function getMethod(endpoint: string) {
  const res = await fetch(`${config.apiUrl}/api/${endpoint}`, {
    credentials: "include",
  });

  return res;
}

export const http = {
  post: postMethod,
  get: getMethod,
  put: putMethod,
};
