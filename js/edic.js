const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

const keysToRemove = [
    'adv_action',
    'adv_area_show',
    'adv_des',
    'adv_is_require_login'
];

if (url.includes("mtop.taobao.idle.user.action.strategy")) {
    // 删除指定的键
    keysToRemove.forEach(key => {
        delete obj[key];
    });
}

$done({body: JSON.stringify(obj)});
