"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isKeepAlive = exports.addKeepAlive = exports.KeepAliveStackParams = void 0;
const keep_alive_stack_1 = require("./cdk/keep-alive-stack");
Object.defineProperty(exports, "KeepAliveStackParams", { enumerable: true, get: function () { return keep_alive_stack_1.KeepAliveStackParams; } });
Object.defineProperty(exports, "addKeepAlive", { enumerable: true, get: function () { return keep_alive_stack_1.addKeepAlive; } });
const keep_alive_interceptor_1 = require("./sdk/keep-alive-interceptor");
Object.defineProperty(exports, "isKeepAlive", { enumerable: true, get: function () { return keep_alive_interceptor_1.isKeepAlive; } });
//# sourceMappingURL=index.js.map