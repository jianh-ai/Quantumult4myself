// 2024-11-21

// 获取响应内容
let body = $response.body;

// 删除广告位（HTML 部分）
body = body.replace(/<!-- 广告位：2dfan_站顶通栏横幅 -->[\s\S]*?<\/script>/g, '');

// 删除公告内容
body = body.replace(/<div class="alert text-center" id="site_announcement">[\s\S]*?<\/div>/g, '');

// 删除浮动广告（改进后的正则表达式）
body = body.replace(/<div id="adv-fixed-square"[^>]*>[\s\S]*?<\/div>/g, '');

// 返回修改后的内容
$done({ body });