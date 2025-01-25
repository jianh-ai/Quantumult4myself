// 2024-08-16
 
const url = $request.url;
let obj = JSON.parse($response.body);

if (url.includes("/index/plaza-flow?")) {
  if (obj.data && obj.data.contents && Array.isArray(obj.data.contents)) {
    obj.data.contents = obj.data.contents.filter(item => item.type !== 4);
  }
}

if (url.includes("/meta-interface/v2/index?")) {
  delete obj.data.recom_cards;
  delete obj.data.recom_btns;
}

if (url.includes("/meta-interface/v1/index/plaza?")) {
  delete obj.data.tabs[1].badge;
  delete obj.data.recommend_ads;
}

if (url.includes("/open-interface/v1/string/market_page?title=metabolism_config")) {
  delete obj.dtop_banner;
  delete obj.diagnos_config;
  delete obj.partner_hospital;
  delete obj.question_answer;
  delete obj.product;
  delete obj.brand_story;
}

$done( {body: JSON.stringify(obj)} );