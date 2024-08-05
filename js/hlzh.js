var ua = $request.headers.rpid || $request.headers.Rpid;

if (ua.includes("1000002") || ua.includes("1000019")) {
    $done({ status: "HTTP/1.1 404 Not Found" });
} else {
    $done({});
}
