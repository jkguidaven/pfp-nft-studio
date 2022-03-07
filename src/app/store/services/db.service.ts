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
  [STORES.TRAIT]: { keyPath: 'id' },
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
          db.createObjectStore(store, STORE_CONFIG[store]);
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

  async getAllFromStore(storeName: string): Promise<any[]> {
    const db = await this.getDB();
    let cursor = await db.transaction(storeName).store.openCursor();

    const results: any[] = [];

    while (cursor) {
      results.push({
        id: cursor.key,
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

  async deleteFromStore(storeName: string, key: any): Promise<void> {
    const db = await this.getDB();
    await db.delete(storeName, key);
  }
}
