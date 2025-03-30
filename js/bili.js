// 2024-05-10

let body = $response.body;

if (body) {
	switch (!0) {
		case /pgc\/season\/app\/related\/recommend\?/.test($request.url):
			try {
				let t = JSON.parse(body);
				t.result?.cards?.length && (t.result.cards = t.result.cards.filter(t => 2 != t.type)), body = JSON.stringify(t)
			} catch (i) {
				console.log("bilibili recommend:" + i)
			}
			break;
		case /^https?:\/\/app\.bilibili\.com\/x\/resource\/show\/skin\?/.test($request.url):
			try {
				let a = JSON.parse(body);
				delete a.data?.common_equip, body = JSON.stringify(a)
			} catch (e) {
				console.log("bilibili skin:" + e)
			}
			break;
		case /^https:\/\/app\.bilibili\.com\/x\/v2\/feed\/index\?/.test($request.url):
			try {
				let s = JSON.parse(body),
					l = [];
				for (let o of s.data.items)
					if (!o.hasOwnProperty("banner_item")) {
						if (!(!o.hasOwnProperty("ad_info") && -1 === o.card_goto?.indexOf("ad") && ["small_cover_v2", "large_cover_v1", "large_cover_single_v9"].includes(o.card_type))) continue;
						else l.push(o)
					} s.data.items = l, body = JSON.stringify(s)
			} catch (d) {
				console.log("bilibili index:" + d)
			}
			break;
		case /^https?:\/\/app\.bilibili\.com\/x\/v2\/feed\/index\/story\?/.test($request.url):
			try {
				let r = JSON.parse(body),
					b = [];
				for (let p of r.data.items) p.hasOwnProperty("ad_info") || -1 !== p.card_goto.indexOf("ad") || b.push(p);
				r.data.items = b, body = JSON.stringify(r)
			} catch (c) {
				console.log("bilibili Story:" + c)
			}
			break;
		case /^https?:\/\/app\.bilibili\.com\/x\/v\d\/account\/teenagers\/status\?/.test($request.url):
			try {
				let n = JSON.parse(body);
				n.data.teenagers_status = 0, body = JSON.stringify(n)
			} catch (y) {
				console.log("bilibili teenagers:" + y)
			}
			break;
		case /^https?:\/\/app\.bilibili\.com\/x\/resource\/show\/tab/.test($request.url):
			try {
				let u = new Set([177, 178, 179, 181, 102, 104, 106, 486, 488, 489]),
					h = JSON.parse(body);
				if (h.data?.tab) {
					var f = [];
					f.push({
						id: 39,
						name: "直播",
						uri: "bilibili://live/home",
						tab_id: "直播tab",
						pos: 1
					}),
					f.push({
						id: 40,
						name: "推荐",
						uri: "bilibili://pegasus/promo",
						tab_id: "推荐tab",
						pos: 2,
						default_selected: 1
					}), 
                    			f.push({
						id: 41,
						name: "热门",
						uri: "bilibili://pegasus/hottopic",
						tab_id: "hottopic",
						pos: 3
					}), 
                    			f.push({
						id: 545,
						name: "番剧",
						uri: "bilibili://pgc/home",
						tab_id: "bangumi",
						pos: 4
					}), 		
                    			h.data.tab = f
				}
                
				if (h.data.top && (h.data.top = [{
						id: 481,
						icon: "http://i0.hdslb.com/bfs/archive/d43047538e72c9ed8fd8e4e34415fbe3a4f632cb.png",
						name: "消息",
						uri: "bilibili://link/im_home",
						tab_id: "消息Top",
						pos: 1
					}]), h.data.bottom) {
					let m = h.data.bottom.filter(t => u.has(t.id));
					h.data.bottom = m
				}
				body = JSON.stringify(h)
			} catch (g) {
				console.log("bilibili tabprocess:" + g)
			}
			break;
		case /^https?:\/\/app\.bilibili\.com\/x\/v2\/account\/mine/.test($request.url):
			try {
				let v = JSON.parse(body);
				// 删除不必要项目
				const del = ["ipad_upper_sections", "rework_v1"];
				for (let i of del) {
					if (v.data.hasOwnProperty(i)) {
						delete v.data[i];
					}
				}
	
				// 需要保留的特定 ID
				const keepIds = new Set([396, 397, 3072, 2830, 171, 172, 173, 174, 400, 402, 403, 404, 406, 622, 514, 407, 410]);
	
				// 处理所有可能包含 sections 的字段
				const sectionKeys = ["ipad_recommend_sections", "ipad_more_sections", "sections_v2"];
				for (const key of sectionKeys) {
					if (Array.isArray(v.data[key])) {
						v.data[key] = v.data[key].map((item) => {
							if (item?.items?.length > 0) {
								item.items = item.items.filter((subItem) => keepIds.has(subItem?.id));
							}
							return item;
						});
					}
				}
	
				body = JSON.stringify(v);
			} catch (error) {
				console.log("bilibili mypage:" + error);
			}
			break;
		case /^https?:\/\/app\.bilibili\.com\/x\/resource\/top\/activity/.test($request.url):
			try {
				let w = JSON.parse(body);
				w.data && (w.data.hash = "ddgksf2013", w.data.online.icon = ""), body = JSON.stringify(w)
			} catch (O) {
				console.log("bilibili right corner:" + O)
			}
			break;
		case /ecommerce-user\/get_shopping_info\?/.test($request.url):
			try {
				let P = JSON.parse(body);
				P.data && (P.data = {
					shopping_card_detail: {},
					bubbles_detail: {},
					recommend_card_detail: {},
					selected_goods: {},
					h5jump_popup: []
				}), body = JSON.stringify(P)
			} catch (W) {
				console.log("bilibili shopping info:" + W)
			}
			break;
		case /^https?:\/\/app\.bilibili\.com\/x\/v2\/search\/square/.test($request.url):
			try {
				let j = JSON.parse(body);
				j.data = {
					type: "history",
					title: "搜索历史",
					search_hotword_revision: 2
				}, body = JSON.stringify(j)
			} catch (q) {
				console.log("bilibili hot search:" + q)
			}
			break;
		case /https?:\/\/app\.bilibili\.com\/x\/v2\/account\/myinfo\?/.test($request.url):
			try {
				let E = JSON.parse(body);
				E.data.vip.status || (E.data.vip.type = 2, E.data.vip.status = 1, E.data.vip.vip_pay_type = 1, E.data.vip.due_date = 466982416e4), body = JSON.stringify(E)
			} catch (z) {
				console.log("bilibili 1080p:" + z)
			}
			break;
		case /pgc\/page\/(bangumi|cinema\/tab\?)/.test($request.url):
			try {
				let B = JSON.parse(body);
				B.result.modules.forEach(t => {
					t.style.startsWith("banner") && (t.items = t.items.filter(t => -1 != t.link.indexOf("play"))), t.style.startsWith("function") && (t.items = t.items.filter(t => -1 == t.blink.indexOf("bilibili.com")), [1283, 241, 1441, 1284].includes(t.module_id) && (t.items = [])), t.style.startsWith("tip") && (t.items = [])
				}), body = JSON.stringify(B)
			} catch (I) {
				console.log("bilibili fanju:" + I)
			}
			break;
		case /^https:\/\/app\.bilibili\.com\/x\/v2\/splash\/list/.test($request.url):
			try {
				let R = JSON.parse(body);
				if (R.data && R.data.list)
					for (let S of R.data.list) S.duration = 0, S.begin_time = 2240150400, S.end_time = 2240150400;
				body = JSON.stringify(R)
			} catch (T) {
				console.log("bilibili openad:" + T)
			}
			break;
		case /^https:\/\/api\.live\.bilibili\.com\/xlive\/app-interface\/v2\/index\/feed/.test($request.url):
			try {
				let A = JSON.parse(body);
				A.data && A.data.card_list && (A.data.card_list = A.data.card_list.filter(t => "banner_v1" != t.card_type)), body = JSON.stringify(A)
			} catch (C) {
				console.log("bilibili xlive:" + C)
			}
			break;
		default:
			$done({})
	}
	$done({
		body
	})
} else $done({});
