import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IBaseRepository } from './intefaces/base-repository.interface';
import { Model } from '../models/base.model';
import { STORAGE_KEY } from './storage-tokens';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageRepository<T extends Model> implements IBaseRepository<T> {
  constructor(@Inject(STORAGE_KEY) private storageKey: string) {}  // Usa @Inject para inyectar el token

  getAll(): Observable<T[]> {
    const data = localStorage.getItem(this.storageKey);
    const entities: T[] = data ? JSON.parse(data) : [];
    return of(entities);
  }

  getById(id: string): Observable<T | null> {
    const data = localStorage.getItem(this.storageKey);
    const entities: T[] = data ? JSON.parse(data) : [];
    const entity = entities.find(e => e.id === id) || null;
    return of(entity);
  }

  add(entity: T): Observable<string> {
    const data = localStorage.getItem(this.storageKey);
    const entities: T[] = data ? JSON.parse(data) : [];

    entity.id = (new Date().getTime()).toString();
    entity.createdAt = new Date().toISOString();
    entity.updatedAt = new Date().toISOString();

    entities.push(entity);
    localStorage.setItem(this.storageKey, JSON.stringify(entities));

    return of(entity.id);
  }

  update(id: string, entity: T): Observable<void> {
    const data = localStorage.getItem(this.storageKey);
    let entities: T[] = data ? JSON.parse(data) : [];

    entity.updatedAt = new Date().toISOString();
    entities = entities.map(e => e.id === id ? entity : e);

    localStorage.setItem(this.storageKey, JSON.stringify(entities));
    return of();
  }

  delete(id: string): Observable<void> {
    const data = localStorage.getItem(this.storageKey);
    let entities: T[] = data ? JSON.parse(data) : [];

    entities = entities.filter(e => e.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(entities));

    return of();
  }
}