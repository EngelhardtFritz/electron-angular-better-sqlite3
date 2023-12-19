const NOT_IMPEMENTED_YET = 'Method not implemented yet.';

export class AbstractReceiveService<In> {
  receptionChannel(): string {
    throw new Error(NOT_IMPEMENTED_YET);
  }

  async process(..._input: In[]): Promise<void> {
    throw new Error(NOT_IMPEMENTED_YET);
  }
}
