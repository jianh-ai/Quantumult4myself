// 2024-10-17

const url = $request.url;
const method = $request.method;
const postMethod = "POST";
const notifyTitle = "贴吧json脚本错误";

let body;
try {
    body = JSON.parse($response.body);
} catch (error) {
    console.error("JSON 解析错误：", error);
    $done({});
    return;
}

console.log("Processing URL:", url);

// 删除目标路径的函数
function deleteTargetPath(data, path) {
    let parts = path.split('.');
    let last = parts.pop();
    let obj = data;

    for (let part of parts) {
        if (obj && obj.hasOwnProperty(part)) {
            obj = obj[part];
        } else {
            return data;
        }
    }

    if (obj && obj.hasOwnProperty(last)) {
        delete obj[last];
    }

    return data;
}

// 从 URL 获取参数值的函数
function getUrlParamValue(url, queryName) {
    return Object.fromEntries(url.substring(url.indexOf("?") + 1)
        .split("&")
        .map(pair => pair.split("="))
    )[queryName];
}

// 移除 goods_info 的函数
function removeGoodsInfo(app) {
    if (app?.length) {
        let goodsInfoSize = 0;
        app.forEach(item => {
            if (item.goods_info?.length) {
                goodsInfoSize++;
                item.goods_info = [];
            }
        });
        if (goodsInfoSize) {
            console.log(`去除 goods_info:${goodsInfoSize}`);
        } else {
            console.log("app 内无 goods_info");
        }
    } else {
        console.log("app 为空, 无需处理");
    }
}

// 移除直播帖子的函数
function removeLive(threadList) {
    let newThreadList = threadList;
    const beforeLength = threadList?.length;
    if (beforeLength) {
        newThreadList = threadList.filter(item => {
            if (item.ala_info) {
                console.log("去除推荐的直播帖子");
                return false;
            }
            return true;
        });
        if (beforeLength === newThreadList.length) {
            console.log("无推荐的直播帖子");
        }
    } else {
        console.log("无需处理 threadList");
    }
    return newThreadList;
}

// 根据不同的 URL 模式进行处理
if (url.includes("tiebaads/commonbatch") && method === postMethod) {
    let adCmd = getUrlParamValue(url, "adcmd");
    if (!adCmd) {
        console.log(`url:${url}`);
        $notification.post(notifyTitle, "贴吧-tiebaads/commonbatch", "adCmd 参数不存在");
    } else if (body.error_code === 0 && body.res.ad?.length) {
        body.res.ad = [];
        console.log("成功去除广告");
    }
} else if (url.includes("/sidebar/home")) {
    delete body.vip_banner;
    delete body.tools;
} else if (url.includes("/frs/frsBottom")) {
    delete body.card_activity.small_card;
    delete body.card_activity.big_card;
    delete body.ai_chatroom_guide;
} else if (url.includes("/user/profile")) {
    delete body.duxiaoman_entry;
    delete body.recom_naws_list;
    delete body.vip_banner;
    delete body.namoaixud_entry;

    const targetPaths = [
        "zone_info.1.commerce",
        "zone_info.2.banner",
        "zone_info.3.game",
    ];
    targetPaths.forEach(path => {
        body = deleteTargetPath(body, path);
    });
} else if (url.includes("c/f/pb/picpage")) {
    if (body.recom_live_list?.length) {
        body.recom_live_list = [];
        console.log("去除直播内容");
    }
} else if (url.includes("c/s/sync")) {
    if ('floating_icon' in body) {
        body.floating_icon = null;
        console.log("去除悬浮图标");
    }
    if ('advertisement_config' in body) {
        body.advertisement_config = null;
        console.log("去除广告配置");
    }
    if ('config' in body) {
        body.config.switch.forEach(item => {
            if (['platform_csj_init', 'platform_ks_init', 'platform_gdt_init'].includes(item.name)) {
                item.type = '0';
                console.log(`禁止初始化 ${item.name}`);
            }
        });
    }
    if ('screen_fill_data_result' in body) {
        body.screen_fill_data_result.screen_fill_advertisement_bear_switch = '0';
        body.screen_fill_data_result.screen_fill_advertisement_plj_cpc_switch = '0';
        body.screen_fill_data_result.screen_fill_advertisement_plj_switch = '0';
        console.log("去除开屏广告");
    }
} else if (url.includes("c/f/frs/page")) {
    body.thread_list = removeLive(body.thread_list);
    removeGoodsInfo(body.forum?.banner_list?.app);
} else {
    $notification.post(notifyTitle, "路径/请求方法匹配错误:", method + "," + url);
}

body = JSON.stringify(body);
$done({ body });