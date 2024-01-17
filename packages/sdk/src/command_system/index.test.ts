import { CommandSystem } from "@src/command_system";
import { CommandKeyList } from "@src/command_system/command_list";
import { test } from "vitest";

test.skip("type", () => {
  const commandSystem = new CommandSystem({} as any);
  commandSystem.runCommand({
    key: CommandKeyList.create_plane,
    parameter: {
      offset: 0,
      parallelTo: "XY",
    },
  });
  commandSystem.runCommand({ key: CommandKeyList.set_orthographic_camera });
  commandSystem.runCommand({ key: CommandKeyList.set_perspective_camera });
  commandSystem.runCommand({
    key: CommandKeyList.undo,
    parameter: { step: 1 },
  });
});
