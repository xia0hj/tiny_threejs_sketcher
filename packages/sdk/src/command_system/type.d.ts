import {
    CommandKeyList,
    CommandParameter,
} from "@src/command_system/command_list";
import { InstanceContext } from "@src/instance_context";

type CommandRunner<CommandKey, RETURN> =
    CommandKey extends keyof CommandParameter
        ? (
              context: InstanceContext,
              commandParameter: CommandParameter[CommandKey],
          ) => RETURN
        : (context: InstanceContext) => RETURN;
type NormalCommand = {
    key: CommandKeyListType;
    modification: false;
    run: CommandRunner<NormalCommand["key"], void>;
};
type ModificationCommand = {
    key: CommandKeyListType;
    modification: true;
    run: CommandRunner<NormalCommand["key"], ModificationHistory>;
};

type ModificationHistoryParameter<CommandKey> =
    CommandKey extends keyof CommandParameter
        ? CommandParameter[CommandKey]
        : undefined;
export type ModificationHistory = {
    key: CommandKeyListType;
    parameter?: ModificationHistoryParameter<ModificationHistory["key"]>;
    rollback: () => void;
};

export type CommandKeyListType =
    (typeof CommandKeyList)[keyof typeof CommandKeyList];

export type Command = NormalCommand | ModificationCommand;
