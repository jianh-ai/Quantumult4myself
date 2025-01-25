// 2024-10-17

 let obj = JSON.parse($response.body);
 const url = $request.url;
 
 if (url.includes('/homepage/promotion')) {
   obj.data.dataList = obj.data.dataList.filter(i => i.type === 'WOW');
 } else if (url.includes('/course/tab/home')) {
   obj.data.tab.tabList = obj.data.tab.tabList.filter(i => i.title === '学库' || i.title === '四六级');
   obj.data.icon.iconList = obj.data.icon.iconList.filter(i => i.title === '实用英语');
   obj.data.fragmentList = obj.data.fragmentList.filter(i => i.type === 'GREAT_COURSE');
 } else if (url.includes('/homepage/tile')) {
   obj.data.children = obj.data.children.filter(i => i.type === '');
 }
 
 $done({body: JSON.stringify(obj)});