/**
 * Initializes or retrieves the IndexedDB instance.
 *
 * @param {string} dbName - The name of the database.
 * @param {string} storeName - The name of the object store.
 * @returns {Promise<IDBDatabase>} A promise that resolves with the database instance.
 */
export const defineIdb = (dbName, storeName) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

/**
 * Adds a cost item to the database.
 *
 * @param {string} dbName - The name of the database.
 * @param {string} storeName - The name of the object store.
 * @param {Object} costItem - The cost item to add, containing `sum`, `category`, and `description`.
 * @returns {Promise<number>} A promise that resolves with the ID of the added item.
 */
export const addingCost = async (dbName, storeName, costItem) => {
  const db = await defineIdb(dbName, storeName);

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.add(costItem);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};
