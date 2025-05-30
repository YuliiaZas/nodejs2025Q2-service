import { MusicEntityName } from 'src/shared/types/music-entity-name.type';

export type FavoritesStore = Map<MusicEntityName, Set<string>>;
