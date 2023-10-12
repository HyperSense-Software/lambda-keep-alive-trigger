"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addKeepAlive = exports.KeepAliveStackParams = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
class KeepAliveStackParams {
    /**
     * New KeepAliveStackParams
     * @param stack - Stack
     * @param lambdaFunction - Lambda function to be called
     * @param eventRule - If string a new event rule is created triggered every 5 minutes, otherwise the entire event rule object
     * @param handlerParams - Optional parameters to be passed to the lambda function, defaults to {type: "KeepAlive"}
     */
    constructor(stack, lambdaFunction, eventRule, handlerParams) {
        this.stack = stack;
        this.lambdaFunction = lambdaFunction;
        if (handlerParams)
            this.handlerParams = handlerParams;
        else
            this.handlerParams = { type: "KeepAlive" };
        if (typeof eventRule == "string")
            this.eventRule = new aws_cdk_lib_1.aws_events.Rule(this.stack, eventRule, { schedule: aws_cdk_lib_1.aws_events.Schedule.expression("rate(5 minutes)") });
        else
            this.eventRule = eventRule;
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