# Lambda Keep-Alive Trigger

Welcome to the Lambda Keep-Alive Trigger, the optimal solution to ensure your AWS Lambdas remain "warm" and responsive. Developed with the AWS Cloud Development Kit (CDK) and JavaScript, this tool seamlessly integrates with your existing setup, guaranteeing efficiency and flexibility.

🚀 **Features**:

- Automated triggering every 5 minutes.
- Lightweight design ensures minimal overhead and optimal performance.
- Seamless integration with AWS CDK.

📦 **Installation & Usage**:

For installation and usage guidelines, please refer to the documentation below. You can also find this package on NPM for a hassle-free setup.

🤝 **Contributors & Maintainers**:

This project is proudly developed and maintained by [HyperSense Software](https://hypersense-software.com/).

📄 **License**:

Distributed under the MIT License. See LICENSE for more information.

🔍 **Overview**:

AWS Lambdas can experience cold starts, which might impact their performance and responsiveness. The Lambda Keep-Alive Trigger acts as a preventative measure by periodically invoking a minimalistic Lambda function. This continuous "ping" ensures your Lambda remains warm, reducing potential latency and enhancing user experience.

Feel free to raise issues, or provide feedback.


# Setup 

## CDK side
You will need to add the following to your cdk project
- pass the stack, the lambda function to keep alive, and an ID to be used when creating the event rule or the rule itself
```typescript
import { KeepAliveTrigger, addKeepAlive } from '@hypersense-software/lambda-keep-alive-trigger';
...
addKeepAlive(new KeepAliveStackParams(this, lambdaFunction, "RuleID"));
```

## Lambda side

You will need to add the following to your lambda
- handle the keep alive flow first and exist as soon as possible, so it minimize AWS costs
```javascript
exports.handler = async (event, context) => {
    if (event.type == "KeepAlive") return "heartbeat";
    /* Custom code*/    
}
```

# More customization options
## Event rule
- You must provide a custom event rule for KeepAliveStackParams or an id for the default rule. The default is to run every 5 minutes.
- This will help you keep the lambdas warm at specific date and times, example only during weekdays for development.
- this can also help re-use the trigger for multiple lambda functions, instead of having  a trigger for each lambda function.

```typescript
import * as aws_events from "aws-cdk-lib/aws-events";
import { KeepAliveTrigger, addKeepAlive } from '@hypersense-software/lambda-keep-alive-trigger';

export class ExtensionStack extends Stack {
    constructor(scope: Construct, id: string, props: StackProps | undefined) {
        super(scope, id, props);
        /* Custom code*/
        let customRule = new aws_events.Rule(this, `KeepAliveRuleCustomRule`, {
            schedule: aws_events.Schedule.cron({
                minute: "0/5",
                hour: "10-18",
                month: "*",
                weekDay: "MON-FRI",
                year: "*"
            })
        })
        addKeepAlive(new KeepAliveStackParams(this, lambdaFunction, customRule));    
    }
}
```

## Event message
- You can provide a custom event body to be sent to your lambda, this ensures the call doesn't interfere with other processes
```typescript
import { KeepAliveTrigger, addKeepAlive } from '@hypersense-software/lambda-keep-alive-trigger';

export class ExtensionStack extends Stack {
    constructor(scope: Construct, id: string, props: StackProps | undefined) {
        super(scope, id, props);
        /* Custom code*/
        let customParams = {
            customParam: "customValue"
        };
        addKeepAlive(new KeepAliveStackParams(this, lambdaFunction, "RuleID", customParams));
    }
}
```
