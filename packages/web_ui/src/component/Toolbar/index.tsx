import { type ReactElement } from "react";

export type CommandButton = {
  label: string;
  icon: ReactElement;
  panel: ReactElement;
};

export function Toolbar(buttonList: CommandButton[]): ReactElement {
  return <div>1</div>
}
