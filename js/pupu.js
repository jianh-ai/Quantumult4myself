// 2023-11-27

let obj = JSON.parse($response.body);
obj.data = obj.data.filter(item => item.position_type !== 50);
$done({body: JSON.stringify(obj)});