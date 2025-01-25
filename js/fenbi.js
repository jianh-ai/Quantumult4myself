// 2024-10-17

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/activity/app/launcher")) {
  if (obj?.data?.length > 0) {
    obj.data.forEach((i) => {
      i.startTime = 2208960000; // Unix 时间戳 2040-01-01 00:00:00
      i.endTime = 2209046399; // Unix 时间戳 2040-01-01 23:59:59
    });
  }
}

$done({ body: JSON.stringify(obj) });