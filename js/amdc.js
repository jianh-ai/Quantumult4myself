// 2024-08-07

const url = $request.url;
const header = $request.headers;
const headopt = header["Operation-Type"] || header["operation-type"];
const ua = header["User-Agent"] || header["user-agent"];
const isQuanX = typeof $task !== "undefined";

if (url.includes("/amdc/mobileDispatch")) {
  if (
    ua.includes("Alibaba") || // 阿里巴巴
    ua.includes("AMapiPhone") || // 高德地图
    ua.includes("TmallCampus") || //天猫校园
    ua.includes("Cainiao4iPhone") || // 菜鸟
    ua.includes("%E4%BC%98%E9%85%B7") || // 优酷
    ua.includes("%E9%97%B2%E9%B1%BC") || // 咸鱼 
    ua.includes("%E6%B7%98%E5%AE%9D") || // 淘宝
    ua.includes("%E9%A3%9E%E7%8C%AA%E6%97%85%E8%A1%8C") // 飞猪旅行
  ) {
    if (isQuanX) {
      $done({ status: "HTTP/1.1 404 Not Found" });
    } else {
      $done();
    }
  } else {
    $done({});
  }
} else {
  $done({});
}