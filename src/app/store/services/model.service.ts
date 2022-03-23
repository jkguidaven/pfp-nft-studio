import { Injectable } from '@angular/core';
import { Collection } from '../models/collection';
import { Model } from '../models/model';
import { Trait, TraitVariantDictionary } from '../models/trait';

const shuffleArray = (array: any[]) => {
  var m = array.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  generateModelCombinations(
    collection: Collection,
    traits: Trait[],
    traitVariantDictionary: TraitVariantDictionary
  ): Model[] {
    const sortedTraits = this.getSortedTraits(
      collection.traitsOrdering,
      traits
    );

    const maxSupply = collection.supply ?? 0;

    const models = this.constructModels(sortedTraits, traitVariantDictionary);

    return shuffleArray(models).slice(
      0,
      Math.min(maxSupply - 1, models.length)
    );
  }

  private getSortedTraits(ordering: number[], traits: Trait[]): Trait[] {
    const sortedTraits = ordering.reduce((arr, id) => {
      const matched = traits.find((trait) => trait.id === id);

      if (matched) {
        arr.push(matched);
      }

      return arr;
    }, [] as Trait[]);

    return sortedTraits;
  }

  private constructModels(
    traits: Trait[],
    traitVariantDictionary: TraitVariantDictionary
  ): Model[] {
    if (!traits.length) return [];

    const currentTrait = traits[0];

    let variants = traitVariantDictionary[currentTrait.id ?? -1];

    if (currentTrait.guarantee < 100) {
      // If current trait is not 100% guaranteed to appear, we add filler
      variants = [
        ...variants,
        {
          id: undefined,
          name: '',
        },
      ];
    }

    if (traits.length === 1) {
      const models: Model[] = [];

      for (let variant of variants) {
        models.push({
          layers: [{ variantId: variant.id, overrides: {} }],
        });
      }

      return models;
    } else {
      const models: Model[] = [];

      for (let variant of variants) {
        for (let model of this.constructModels(
          traits.slice(1),
          traitVariantDictionary
        )) {
          model.layers.push({ variantId: variant.id, overrides: {} });
          models.push(model);
        }
      }

      return models;
    }
  }
}
