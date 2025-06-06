import { MusicEntityName } from '@/shared';

export type FavoritesIds = {
  [Key in MusicEntityName as `${Key}sIds`]: string[];
};
