const NOT_IMPEMENTED_YET = 'Method not implemented yet.';

export class AbstractService<In, Out> {
  receptionChannel(): string {
    throw new Error(NOT_IMPEMENTED_YET);
  }

  sendingChannel(): string | null {
    throw new Error(NOT_IMPEMENTED_YET);
  }

  async process(_input: In): Promise<Out> {
    throw new Error(NOT_IMPEMENTED_YET);
  }
}
