// 2024-08
const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/site/launch")) {
    if (obj.info) delete obj.info;
}

if (url.includes("/v2/meta/banner")) {
    if (obj.info) delete obj.info;
}

if (url.includes("/site/get-top")) {
    if (obj.info && obj.info.extra_banners) 
        delete obj.info.extra_banners;
}

if (url.includes("/api/v2/recommended/top")) {
    if (obj.info) delete obj.info;
}

if (url.includes("/drama/catalog-homepage")) {
    if (obj.info && obj.info.extra_banners) 
        delete obj.info.extra_banners;
}

if (url.includes("/catalog/sound-homepage")) {
    if (obj.info && obj.info.extra_banners) 
        delete obj.info.extra_banners;
}

if (url.includes("/api/v2/chatroom/sound/recommend")) {
    if (obj.info) delete obj.info;
}

if (url.includes("/site/config")) {
    if (obj.info && obj.info.teenager_popup_mode) delete obj.info.teenager_popup_mode;
}

if (url.includes("/site/icons")) 
    if (obj.info && obj.info.icons && Array.isArray(obj.info.icons)) {
        obj.info.icons = obj.info.icons.filter(icon => icon.title !== "直播" && icon.title !== "周边商城");
    }
}

if (url.includes("/discovery/list")) {
    if (obj.info) {
        for (const index in obj.info) {
            obj.info[index] = obj.info[index].filter(item => {
                return !(item.title === '直播间' || item.title === '广播剧' || item.title === '免流服务');
            });
        }
    }
}

$done({body: JSON.stringify(obj)});
