/**
 * Converts a Mongoose lean document into a serializable plain JavaScript object.
 *
 * @param {Object} leanDocument - The Mongoose lean document to be converted.
 * @returns {Object} A plain JavaScript object that is a serializable representation of the input document.
 */

 export function toPlainObject(doc) {
  return JSON.parse(JSON.stringify(doc));
}

