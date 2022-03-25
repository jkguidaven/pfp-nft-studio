import { Injectable } from '@angular/core';
import { Collection } from '../models/collection';
import { Model, ModelQueue } from '../models/model';
import { Trait, TraitVariantListDictionary } from '../models/trait';

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

export const GENERATOR_CANVAS = 'generatorCanvas';
import { fabric } from 'fabric';
import { DBService, STORES } from './db.service';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  constructor(private dbService: DBService) {}

  addModelQueue(collectionId: number): Observable<ModelQueue> {
    return from(
      this.dbService.addToStore(STORES.COLLECTION_MODEL_QUEUE, {
        collectionId,
        currentIndex: -1,
      })
    );
  }

  resetModelQueue(collectionId: number): Observable<ModelQueue> {
    return from(
      this.dbService.updateToStore(
        STORES.COLLECTION_MODEL_QUEUE,
        {
          collectionId,
          currentIndex: -1,
        },
        collectionId
      )
    );
  }

  removeModelQueue(collectionId: number): Observable<void> {
    return from(
      this.dbService.deleteFromStore(
        STORES.COLLECTION_MODEL_QUEUE,
        collectionId
      )
    );
  }

  generateModelCombinations(
    collection: Collection,
    traits: Trait[],
    traitVariantListDictionary: TraitVariantListDictionary
  ): Model[] {
    const sortedTraits = this.getSortedTraits(
      collection.traitsOrdering,
      traits
    );

    const maxSupply = collection.supply ?? 0;

    const models = this.constructModels(
      sortedTraits,
      traitVariantListDictionary
    );

    return shuffleArray(models).slice(
      0,
      Math.min(maxSupply - 1, models.length)
    );
  }

  getModelImage(width: number, height: number, model: Model): Promise<string> {
    const canvas = new fabric.Canvas(GENERATOR_CANVAS, {
      width,
      height,
      backgroundColor: '#fff',
      selection: false,
      preserveObjectStacking: true,
    });

    canvas.clear();
    for (let layer of model.layers) {
      const { variant } = layer;

      if (variant) {
        fabric.Image.fromURL(
          variant.src || '',
          (image) => {
            canvas.add(image);
          },
          {
            scaleX: layer.overrides.scaleX ?? variant.scaleX ?? 1,
            scaleY: layer.overrides.scaleY ?? variant.scaleY ?? 1,
            top: layer.overrides.top ?? variant.top ?? 0,
            left: layer.overrides.left ?? variant.left ?? 0,
          }
        );
      }
    }

    canvas.renderAll();

    return new Promise((resolve) => {
      setTimeout(() => resolve(canvas.toDataURL()));
    });
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
    traitVariantListDictionary: TraitVariantListDictionary
  ): Model[] {
    if (!traits.length) return [];

    const currentTrait = traits[0];

    let variants = traitVariantListDictionary[currentTrait.id ?? -1];

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
          layers: [{ variant, overrides: {} }],
        });
      }

      return models;
    } else {
      const models: Model[] = [];

      for (let variant of variants) {
        for (let model of this.constructModels(
          traits.slice(1),
          traitVariantListDictionary
        )) {
          model.layers.push({ variant, overrides: {} });
          models.push(model);
        }
      }

      return models;
    }
  }
}
