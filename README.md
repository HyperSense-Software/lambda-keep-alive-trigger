# Lambda Keep Alive Trigger

Welcome to our newest open-source software project - a helper to keep your lambdas warm! This service is developed using AWS Cloud Development Kit (CDK) and JavaScript, offering a highly flexible and efficient solution for keeping your lambdas warm.

This project is developed by [HyperSense Software](https://hypersense-software.com/) and it is distributed under an MIT License.

This is design to help add a trigger to your lambdas to keep them warm. It will add a trigger to your lambda to be called every 5 minutes. The trigger will call a lambda that will do nothing, but will keep your lambda warm.


# Setup 

## CDK side
You will need to add the following to your cdk project
- pass the stack as well as the lambda function to keep alive
```typescript
import { KeepAliveTrigger, addKeepAlive } from '@hypersense-software/lambda-keep-alive-trigger';
...
addKeepAlive(new KeepAliveStackParams({stack: stack, lambdaFunction: functionToKeepAlive}));
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
- You can provide a custom event rule for KeepAliveStackParams. The default is to run every 5 minutes.
- This will help you keep the lambdas warm at specific date and times, example only during weekdays for development.
- this can also help re-use the trigger for multiple lambda functions, instead of having  a trigger for each lambda function.

```typescript
import * as aws_events from "aws-cdk-lib/aws-events";
import { KeepAliveTrigger, addKeepAlive } from '@hypersense-software/lambda-keep-alive-trigger';

export class ExtensionStack extends Stack {
    constructor(scope: Construct, id: string, props: StackProps | undefined) {
        super(scope, id, props);
        /* Custom code*/
        let customRule = new aws_events.Rule(stack, `KeepAliveRuleCustomRule`, {
            schedule: aws_events.Schedule.expression("0/5 10-18 ? * 1-5 *")
        })
        addKeepAlive(new KeepAliveStackParams({stack: stack, lambdaFunction: functionToKeepAlive, eventRule: customRule}));    }
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
        addKeepAlive(new KeepAliveStackParams({stack: this, lambdaFunction: functionToKeepAlive, handlerParams: customParams}));
    }
}
```