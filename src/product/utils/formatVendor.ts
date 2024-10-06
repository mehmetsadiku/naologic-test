/**
 * Takes a vendor object with a name and optional docId, and an optional docId.
 * Returns a vendor object with a docId and name.
 *
 * @param {Object} vendor - Vendor object with name and optional docId.
 * @param {string} [docId] - Optional docId.
 * @returns {Object} Vendor object with docId and name.
 */
export const formatVendor = (
  vendor: { name: string; id?: string },
  docId?: string,
) => {
  return {
    id: docId,
    name: vendor.name,
  };
};
