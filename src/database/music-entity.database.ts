import { Injectable } from '@nestjs/common';

import {
  EntityName,
  GetEntitiesByIdsType,
  MusicEntity,
  MusicEntityActions,
  PrismaService,
} from '@/shared/';

@Injectable()
export class MusicEntityDatabase<
  T extends { id: string } = MusicEntity,
  CreateDto extends Partial<Omit<T, 'id'>> = Partial<Omit<T, 'id'>>,
> implements MusicEntityActions<T, CreateDto>
{
  constructor(
    protected readonly table: EntityName,
    protected readonly prisma: PrismaService,
  ) {}

  private get data() {
    return this.prisma[this.table] as any;
  }

  async add(musicEntityParams: CreateDto): Promise<T> {
    return this.data.create({ data: musicEntityParams });
  }

  async getAll(): Promise<T[]> {
    return this.data.findMany();
  }

  async getById(id: string): Promise<T | null> {
    return this.data.findUnique({ where: { id } });
  }

  async deleteById(id: string): Promise<boolean> {
    return this.data
      .delete({ where: { id } })
      .then(() => true)
      .catch(() => false);
  }

  async update(id: string, updatedData: Partial<T>): Promise<T | null> {
    return this.data
      .update({
        where: { id },
        data: updatedData,
      })
      .catch(() => null);
  }

  async getByIds(ids: string[]): Promise<GetEntitiesByIdsType<T>> {
    const foundItems: T[] = await this.data.findMany({
      where: { id: { in: ids } },
    });

    const foundIds = new Set(foundItems.map((item) => item.id));
    const notFoundIds = ids.filter((id) => !foundIds.has(id));

    return {
      items: foundItems,
      notFoundIds,
    };
  }
}
