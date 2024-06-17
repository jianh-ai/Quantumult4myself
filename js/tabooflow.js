let url = $request.url;
const regex = /^http:\/\/amdc\.m\.taobao\.com\/amdc\/mobileDispatch\?appkey=\d+&v=\d+\.\d+&appVersion=\d+\.\d+\.\d+&cv=\d+$/;

if (regex.test(url)) {
  // 阻止请求并返回空响应
  $done({response: {status: 200, body: ''}});
} else {
  // 允许其他请求正常通过
  $done({});
}
