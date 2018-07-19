import { parseArgs } from "./cli";
import { AWSArgs } from "../types/awsArgs";
import { validateArgs } from "./validateArgs";
import { moveMessages } from "./moveMessages";

export function start({cli = parseArgs, validate = validateArgs, move = moveMessages} = {}) {
    const args: AWSArgs = cli();

    validate(args);

    console.log(`Starting move from ${args.source} to ${args.dest}`);

    move(args).then((numCompleted: number) => {
        console.log(`Finished moving ${numCompleted} messages`);
    }).catch((numCompleted: number) => {
        console.log(`Failed after moving ${numCompleted} messages.`);
        console.log("There should be additional logging above");
    });

}
