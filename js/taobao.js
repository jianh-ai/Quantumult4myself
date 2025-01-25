// 2024-10-17

const url = $request.url;
const isResp = typeof $response !== "undefined";
let body = $response.body;

if (isResp) {
  try {
    let obj = JSON.parse(body);

    if (/^https:\/\/guide-acs\.m\.taobao\.com\/gw\/mtop\.taobao\.cloudvideo\.video\.query/.test(url)) {
      // 淘宝-开屏视频广告
      if (obj?.data) {
        obj.data.duration = "0";
        obj.data.resources = [];
        obj.data.caches = [];
        obj.data.respTimeInMs = "3818332800000";
      }
    } else if (/^https:\/\/guide-acs\.m\.taobao\.com\/gw\/mtop\.taobao\.wireless\.home\.splash\.awesome\.get/.test(url)) {
      // 淘宝-开屏图片广告
      const splash = obj?.data?.containers?.splash_home_base?.base?.sections;
      if (splash?.length > 0) {
        splash.forEach(section => {
          const splashData = section?.bizData?.["taobao-splash"]?.data;
          if (splashData?.length > 0) {
            splashData.forEach(item => {
              Object.assign(item, {
                waitTime: "0",
                times: "0",
                hotStart: "false",
                haveVoice: "false",
                hideTBLogo: "false",
                enable4G: "false",
                coldStart: "false",
                startTime: "3818332800000",
                endTime: "3818419199000",
                gmtStart: "2090-12-31 00:00:00",
                gmtEnd: "2090-12-31 23:59:59",
                gmtStartMs: "3818332800000",
                gmtEndMs: "3818419199000",
                imgUrl: "",
                videoUrl: ""
              });
            });
          }
        });
      }
    } else if (/^https:\/\/poplayer\.template\.alibaba\.com\/\w+\.json/.test(url)) {
      // 淘宝-开屏活动
      if (obj?.res) {
        obj.res.images = [];
        obj.res.videos = [];
      }
      if (obj?.enable !== undefined) {
        obj.enable = false;
      }
      if (obj?.mainRes) {
        obj.mainRes.images = [];
      }
    } else {
      $done({});
      return;
    }

    body = JSON.stringify(obj);
  } catch (err) {
    console.log(`处理请求出错: ` + err);
  }
}

$done({ body });