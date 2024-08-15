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

$done({body: JSON.stringify(obj)});
