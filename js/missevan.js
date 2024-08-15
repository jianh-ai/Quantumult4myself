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

$done({body: JSON.stringify(obj)});
