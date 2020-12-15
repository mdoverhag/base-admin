const fs = require("fs");
const path = require("path");

const JS_DIR = path.resolve("./build/static/js");

const copyJavaScriptSource = async () => {
  const files = await fs.promises.readdir(JS_DIR);
  for (file of files) {
    if (/^runtime-main\.[0-9a-f]{8}\.js$/.test(file)) {
      await fs.promises.copyFile(
        path.join(JS_DIR, file),
        path.join(JS_DIR, "runtime-main.js")
      );
    }
    if (/^main\.[0-9a-f]{8}\.chunk.js$/.test(file)) {
      await fs.promises.copyFile(
        path.join(JS_DIR, file),
        path.join(JS_DIR, "main.chunk.js")
      );
    }
    if (/^2\.[0-9a-f]{8}\.chunk.js$/.test(file)) {
      await fs.promises.copyFile(
        path.join(JS_DIR, file),
        path.join(JS_DIR, "2.chunk.js")
      );
    }
  }
};

copyJavaScriptSource();
