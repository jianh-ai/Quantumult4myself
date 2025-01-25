// 2024-01-14 18:15

const url = $request.url;
if (!$response.body) $done({});
const isYK = url.includes("youku");
let obj = JSON.parse($response.body);

if (url.includes("/collect-api/get_push_interval_config_wx?")) {
  // 优酷 热剧弹窗
  if (obj?.data) {
    const items = ["tipContent", "tipContentNew"];
    for (let i of items) {
      delete obj.data[i];
    }
  }
} else if (url.includes("columbus.gateway.new.execute")) {
  // 优酷 播放详情页组件
  if (obj?.data?.["2019030100"]?.data) {
    let objData = obj.data["2019030100"].data;
    if (objData?.data?.global) {
      let config = objData.data.global;
       if (config?.PHONE_DETAIL_TOP_TAB?.pageTabs?.length > 0) {
        // detail视频 list热门 planet讨论
        config.PHONE_DETAIL_TOP_TAB.pageTabs = config.PHONE_DETAIL_TOP_TAB.pageTabs.filter((i) =>
          ["detail", "planet"]?.includes(i?.code)
        );
      }
    }
    if (objData?.nodes?.length > 0) {
      if (objData?.nodes?.length === 1) {
        let node0 = objData.nodes[0];
        if (node0?.nodes?.length > 0) {
          if (node0?.typeName === "NORMAL") {
            node0.nodes = node0.nodes.filter(
              (i) =>
                ![
                  "PHONE_CHD_AGE_DETAIL_2",
                  "PHONE_CHILD_SERIES_A",
                  "PHONE_CHILD_STAR_A",
                  "PHONE_DEFALT_SCROLL_C",
                  "Phone运营banner",
                  "播放页触达组件", // 新版
                  "播放页广告组件",
                  "播放页会员引导组件",
                  "播放页活动组件",
                  "播放页全屏播后推荐组件",
                  "播放页少儿品牌专区组件",
                  "播放页推荐组件",
                  "播放页用户触达组件", // 旧版
                  "播放页有料不能停组件",
                  "球区自动化组件",
                  "优酷购"
                ]?.includes(i?.typeName)
            );
          } else if (node0?.typeName === "FEED_CHILD_DRAWER_PAGINATION") {
           // 播放页推荐信息流
            if (node0?.nodes) {
              node0.nodes = [];
            }
          } else if (node0?.typeName === "FEED_DRAWER_PAGINATION") {
            // 播放页推荐信息流
            if (node0?.nodes) {
              node0.nodes = [];
            }
          }
        }
      } else {
        objData.nodes = [];
      }
    }
  }
} else if (url.includes("columbus.home.feed/")) {
    // 优酷 首页信息流
    if (obj?.data?.["2019061000"]?.data) {
      let objData = obj.data["2019061000"].data;
      if (objData?.nodes?.length > 0) {
        let newNodes = [];
        for (let item of objData.nodes) {
          if (item?.typeName === "PHONE_FEED_CARD_GROUP") {
            if (item?.nodes?.length > 0) {
              let newItems = [];
              for (let i of item.nodes) {
                if (i?.typeName === "PHONE_FEED_CARD_S_AD") {
                  // 首页 四格小图广告
                  continue;
                } else if (i?.typeName === "PHONE_H_UC_AD") {
                  // 首页 横版独占广告
                  continue;
                } else {
                  newItems.push(i);
                }
              }
              item.nodes = newItems;
              newNodes.push(item);
            } else {
              newNodes.push(item);
            }
          } else {
            newNodes.push(item);
          }
        }
        objData.nodes = newNodes;
      }
    }
  } else if (url.includes("columbus.home.query/")) {
    // 优酷 各菜单列表 剧集 电影 综艺 信息流
    if (obj?.data?.["2019061000"]?.data) {
      let objData = obj.data["2019061000"].data;
      if (objData?.data?.indexPositionResult?.length > 0) {
        // 首页 第零层级 二楼
        objData.data.indexPositionResult = [];
      }
      if (objData?.nodes?.length > 0) {
        let newNodes = [];
        for (let item of objData.nodes) {
          // 第一层级循环
          if (["CHILD", "COMIC2", "20230929GREATWORKMFK"]?.includes(item?.data?.nodeKey)) {
            // 首页 少儿 动漫 国庆长假免费看
            continue;
          } else {
            if (item?.data?.indexPositionResult?.length > 0) {
              // 剧集 电影 二楼
              item.data.indexPositionResult = [];
            }
            if (item?.data?.refreshImg) {
              // 电影 综艺 纪录片 下拉刷新的背景图片
              delete item.data.refreshImg;
            }
            // 首页 剧集 电影 全都有信息流广告
            // 去掉nodeKey的判断 直接处理下一层级
            if (item?.nodes?.length > 0) {
              let newItems = [];
              for (let i of item.nodes) {
                // 第二层级循环
                if (i?.data?.crmSale) {
                  // 季卡会员横幅
                  delete i.data.crmSale;
                }
                if (["UC广告抽屉", "橱窗广告"]?.includes(i?.typeName)) {
                  // 横版独占广告
                  continue;
                } else if (i?.id === 31476) {
                  // 正在热播
                  if (i?.data?.keywords?.length > 0) {
                    // 滚动热词
                    delete i.data.keywords;
                  }
                } else if (i?.id === 35505) {
                  // 优惠购会员横幅
                  continue;
                } else if (i?.id === 37335) {
                  // 首页二楼
                  continue;
                } else {
                  // 16214猜你在追
                  // 38820首页顶部轮播图
                  if (i?.nodes?.length > 0) {
                    let newII = [];
                    for (let ii of i.nodes) {
                      // 第三层级循环
                      if (
                        [
                          "PHONE_FEED_CARD_B_AD", // 横版独占广告
                          "PHONE_FEED_CARD_S_AD", // 四格小图广告
                          "PHONE_H_UC_AD", // 剧集 横版独占广告
                          "PHONE_IMG_A", // 剧集 开通会员卡片
                          "PHONE_YK_AD_BANNER" // 剧集 横版独占广告
                        ]?.includes(ii?.typeName)
                      ) {
                        continue;
                      } else {
                        if (ii?.nodes?.length > 0) {
                          let newIII = [];
                          for (let iii of ii.nodes) {
                            // 第四层级循环
                            if (iii?.typeName === "PHONE_FEED_CARD_S_AD") {
                              // 剧集 四格小图广告
                              continue;
                            } else if (iii?.data.hasOwnProperty("ad")) {
                              // 有ad字段的为广告
                              continue;
                            } else {
                              newIII.push(iii);
                            }
                          }
                          ii.nodes = newIII;
                          newII.push(ii);
                        } else {
                          newII.push(ii);
                        }
                      }
                    }
                    i.nodes = newII;
                    newItems.push(i);
                  } else {
                    newItems.push(i);
                  }
                }
              }
              item.nodes = newItems;
            }
            newNodes.push(item);
          }
        }
        objData.nodes = newNodes;
      }
    }
  } else if (url.includes("columbus.uc.query/")) {
    // 优酷 我的页面组件
    if (obj?.data?.["2019061000"]?.data) {
      let objData = obj.data["2019061000"].data;
      if (objData?.nodes?.length > 0) {
        let objNodes = objData.nodes[0];
        if (objNodes?.nodes?.length > 0) {
          let newNodes = [];
          for (let item of objNodes.nodes) {
            if (item?.id === 32133) {
              // 横幅视频广告
              continue;
            } else if (item?.id === 32775) {
              // 个人中心二楼
              continue;
            } else if (item?.id === 22570) {
              // 横版轮播图
              continue;
            } else if (item?.id === 28912) {
              // 我的下载 收藏 购买 场景
              if (item?.nodes?.length > 0) {
                let newII = [];
                for (let ii of item.nodes) {
                  if (ii?.id === 110429) {
                    // 免费兑换VIP
                    continue;
                  }
                  newII.push(ii);
                }
                item.nodes = newII;
                newNodes.push(item);
              } else {
                newNodes.push(item);
              }
            } else if (item?.id === 35942) {
              // 我的专属推荐
              continue;
            } else if (item?.id === 36014) {
              // 业务区 星光币 优酷购 数字藏品
              continue;
            } else if (item?.id === 36015) {
              // 功能区 卡卷包 商城 设置
              if (item?.nodes?.length > 0) {
                let node0 = item.nodes[0];
                if (node0?.nodes?.length > 0) {
                  let newII = [];
                  for (let ii of node0.nodes) {
                    // 683364卡卷包 683359个性商城 683501TV助手 683367设置
                    // 683368我的客服 683502意见反馈 683366有奖调研 683372更多
                    if ([683367, 683368, 683372, 683502]?.includes(ii?.id)) {
                      newII.push(ii);
                    }
                  }
                  node0.nodes = newII;
                  newNodes.push(item);
                } else {
                  newNodes.push(item);
                }
              } else {
                newNodes.push(item);
              }
            } else if (item?.id === 38466) {
              // 横幅广告
              continue;
            } else {
              newNodes.push(item);
            }
          }
          objNodes.nodes = newNodes;
        }
      }
    }
  } else if (url.includes("columbus.ycp.query/")) {
    // 优酷 播放页评论区
    if (obj?.data?.["2019061000"]?.data) {
      let objData = obj.data["2019061000"].data;
      if (objData?.nodes?.length > 0) {
        let objNodes = objData.nodes[0];
        if (objNodes?.nodes?.length > 0) {
          let newNodes = [];
          for (let item of objNodes.nodes) {
            if (item?.id === 23242) {
              // 评论区顶部
              if (item?.nodes?.length > 0) {
                let newItems = [];
                for (let i of item.nodes) {
                  if (i?.typeName === "COMPONENT_YCP_NOTICE") {
                    // 评论区守则 轮播通告
                    continue;
                  } else if (i?.id === 113941) {
                    // 明星空降评论区
                    continue;
                  } else {
                    newItems.push(i);
                  }
                }
                item.nodes = newItems;
                newNodes.push(item);
              } else {
                newNodes.push(item);
              }
            } else if (item?.id === 23243) {
              // 评论区留言
              if (item?.nodes?.length > 0) {
                let newItems = [];
                for (let i of item.nodes) {
                  if (i?.id === -1000) {
                    // 评论区广告
                    continue;
                  } else {
                    newItems.push(i);
                  }
                }
                item.nodes = newItems;
                newNodes.push(item);
              } else {
                newNodes.push(item);
              }
            } else {
              newNodes.push(item);
            }
          }
          objNodes.nodes = newNodes;
        }
      }
    }
  } else if (url.includes("haidai.lantern.appconfig.get/")) {
    // 优酷 底部tab
    if (obj?.data?.model?.configInfo?.bottomNavigate) {
      let bottom = obj.data.model.configInfo.bottomNavigate;
      if (bottom?.data?.bottomTabList?.length > 0) {
        // HOME首页 DONGTAI短视频 SEARCH淘好片 VIP_MEMBER会员 NEW_UCENTER我的
        bottom.data.bottomTabList = bottom.data.bottomTabList.filter((i) =>
          ["HOME", "NEW_UCENTER", "VIP_MEMBER"]?.includes(i?.type)
        );
        // 修复位置
        for (let i = 0; i < bottom.data.bottomTabList.length; i++) {
          bottom.data.bottomTabList[i].menuIndex = i + 1;
        }
      }
    }
  } else if (url.includes("huluwa.dispatcher.youthmode.config2/")) {
    // 优酷 青少年模式弹窗
    if (obj?.data?.result) {
      obj.data.result = {};
    }
  } else if (url.includes("play.ups.appinfo.get/")) {
    // 优酷 开屏广告 播放广告
    if (obj?.data?.data) {
      const items = ["ad", "watermark", "ykad"];
      for (let i of items) {
        delete obj.data.data[i];
      }
    }
  } else if (url.includes("soku.yksearch/")) {
    // 优酷 搜索页面组件
    if (obj?.data?.nodes?.length > 0) {
      // 仅保留搜索tab
      obj.data.nodes = obj.data.nodes.filter((i) => i.hasOwnProperty("data"));
    }
  }

$done({ body: JSON.stringify(obj) });