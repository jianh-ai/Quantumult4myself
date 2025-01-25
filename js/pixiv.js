// 2024-10-27

let body = $response.body;
body = JSON.parse(body);

// 将用户设置为高级用户
body['user']['is_premium'] = true;
// 关闭政策协议的要求
body['user']['require_policy_agreement'] = false;
// 移除内容限制
body['user']['x_restrict'] = 0;

body = JSON.stringify(body);
$done({ body });