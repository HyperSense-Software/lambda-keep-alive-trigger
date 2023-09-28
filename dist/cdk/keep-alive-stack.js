"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addKeepAlive = exports.KeepAliveStackParams = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
class KeepAliveStackParams extends Object {
    constructor(data) {
        super(data);
        if (data.stack)
            this.stack = data.stack;
        if (data.lambdaFunction)
            this.lambdaFunction = data.lambdaFunction;
        if (data.handlerParams)
            this.handlerParams = data.handlerParams;
        else
            data.handlerParams = { type: "KeepAlive" };
        if (data.eventRule)
            this.eventRule = data.eventRule;
        else
            this.eventRule = new aws_cdk_lib_1.aws_events.Rule(this.stack, `KeepAliveRuleDefault`, {
                schedule: aws_cdk_lib_1.aws_events.Schedule.expression("rate(5 minutes)")
            });
    }
}
exports.KeepAliveStackParams = KeepAliveStackParams;
function addKeepAlive(params) {
    let handlerParams = params.handlerParams;
    let eventRule = params.eventRule;
    eventRule.addTarget(new aws_cdk_lib_1.aws_events_targets.LambdaFunction(params.lambdaFunction, {
        event: aws_cdk_lib_1.aws_events.RuleTargetInput.fromObject(handlerParams),
    }));
    aws_cdk_lib_1.aws_events_targets.addLambdaPermission(eventRule, params.lambdaFunction);
}
exports.addKeepAlive = addKeepAlive;
//# sourceMappingURL=keep-alive-stack.js.map