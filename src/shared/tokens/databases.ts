import { EntityName } from '../types/entity-name.enum';

export const TOKEN_DATABASE = {
  [EntityName.USER]: 'UsersDatabase',
  [EntityName.ARTIST]: 'ArtistsDatabase',
  [EntityName.ALBUM]: 'AlbumsDatabase',
  [EntityName.TRACK]: 'TracksDatabase',
  favorites: 'FavoritesDatabase',
} as const;
