import {Stack, aws_lambda, aws_events, aws_events_targets} from "aws-cdk-lib";

export class KeepAliveStackParams {
    stack: Stack;
    lambdaFunction: aws_lambda.Function;
    handlerParams? : any;
    eventRule?: aws_events.Rule;

    /**
     * New KeepAliveStackParams
     * @param stack - Stack
     * @param lambdaFunction - Lambda function to be called
     * @param eventRule - If string a new event rule is created triggered every 5 minutes, otherwise the entire event rule object
     * @param handlerParams - Optional parameters to be passed to the lambda function, defaults to {type: "KeepAlive"}
     */
    constructor(stack: Stack,
                lambdaFunction: aws_lambda.Function,
                eventRule: string | aws_events.Rule,
                handlerParams?: any){
        this.stack = stack;
        this.lambdaFunction = lambdaFunction
        if (handlerParams) this.handlerParams = handlerParams;
        else this.handlerParams = {type: "KeepAlive"};
        if (typeof eventRule == "string") this.eventRule = new aws_events.Rule(this.stack, eventRule,
            {schedule: aws_events.Schedule.expression("rate(5 minutes)")});
        else this.eventRule = eventRule;
    }
}

export function addKeepAlive(params: KeepAliveStackParams)
{
    let handlerParams = params.handlerParams!;
    let eventRule = params.eventRule!;

    eventRule.addTarget(new aws_events_targets.LambdaFunction(params.lambdaFunction, {
        event: aws_events.RuleTargetInput.fromObject(handlerParams),
    }));

    aws_events_targets.addLambdaPermission(eventRule, params.lambdaFunction);
}