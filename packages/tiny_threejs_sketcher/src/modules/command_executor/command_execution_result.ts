export type CommandExecutionResult = {
  isOk: () => boolean;
  isErr: () => boolean;
  match: (
    okCallback: (value: any) => void,
    errCallback: (error: Error) => void,
  ) => void;
  unwrap: () => unknown;
};

export function commandOk<T>(value?: T): CommandExecutionResult {
  return {
    isOk: () => true,
    isErr: () => false,
    match: (okCallback) => okCallback(value),
    unwrap: () => value,
  };
}

export function commandErr(error: Error): CommandExecutionResult {
  return {
    isOk: () => false,
    isErr: () => true,
    match: (_, errCallback) => errCallback(error),
    unwrap: () => {
      throw error;
    },
  };
}

