import { Injectable } from '@angular/core';
import { Model } from '../models/model';
import { Trait, TraitVariantDictionary } from '../models/trait';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  generateModelCombinations(
    trait: Trait[],
    traitVariantDictionary: TraitVariantDictionary,
    supply: number
  ): Model[] {
    return [];
  }
}
