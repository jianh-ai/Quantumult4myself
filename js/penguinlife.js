const url = $request.url;
if (!$response.body) $done({});

let obj = JSON.parse($response.body);

if (url.includes("/bottomBar/get")) {
  // 需要保留的导航项ID列表
  const keepNavIds = [1, 3, 4, 5];
  
  // 过滤掉id为2的“视频”项，保留其他项
  if (obj.data) {
    obj.data = obj.data.filter(item => keepNavIds.includes(item.id));
  }
}

$done({ body: JSON.stringify(obj) });
