export interface IBaseRepository<Entity> {
  getOneById(id: string): Promise<Entity>;
  save(entity: Entity): Promise<void>;
}
