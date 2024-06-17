const url = $request.url;
const header = $request.headers;
const ua = header["User-Agent"] || header["user-agent"];
const isQuanX = typeof $task !== "undefined";

// 用于存储请求的缓存（简单示例，生产环境应使用更持久的存储）
const requestCache = {};

function isDuplicateRequest(requestUrl) {
  const now = Date.now();
  const cacheEntry = requestCache[requestUrl];
  
  // 定义缓存过期时间（例如 10 秒）
  const CACHE_EXPIRY_TIME = 10 * 1000; 

  if (cacheEntry && (now - cacheEntry < CACHE_EXPIRY_TIME)) {
    return true;
  } else {
    // 更新缓存时间
    requestCache[requestUrl] = now;
    return false;
  }
}

if (url.includes("/amdc/mobileDispatch")) {
  if (
    ua.includes("Taobao4iPhone") || // 淘宝
    ua.includes("%E6%B7%98%E5%AE%9D") // 淘宝（编码）
  ) {
    if (isDuplicateRequest(url)) {
      // 检测到重复请求，返回 404 响应
      if (isQuanX) {
        $done({ status: "HTTP/1.1 404 Not Found" });
      } else {
        $done();
      }
    } else {
      // 正常处理请求
      $done({});
    }
  } else {
    // 非淘宝的请求，按原逻辑处理
    if (
      ua.includes("AMapiPhone") || // 高德地图
      ua.includes("Alibaba") || // 阿里巴巴
      ua.includes("TmallCampus") || // 天猫校园
      ua.includes("Cainiao4iPhone") || // 菜鸟
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
  }
} else {
  $done({});
}
