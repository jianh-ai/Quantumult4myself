// 2024-08-10

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/site/icons")) {
    if (obj.info && obj.info.icons && Array.isArray(obj.info.icons)) {
        obj.info.icons = obj.info.icons.filter(icon => icon.title !== "直播" && icon.title !== "周边商城");
    }
} 

if (url.includes("/discovery/list")) {
    for (const index in obj.info) {
        obj.info[index] = obj.info[index].filter(item => {
          return !(item.title === '直播间' || item.title === '广播剧' || item.title === '免流服务')
        })
    }
} 

// 首页 - 直播 - 热门 - 主播横幅推广
if (url.includes("/api/v2/meta/banner")) {
  delete obj.info;
}

// 首页 - 推荐 - 热门搜索词、轮播图推广
if (url.includes("/site/get-top")) {
  delete obj.info.extra_banners;
}

// 首页 - 推荐 - 主播推荐列表
if (url.includes("/api/v2/recommended/top")) {
  delete obj.info;
}

// 首页 - 广播剧 - 轮播图推广、热门搜索词
if (url.includes("/drama/catalog-homepage")) {
  delete obj.info.extra_banners;
}

// 首页 - 声音恋人 - 轮播图推广、热门搜索词
if (url.includes("/catalog/sound-homepage")) {
  delete obj.info.extra_banners;
}

// 播放器 - 主播推荐
if (url.includes("/api/v2/chatroom/sound/recommend")) {
  delete obj.info;
}

// 青少年模式
if (url.includes("/site/config")) {
  delete obj.info.teenager_popup_mode;
}

// 首页顶部标签
if (url.includes("/site/launch")) {
  delete obj.info;
}

$done({body: JSON.stringify(obj)});