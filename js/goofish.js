// 2024-10-12

const url = $request.url;
if (!$response) $done({});
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/mtop.idle.user.page.my.adapter/")) {
  // 我的页面
  if (obj?.data?.container?.sections?.length > 0) {
    let newSections = [];
    for (let items of obj.data.container.sections) {
      if (items?.template?.name === "my_fy25_user_info") {
        // 专属等级横幅
        delete items.item.level;
      } else if (items?.template?.name === "my_fy25_slider") {
        // 滚动小提示
        continue;
      } 
      if (items?.template?.name === "my_fy25_community") {
        // 底部乱七八糟无用内容
        continue;
      }
      newSections.push(items);
    }
    obj.data.container.sections = newSections;
  }
} else if (url.includes("/mtop.taobao.idlehome.home.nextfresh/")) {
  delete obj.data.bannerReturnDO; // 首页横幅
  // 首页信息流
  if (obj?.data?.sections?.length > 0) {
    obj.data.sections = obj.data.sections.filter(
      (i) =>
        ![
          "fish_home_advertise_card_d4",
          "fish_home_content_card",
          "fish_home_feeds_commodity_card_2",
          "fish_home_feeds_pager_banner"
        ]?.includes(i?.template?.name)
    );
  }
  if (obj?.data?.widgetReturnDO?.widgets?.length > 0) {
    let widget = obj?.data?.widgetReturnDO?.widgets[0];
    if (widget?.widgetDO?.channelDOList?.length > 0) {
      widget.widgetDO.channelDOList = widget.widgetDO.channelDOList.filter((i) =>
        ["手机数码", "分类", "上门回收", "闲鱼鱼市", "闲鱼鉴别", ""]?.includes(i?.title)
      );
    }
  }
} else if (url.includes("/mtop.taobao.idlehome.home.circle.list/")) {
  if (obj?.data?.circleList?.length > 0) {
    let newLists = [];
    for (let list of obj.data.circleList) {
      if (list?.showType) {
        list.showType = "text"; // 将首页顶部标签模式修改为文本
      }
      delete list.showInfo.titleImage; // 删除将首页顶部图片标签的资源
      newLists.push(list);
    }
    obj.data.circleList = newLists;
  }
} else if (url.includes("/mtop.taobao.idlemtopsearch.search/")) {
  // 搜索结果广告
  if (obj?.data?.resultList?.length > 0) {
    obj.data.resultList = obj.data.resultList.filter(
      (i) =>
        !(
          i?.data?.template?.name === "idlefish_seafood_vote" || // 搜索结果 投票
          i?.data?.template?.name === "idlefish_search_card_category_select" || // 大家都在搜
          i?.data?.item?.main?.exContent?.isAliMaMaAD === "true" || // 广告1
          i?.data?.item?.main?.exContent?.isAliMaMaAD === true // 广告2
        )
    );
  }
}

if (url.includes("/gw/mtop.taobao.idlehome.home.nextfresh")) {
  // 可能存在的首页标签
  delete obj.data.widgetReturnDO;
  // 删除banner图
  delete obj.data.bannerReturnDO;
  // 信息流广告
  if (obj.data?.sections) {
    obj.data.sections = obj.data.sections.filter(section => {
      return !(section.data && (section.data.bizType === "AD" || section.data.bizType === "homepage"));
    });

    let excludeNames = ['fish_home_yunying_card_d3', 'idlefish_seafood_market', 'fish_home_chat_room'];
    obj.data.sections = obj.data.sections.filter(function(section) {  
      return !excludeNames.includes(section.template.name);  
    });
  }
}

if (url.includes("/gw/mtop.taobao.idle.local.home")) {
  if (obj.data?.sections) {
    obj.data.sections = obj.data.sections.filter(section => {
      return !(section.data && section.data.bizType === "AD");
    });
  }
}

if (url.includes("/gw/mtop.taobao.idle.home.whale.modulet")) {
  delete obj.data.container.sections;
}

if (url.includes("/gw/mtop.taobao.idlemtopsearch.search.shade") || url.includes("/gw/mtop.taobao.idle.user.strategy.list")) {
  delete obj.data;
}

$done({ body: JSON.stringify(obj) });