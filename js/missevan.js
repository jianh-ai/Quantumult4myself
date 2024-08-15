// 2024-08
const url = $request.url;
if (!$response.body) $done({});

let obj = JSON.parse($response.body);

if (url.includes("/site/launch")) {
    delete obj.info;
}

if (url.includes("/v2/meta/banner")) {
    delete obj.info;
}

if (url.includes("/site/get-top")) {
    delete obj.info.extra_banners;
}

if (url.includes("/api/v2/recommended/top")) {
    delete obj.info;
}

if (url.includes("/drama/catalog-homepage")) {
    delete obj.info.extra_banners;
}

if (url.includes("/catalog/sound-homepage")) {
    delete obj.info.extra_banners;
}

if (url.includes("/api/v2/chatroom/sound/recommend")) {
    delete obj.info;
}
if (url.includes("/site/config")) {
    delete obj.info.teenager_popup_mode;
}

if (url.includes("/site/icons")) {
    if (obj.info && obj.info.icons && Array.isArray(obj.info.icons)) {
        obj.info.icons = obj.info.icons.filter(icon => icon.title !== "直播" && icon.title !== "周边商城");
    }
} else (url.includes("/discovery/list")) {
    for (const index in obj.info) {
        obj.info[index] = obj.info[index].filter(item => {
          return !(item.title === '直播间' || item.title === '广播剧' || item.title === '免流服务')
        })
    }
} 

$done({body: JSON.stringify(obj)});
