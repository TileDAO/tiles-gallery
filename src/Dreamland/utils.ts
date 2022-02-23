import { DreamMetadata, UnlockedDreamMetadata } from './models/dreamMetadata'

export const metadataIsLocked = (
  metadata: DreamMetadata | UnlockedDreamMetadata,
) => !!(metadata as DreamMetadata).image
