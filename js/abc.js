// 2024-08-11 13:40

const url = $request.url;
const header = $request.headers;
const contype = header["Content-Type"] || header["content-type"];
const headopt = header["Operation-Type"] || header["operation-type"];
const ua = header["User-Agent"] || header["user-agent"];
const isQuanX = typeof $task !== "undefined";

if (url.includes("/mobilepaas.abchina.com.cn:441/mgw")) {
  // 中国农业银行开屏广告
  const listbankabc = [
    "com.bankabc.recommendcenter.homepage.gethpadverinfo",
    "com.abchina.mbank.common.homepage.getStartParam"
  ];
  if (isQuanX) {
    if (listbankabc?.includes(headopt)) {
      $done({ status: "HTTP/1.1 404 Not Found" });
    } else {
      $done({});
    }
  } else {
    if (listbankabc?.includes(headopt)) {
      $done();
    } else {
      $done({});
    }
  }
} else {
  $done({});
}