import { Injectable } from '@angular/core';
import { IDBPDatabase, openDB } from 'idb';
import { from, Observable } from 'rxjs';

const DB_VERSION = 1;
const DB_NAME = 'localDB';

export const STORES = {
  COLLECTION: 'collection_store',
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
          db.createObjectStore(store, { autoIncrement: true });
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

  async addToStore(storeName: string, data: any): Promise<void> {
    const db = await this.getDB();
    await db.add(storeName, data);
  }

  async deleteFromStore(storeName: string, key: any): Promise<void> {
    const db = await this.getDB();
    await db.delete(storeName, key);
  }
}
