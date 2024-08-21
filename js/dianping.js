// 2024-08
const url = $request.url;

// 空白 GIF 的 base64 编码
const blankGifBase64 = 'R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

// 将 base64 数据转换为二进制数据
const blankGif = Buffer.from(blankGifBase64, 'base64');

// 检查 URL 是否匹配目标图片
if (url.includes("img.meituan.net/dpmobile/90fa52110f080e1ae3b3f4f892045650199421.gif.webp")) {
  // 替换响应体为空白 GIF
  $done({ body: blankGif });
} else {
  // 不修改其他响应体
  $done({});
}
