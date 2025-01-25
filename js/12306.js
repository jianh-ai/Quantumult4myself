// 2024-10-19

const url = $request.url;
const header = $request.headers;
const contype = header["Content-Type"] || header["content-type"];
const headopt = header["Operation-Type"] || header["operation-type"];
const ua = header["User-Agent"] || header["user-agent"];
const isQuanX = typeof $task !== "undefined";

if (url.includes("/mobile.12306.cn/otsmobile/app/mgs/")) {
  // 12306页面内容
  const list12306 = [
    "com.cars.otsmobile.integration.activityBanner", // 活动横幅
    "com.cars.otsmobile.memberInfo.getMemberQa", // 铁路会员 常见问题
    "com.cars.otsmobile.newHomePage.initData", // 热门资讯
    "com.cars.otsmobile.newHomePageBussData", // 商品信息流
    "com.cars.otsmobile.paySuccBuss.bussEntryShow" // 商业推广
  ];
  if (isQuanX) {
    if (list12306?.includes(headopt)) {
      $done({ status: "HTTP/1.1 404 Not Found" });
    } else {
      $done({});
    }
  } else {
    if (list12306?.includes(headopt)) {
      $done();
    } else {
      $done({});
    }
  }
} else {
  // 处理广告内容
  let body = "";
  let obj = JSON.parse($request.body);

  if (obj.placementNo === "0007") {
    body =
      '{"code":"00","materialsList":[{"billMaterialsId":"255","filePath":"h","creativeType":1}],"advertParam":{"skipTime":1}}';
  } else if (obj.placementNo === "G0054") {
    body = '{"code":"00","materialsList":[]}';
  } else {
    body = '{"code":"00","message":"无广告返回"}';
  }

  if (isQuanX) {
    $done({ body });
  } else {
    $done({ response: { body } });
  }
}