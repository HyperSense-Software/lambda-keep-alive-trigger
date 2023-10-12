import { Stack, aws_lambda, aws_events } from "aws-cdk-lib";
export declare class KeepAliveStackParams {
    stack: Stack;
    lambdaFunction: aws_lambda.Function;
    handlerParams?: any;
    eventRule?: aws_events.Rule;
    /**
     * New KeepAliveStackParams
     * @param stack - Stack
     * @param lambdaFunction - Lambda function to be called
     * @param eventRule - If string a new event rule is created triggered every 5 minutes, otherwise the entire event rule object
     * @param handlerParams - Optional parameters to be passed to the lambda function, defaults to {type: "KeepAlive"}
     */
    constructor(stack: Stack, lambdaFunction: aws_lambda.Function, eventRule: string | aws_events.Rule, handlerParams?: any);
}
export declare function addKeepAlive(params: KeepAliveStackParams): void;
