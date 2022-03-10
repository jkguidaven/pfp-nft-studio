import { Injectable } from '@angular/core';
import { IDBPDatabase, openDB } from 'idb';
import { from, Observable } from 'rxjs';

const DB_VERSION = 1;
const DB_NAME = 'localDB';

export const STORES = {
  COLLECTION: 'collection_store',
  TRAIT: 'trait_store',
};

const STORE_CONFIG = {
  [STORES.COLLECTION]: { autoIncrement: true },
  [STORES.TRAIT]: { autoIncrement: true },
};

const STORE_INDEXES = {
  [STORES.TRAIT]: ['collectionId'],
};

@Injectable({
  providedIn: 'root',
})
export class DBService {
  private db!: IDBPDatabase<any>;
  constructor() {}

  private async initDB(): Promise<void> {
    this.db = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        for (let store of Object.values(STORES)) {
          const objStore = db.createObjectStore(store, STORE_CONFIG[store]);

          if (STORE_INDEXES[store]) {
            for (let index of STORE_INDEXES[store]) {
              objStore.createIndex(index, index);
            }
          }
        }
      },
    });
  }

  getDB(): Promise<IDBPDatabase<any>> {
    return new Promise((resolve) => {
      if (this.db) resolve(this.db);
      else {
        this.initDB().then(() => {
          resolve(this.db);
        });
      }
    });
  }

  async getFromStore(storeName: string, key: any): Promise<any> {
    const db = await this.getDB();
    const store = db.transaction(storeName).objectStore(storeName);
    return store.get(key);
  }

  async getFromStoreIndex(
    storeName: string,
    indexName: string,
    key: any
  ): Promise<any> {
    const db = await this.getDB();
    const store = db.transaction(storeName).objectStore(storeName);
    const index = store.index(indexName);
    let cursor = await index.openCursor();

    const results: any[] = [];

    while (cursor) {
      results.push({
        id: cursor.primaryKey,
        ...cursor.value,
      });
      cursor = await cursor.continue();
    }

    return results;
  }

  async getAllFromStore(storeName: string): Promise<any[]> {
    const db = await this.getDB();
    let cursor = await db.transaction(storeName).store.openCursor();

    const results: any[] = [];

    while (cursor) {
      results.push({
        id: cursor.primaryKey,
        ...cursor.value,
      });
      cursor = await cursor.continue();
    }

    return results;
  }

  async addToStore(storeName: string, data: any): Promise<any> {
    const db = await this.getDB();
    const result = await db.add(storeName, data);
    return {
      id: result,
      ...data,
    };
  }

  async updateToStore(storeName: string, data: any, key: any): Promise<any> {
    const db = await this.getDB();
    await db.put(storeName, data, key);
    return data;
  }

  async deleteFromStore(storeName: string, key: any): Promise<void> {
    const db = await this.getDB();
    await db.delete(storeName, key);
  }
}
