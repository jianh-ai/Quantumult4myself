// 2024-08-11

const url = $request.url;
const header = $request.headers;
const contype = header["Content-Type"] || header["content-type"];
const headopt = header["Operation-Type"] || header["operation-type"];
const ua = header["User-Agent"] || header["user-agent"];
const isQuanX = typeof $task !== "undefined";

if (url.includes("/sec.sginput.qq.com/q")) {
  // 搜狗输入法候选词推广
  if (isQuanX) {
    if (contype === "application/octet-stream") {
      $done({ status: "HTTP/1.1 404 Not Found" });
    } else {
      $done({});
    }
  } else {
    if (contype === "application/octet-stream") {
      $done();
    } else {
      $done({});
    }
  }
} else {
  $done({});
}