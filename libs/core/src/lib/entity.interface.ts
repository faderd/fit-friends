export interface EntityInterface<T> {
  toObject(): T;
  fillEntity(entity);
}
