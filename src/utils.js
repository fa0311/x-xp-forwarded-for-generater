const getUserAgent = async () => {
  const url =
    "https://raw.githubusercontent.com/fa0311/latest-user-agent/main/output.json";
  const res = await fetch(url);
  const data = await res.json();
  return data["chrome"];
};

const getFwdForSdkUrl = async () => {
  const url =
    "https://raw.githubusercontent.com/fa0311/TwitterInternalAPIDocument/refs/heads/develop/docs/json/ScriptLoadJson.json";
  const res = await fetch(url);
  const data = await res.json();
  const [_, value] = Object.entries(data).find(([key, _]) =>
    key.startsWith("loader.FwdForSdk")
  );
  return value;
};

const cookiesToString = (cookies) => {
  if (Array.isArray(cookies)) {
    return cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join("; ");
  } else if (typeof cookies === "object") {
    return Object.entries(cookies)
      .map(([name, value]) => `${name}=${value}`)
      .join("; ");
  }
  throw new Error("Invalid cookie format");
};

module.exports = { getUserAgent, getFwdForSdkUrl, cookiesToString };
