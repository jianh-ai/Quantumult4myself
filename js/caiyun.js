// 2024-07
const url = $request.url;
let header = $request.headers;
let responseBody = JSON.parse($response.body);

if (url.includes("/v2/user")) {
    responseBody.result.is_vip = 1;
    responseBody.result.svip_expired_at = 1892260800;
    responseBody.result.wt.vip.expired_at = 1892260800;
    responseBody.result.svip_take_effect = 1;
    responseBody.result.vip_type = "s";
} else if (url.includes("/api.caiyunapp.com/v1/activity")) {
    if (url.includes("&type_id=A03&")) {
        // 底栏控制项目 主页图标 天气助手 彩云ai
        if (responseBody?.interval) {
            responseBody.interval = 2592000; // 30天
        }
        if (responseBody?.activities?.length > 0) {
            for (let item of responseBody.activities) {
                if (item?.name && item?.type && item?.feature) {
                    item.feature = false;
                }
            }
        }
    } else {
        // 其他请求
        responseBody = {
            status: "ok",
            interval: 2592000,
            id: "1",
            activities: [
                {
                    items: [{ text: "", image_light: "", link: "", activity_name: "", id: "1", image_dark: "" }],
                    type: "activity_icon",
                    name: "",
                    carousel: "5000"
                }
            ]
        };
    }
} else if (url.includes("/wrapper.cyapi.cn/v1/activity")) {
    // 彩云推广
    if (url.includes("&type_id=A03&")) {
        // 天气助手 彩云ai
        if (responseBody?.interval) {
            responseBody.interval = 2592000; // 30天
        }
        if (responseBody?.activities?.length > 0) {
            responseBody.activities = [];
        }
    } else {
        // 其他请求
        responseBody = {
            status: "ok",
            interval: 2592000,
            id: "1",
            activities: [
                {
                    items: [{ text: "", image_light: "", link: "", activity_name: "", id: "1", image_dark: "" }],
                    type: "activity_icon",
                    name: "",
                    carousel: "5000"
                }
            ]
        };
    }
} else if (url.includes("activity")) {
    if (url.includes("type_id=A03")) {
        responseBody = {
            status: "ok",
            activities: [{ type: "tabbar", name: "aichat", feature: !1 }]
        };
    } else {
        responseBody = {
            status: "ok",
            activities: [{ items: [{}] }]
        };
    }
} else if (url.includes("operation/homefeatures")) {
    responseBody = { data: [] };
} else if (url.includes("operation/feeds")) {
    responseBody.data = responseBody.data.filter(e => e.category_times_text.includes("人查看"));
} else if (url.includes("operation/banners")) {
    responseBody = {
        data: [{
            avatar: "https://cdn-w.caiyunapp.com/p/app/operation/prod/banner/668502d5c3a2362582a2a5da/d9f198473e7f387d13ea892719959ddb.jpg",
            url: "https://cdn-w.caiyunapp.com/p/app/operation/prod/article/66850143c3a2362582a2a5d9/index.html",
            title: "暴雨来袭，这些避险“秘籍”你学会了吗？",
            banner_type: "article"
        }]
    };
} else if (url.includes("operation/features")) {
    responseBody.data = responseBody.data.filter(e => e.url.includes("cy://"));
} else if (url.includes("campaigns")) {
    responseBody = {
        campaigns: [{
            name: "driveweather",
            title: "驾驶天气新功能",
            url: "cy://page_driving_weather",
            cover: "https://cdn-w.caiyunapp.com/p/banner/test/668d442c4fe75aca7251c161.png"
        }]
    };
} else if (url.includes("notification/message_center")) {
    responseBody = { messages: [] };
} else if (url.includes("config/cypage")) {
    responseBody = { popups: [], actions: [] };
}

$done({ body: JSON.stringify(responseBody) });
