import { COMMAND_LIST } from "@src/command_system/command_list";
import { InstanceContext, getInstanceContext } from "@src/instance_context";

type CommandParameter = {
    [key: string]: string | number | boolean | string[] | number[];
};
type NormalCommand = {
    key: string;
    modification: false;
    run: (
        context: InstanceContext,
        commandParameter?: CommandParameter,
    ) => void;
};
type ModificationCommand = {
    key: string;
    modification: true;
    run: (
        context: InstanceContext,
        commandParameter?: CommandParameter,
    ) => ModificationHistory;
};
type ModificationHistory = {
    key: string;
    parameter?: CommandParameter;
    rollback: () => void;
};
export type Command = NormalCommand | ModificationCommand;

export class CommandSystem {
    sceneUuid: string;

    modificationHistoryList: ModificationHistory[];
    modificationHistoryIndex: number;

    commandMap: Map<string, Command>;

    constructor(sceneUuid: string) {
        this.sceneUuid = sceneUuid;
        this.modificationHistoryList = [];
        this.modificationHistoryIndex = -1;
        this.commandMap = new Map<string, Command>();

        COMMAND_LIST.forEach((command) =>
            this.commandMap.set(command.key, command),
        );
    }

    runCommand(key: string, commandParameter?: CommandParameter) {
        const command = this.commandMap.get(key);
        if (command == null) {
            return;
        }
        const context = getInstanceContext(this.sceneUuid);
        if (command.modification) {
            const modificationHistory = command.run(context, commandParameter);
            this.modificationHistoryList.push(modificationHistory);
            this.modificationHistoryIndex++;
        } else {
            command.run(context, commandParameter);
        }
    }

    undo(step: number = 1) {
        const rollbackIndex = this.modificationHistoryIndex - step + 1;
        if (rollbackIndex < 0) {
            return;
        }
        for (let i = this.modificationHistoryIndex; i >= rollbackIndex; i--) {
            const modificationHistory = this.modificationHistoryList[i];
            modificationHistory.rollback();
        }
        this.modificationHistoryIndex = rollbackIndex - 1;
    }
}
