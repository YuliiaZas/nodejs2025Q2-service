import { GetEntitiesByIdsType } from 'src/shared/types/get-entities-by-ids.type';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { Album } from '../entities/album.entity';

export interface AlbumsRepository {
  addAlbum(album: CreateAlbumDto): Promise<Album>;
  getAlbums(): Promise<Album[]>;
  getAlbum(id: string): Promise<Album | null>;
  deleteAlbum(id: string): Promise<boolean>;
  updateAlbumFields(
    id: string,
    updatedFields: Partial<Album>,
  ): Promise<Album | null>;
  getAlbumsByIds(ids: string[]): Promise<GetEntitiesByIdsType<Album>>;
}
