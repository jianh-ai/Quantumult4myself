// 2024-08
const url = $request.url;
if (!$response.body) $done({});

let newUrl = url;

// 检查 URL 中是否包含 data 参数
if (newUrl.includes("data=")) {
    // 移除 data 参数及其值
    newUrl = newUrl.replace(/data=.*?(&|$)/, '');
    // 如果 URL 最后有多余的 & 或 ? 符号，清理掉
    newUrl = newUrl.replace(/(\?|&)$/, '');
}

// 解析并处理响应体
let obj = JSON.parse($response.body);

// 处理其他逻辑（例如前面合并的代码逻辑）
if (newUrl.includes("mtop.taobao.idle.user.action.strategy")) {
    if (obj && obj.data) {
        delete obj.data;
    }
}

if (newUrl.includes("/gw/mtop.taobao.idlehome.home.nextfresh")) {
    if (obj.data && obj.data.sections) {
        obj.data.sections = obj.data.sections.filter(section => {
            if (section.template && section.template.name === "fish_home_advertise_card_d4") {
                return false; // 删除该数组项
            }
            return true; // 保留该数组项
        });
    }
}

$done({ url: newUrl, body: JSON.stringify(obj) });
