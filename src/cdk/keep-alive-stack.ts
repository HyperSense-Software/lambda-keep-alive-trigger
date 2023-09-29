import {Stack, aws_lambda, aws_events, aws_events_targets} from "aws-cdk-lib";

export class KeepAliveStackParams extends Object{
    stack!: Stack;
    lambdaFunction!: aws_lambda.Function;
    handlerParams? : any;
    eventRule?: aws_events.Rule;

    constructor(data : Partial <KeepAliveStackParams>){
        super(data)
        if (data.stack) this.stack = data.stack;
        if (data.lambdaFunction) this.lambdaFunction = data.lambdaFunction
        if (data.handlerParams) this.handlerParams = data.handlerParams;
        else this.handlerParams = {type: "KeepAlive"};
        if (data.eventRule) this.eventRule = data.eventRule;
        else this.eventRule = new aws_events.Rule(this.stack, `KeepAliveRuleDefault`, {
            schedule: aws_events.Schedule.expression("rate(5 minutes)")
        })
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