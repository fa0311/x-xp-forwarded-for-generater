const fs = require("fs/promises");
require("./../tinygo/targets/wasm_exec.js");
const { getUserAgent, getFwdForSdkUrl, cookiesToString } = require("./utils");
const { fwdForSdkExpoter } = require("./expoter");

(async () => {
  const userAgent = await getUserAgent();
  const cookies = JSON.parse(await fs.readFile("cookies.json", "utf-8"));

  global.navigator.userActivation = { hasBeenActive: false };
  global.navigator.__defineGetter__("userAgent", () => userAgent);
  global.document = { cookie: cookiesToString(cookies) };
  const wasmData = await fwdForSdkExpoter(await getFwdForSdkUrl());
  const go = new Go();

  const wasmModule = await WebAssembly.instantiate(wasmData, {
    env: {
      memory: new WebAssembly.Memory({
        initial: 10,
        limit: 100,
      }),
      table: new WebAssembly.Table({
        initial: 0,
        element: "anyfunc",
      }),
    },
    ...go.importObject,
  });

  go.run(wasmModule.instance);
  const forwardedForStr = global.getForwardedForStr();
  console.log(forwardedForStr);
})();
