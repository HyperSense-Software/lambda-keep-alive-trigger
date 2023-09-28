"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isKeepAlive = void 0;
async function isKeepAlive(event) {
    console.log(event);
    if (event.type == "KeepAlive")
        return true;
    return false;
}
exports.isKeepAlive = isKeepAlive;
//# sourceMappingURL=keep-alive-interceptor.js.map