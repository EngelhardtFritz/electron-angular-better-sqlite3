/**
 * Interface which defines the expected properties of the version
 * The release candidate version is optional
 */
export interface IAppVersion {
  major: number;
  minor: number;
  patch: number;
  releaseCandidate?: number;
}
