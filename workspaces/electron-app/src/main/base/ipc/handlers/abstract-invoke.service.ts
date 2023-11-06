const NOT_IMPEMENTED_YET = 'Method not implemented yet.';

export class AbstractInvokeService<In, Out> {
  invokingChannel(): string {
    throw new Error(NOT_IMPEMENTED_YET);
  }

  async process(..._input: In[]): Promise<Out> {
    throw new Error(NOT_IMPEMENTED_YET);
  }
}
