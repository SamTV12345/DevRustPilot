export interface ImageModel {
  Id: string,
  ParentId: string,
  RepoTags: string[],
  RepoDigests: string[],
  Created: string,
  Size: number,
  SharedSize: number,
  VirtualSize: number,
  Labels: object[]
}
