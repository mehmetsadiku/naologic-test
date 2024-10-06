/**
 * Takes a variant object from the CSV and formats it into a standardized
 * variant object that can be used to create a new product variant in the
 * database.
 *
 * @param {Object} variant - Variant object from the CSV.
 * @returns {Object} Formatted variant object.
 */
/******  f671ae94-906f-44cf-8057-cae43e876097  *******/
export const formatVariant = (variant: any) => {
  return {
    itemId: variant.ItemID,
    description: variant.ItemDescription,
    packaging: variant.PKG,
    unitPrice: parseFloat(variant.UnitPrice),
    quantityOnHand: parseInt(variant.QuantityOnHand),
  };
};
