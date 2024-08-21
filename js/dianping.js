// 2024-08
const url = $request.url;
if (!$response.body) $done({});

// 定义一个空白 GIF 图片的 base64 编码
const blankGifBase64 = 'R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='; // 1x1 pixel transparent GIF

// 将 base64 数据转换为二进制数据
const blankGif = Buffer.from(blankGifBase64, 'base64');

// 替换响应体为空白 GIF
if (url.includes("/dpmobile")) {
  $done({ body: blankGif });
} else {
  $done({ body: $response.body });
}
