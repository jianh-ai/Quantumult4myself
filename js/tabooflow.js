// 保存最近请求的时间戳和URL
let requestCache = new Map();
const DUPLICATE_INTERVAL = 172800000; // 172800 seconds = 48 hours

// 获取当前时间戳
const getCurrentTimestamp = () => new Date().getTime();

// 匹配特定 URL 的正则表达式
const urlPattern = /http:\/\/amdc\.m\.taobao\.com\/amdc\/mobileDispatch\?appkey=\d+&v=\d+\.\d+&appVersion=\d+\.\d+\.\d+&cv=\d+/;

// 检查并拒绝重复请求
function shouldRejectRequest(url) {
    const currentTime = getCurrentTimestamp();
    if (requestCache.has(url)) {
        const lastRequestTime = requestCache.get(url);
        if (currentTime - lastRequestTime < DUPLICATE_INTERVAL) {
            return true;
        }
    }
    requestCache.set(url, currentTime);
    return false;
}

// 请求拦截逻辑
function onRequest(request) {
    if (urlPattern.test(request.url) && shouldRejectRequest(request.url)) {
        console.warn(`Duplicate request detected and blocked: ${request.url}`);
        request.abort(); // 拒绝请求
    }
}

// 注册请求拦截器
addEventListener('beforeRequest', onRequest);
