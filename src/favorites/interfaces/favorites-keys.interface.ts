import { MusicEntityName } from '@/shared';

export type FavoritesKeys = {
  [Key in MusicEntityName as `${Key}s`]: string[];
};
