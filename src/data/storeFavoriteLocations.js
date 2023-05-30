import { openDB } from "idb/with-async-ittr";

let db;

export const addFavoriteLocation = async (city, country, lat, lon) => {
  if (db == undefined) {
    console.log("Database is closed");
    return;
  }

  const favorite = {
    name: city,
    country,
    lat,
    lon,
  };
  const tx = await db.transaction("locations", "readwrite");
  const store = tx.objectStore("locations");
  store.add(favorite);
  await tx.done;
};

export const createDB = async () => {
  db = await openDB("favorites", 1, {
    upgrade(db) {
      const store = db.createObjectStore("locations", {
        keyPath: "id",
        autoIncrement: true,
      });
      store.createIndex("name", "name");
    },
  });
};

export const removeFavoriteLocation = async (id) => {
  if (db == undefined) {
    console.log("Database is closed");
    return;
  }

  const tx = await db.transaction("locations", "readwrite");
  const store = tx.objectStore("locations");
  store.delete(id);
  await tx.done;
};

export const getFavoriteLocations = async () => {
  if (db == undefined) {
    console.log("Database is closed");
    return;
  }
  const locations = await db.getAllFromIndex("locations", "name");
  return locations;
};
