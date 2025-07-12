// 2025-07-12

var headers = $request.headers;
headers["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36";
headers["Accept"] = "*/*";
headers["Accept-Language"] = "en-US,en;q=0.5";

$done({ headers: headers });
