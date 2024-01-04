const NOT_IMPEMENTED_YET = 'Method not implemented yet.';

export class AbstractSendService<Out> {
  sendingChannel(): string {
    throw new Error(NOT_IMPEMENTED_YET);
  }

  process(): Promise<Out> {
    throw new Error(NOT_IMPEMENTED_YET);
  }
}
