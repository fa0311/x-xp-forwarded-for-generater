const fwdForSdkExpoter = async (url) => {
  const res = await fetch(url);
  const data = await res.text();
  const regex = "Uint8Array\\(n\\)\\.set\\(\\[(.*?)\\]\\)";
  const json = "[" + data.match(regex)[1] + "]";
  const obj = JSON.parse(json);
  return new Uint8Array(obj);
};

module.exports = { fwdForSdkExpoter };
