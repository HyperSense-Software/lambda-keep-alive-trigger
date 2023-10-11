import { Stack, aws_lambda, aws_events } from "aws-cdk-lib";
export declare class KeepAliveStackParams {
    stack: Stack;
    lambdaFunction: aws_lambda.Function;
    handlerParams?: any;
    eventRule?: aws_events.Rule;
    constructor(stack: Stack, lambdaFunction: aws_lambda.Function, customProps?: {
        handlerParams?: any;
        eventRule?: aws_events.Rule;
    });
}
export declare function addKeepAlive(params: KeepAliveStackParams): void;
