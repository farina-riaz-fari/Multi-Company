import { openDB } from "idb";

const DB_NAME = "SettingsDB";
const STORE_NAME = "settings";

export const getSettingsDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
};

export const saveSettingsToDB = async (settings) => {
  const db = await getSettingsDB();
  await db.put(STORE_NAME, {
    id: "app-settings",
    ...settings,
  });
};

export const getSettingsFromDB = async () => {
  const db = await getSettingsDB();
  return await db.get(STORE_NAME, "app-settings");
};
