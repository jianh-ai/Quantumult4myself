// 2025-06-07

const url = $request.url;
if (!$response) $done({});
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/mtop.taobao.idlehome.home.nextfresh/")) {
  if (body?.data?.homeTopList) {
    body.data.homeTopList = body.data.homeTopList.filter(
      (s) => s.sectionType === "kingkongDo"
    );
  }
  if (body?.data?.sections) {
    body.data.sections = body.data.sections.filter((s) => {
      const cardType = s?.data?.clickParam?.args?.cardType;
      return cardType !== "homeMultiBanner" && cardType !== "mamaAD";
    });
  }
} else if (url.includes("/mtop.taobao.idlehome.widget.refresh.get/")) {
  if (body?.data?.homeTopList) {
    body.data.homeTopList = body.data.homeTopList.filter(
      (s) => s.sectionType === "kingkongDo"
    );
  }
} else if (url.includes("/mtop.taobao.idle.home.whale.modulet/")) {
  if (body?.data?.container?.sections) {
    body.data.container.sections = body.data.container.sections.filter(
      (s) => s.template?.name === "fish_home_miniapp"
    );
  }
} else if (url.includes("/mtop.taobao.idle.user.strategy.list/")) {
  if (body?.data?.strategies) {
    body.data.strategies = body.data.strategies.filter(
      (s) => s.type !== "BIZ_IDLE_COIN_ENTRANCE_2" && s.type !== "FLOAT_LAYER"
    );
  }
} else if (url.includes("/mtop.taobao.idlehome.home.newitem.page/")) {
  if (body?.data?.sections) {
    body.data.sections = body.data.sections.filter((s) => {
      const cardType = s?.data?.clickParam?.args?.cardType;
      return cardType !== "banner" && cardType !== "mamaAD";
    });
  }
} else if (url.includes("/mtop.taobao.idle.local.flow.plat.section/")) {
  function deepWalk(obj) {
    if (typeof obj === 'object' && obj !== null) {
      if (Array.isArray(obj)) {
        obj.forEach(deepWalk);
      } else {
        if (obj.components && Array.isArray(obj.components)) {
          obj.components = obj.components.map(comp => {
            if (comp?.data?.template?.name === "fish_city_banner") {
              delete comp.data.item;
            }
            return comp;
          });
        }
        for (const key in obj) {
          deepWalk(obj[key]);
        }
      }
    }
  }
  deepWalk(body);
} else if (url.includes("/mtop.taobao.idle.local.home/")) {
  if (body?.data?.sections) {
    body.data.sections = body.data.sections.filter(
      (s) => s.template?.cardEnum !== "ads" && s.cardType === "common"
    );
  }
} else if (url.includes("/mtop.idle.user.page.my.adapter/")) {
  const keepTemplates = [
    "my_fy25_header",
    "my_fy25_user_info",
    "my_fy25_trade",
    "my_fy25_appraise",
    "my_fy25_tools"
  ];
  if (body?.data?.container?.sections) {
    body.data.container.sections = body.data.container.sections.filter((s) =>
      keepTemplates.includes(s.template?.name)
    );
  }
} else if (url.includes("/mtop.taobao.idlehome.home.circle.list/")) {
  if (body?.data?.circleList) {
    body.data.circleList.forEach(circle => {
      if (circle.showInfo?.titleImage) {
        circle.showInfo.titleImage.lightUrl = "";
        circle.showInfo.titleImage.url = "";
        delete circle.showInfo.titleImage.width;
        delete circle.showInfo.titleImage.height;
      }
    });
  }
} else if (url.includes("/mtop.taobao.idlemtopsearch.search/")) {
  if (body?.data?.resultList) {
    body.data.resultList = body.data.resultList.filter(
      (item) => item?.data?.item?.main?.exContent?.dislikeFeedback?.clickParam?.args?.bizType !== "ad"
    );
  }
} else if (url.includes("/mtop.taobao.idlemtopsearch.item.search.activate/")) {
  if (body?.data?.cardList) {
    body.data.cardList = body.data.cardList.map(card => {
      if (card.cardData?.hotwords) {
        delete card.cardData.hotwords;
      }
      return card;
    });
  }
}

$done({ body: JSON.stringify(body) });
