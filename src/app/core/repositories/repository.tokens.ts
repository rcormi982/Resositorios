// src/app/repositories/repository.tokens.ts
import { InjectionToken } from '@angular/core';
import { IPeopleRepository } from './intefaces/people-repository.interface';
import { IBaseRepository } from './intefaces/base-repository.interface';

// Token genérico para cualquier repositorio base
export const REPOSITORY_TOKEN = new InjectionToken<IBaseRepository<any>>('REPOSITORY_TOKEN');
// Token específico para el repositorio de personas
export const PEOPLE_REPOSITORY_TOKEN = new InjectionToken<IPeopleRepository>('IPeopleRepository');
// Token para la URL de una API específica de personas
export const PEOPLE_API_URL = new InjectionToken<string>('PeopleApiUrl');
