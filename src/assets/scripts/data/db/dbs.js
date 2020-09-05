import { openDB } from 'idb';
import CONFIG from '../../global/config.js';

const { DATABASE_NAME, DATABASE_VERSION } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
    upgrade(database) {
        if (!database.objectStoreNames.contains('restaurant')) {
            database.createObjectStore('restaurant', { keyPath: 'id' });
        }
    },
});

export default dbPromise;