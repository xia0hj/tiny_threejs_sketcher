import { CommandSystem } from "@src/command_system";
import { test } from "vitest";

test("example", () => {
    const commandSystem = new CommandSystem("a");
    commandSystem.runCommand("c");
});
