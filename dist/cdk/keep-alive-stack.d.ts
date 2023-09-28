import { Stack, aws_lambda, aws_events } from "aws-cdk-lib";
export declare class KeepAliveStackParams extends Object {
    stack: Stack;
    lambdaFunction: aws_lambda.Function;
    handlerParams?: any;
    eventRule?: aws_events.Rule;
    constructor(data: Partial<KeepAliveStackParams>);
}
export declare function addKeepAlive(params: KeepAliveStackParams): void;
