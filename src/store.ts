import settings from "electron-settings";

class Store {
  async get(key: string) {
    return await settings.get(key);
  }

  async set(key: string, val: any) {
    await settings.set(key, val);
  }
}

export default Store;
