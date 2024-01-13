import { CommandSystem } from "@src/command_system";
import { CommandKeyList } from "@src/command_system/command_list";
import { test } from "vitest";

test("example", () => {
  const commandSystem = new CommandSystem("a");
  commandSystem.runCommand(CommandKeyList.createPlane, {
    offset: 0,
    parallelTo: "XY",
  });
  commandSystem.runCommand(CommandKeyList.setPerspectiveCamera);
  commandSystem.runCommand(CommandKeyList.setOrthographicCamera);
});
