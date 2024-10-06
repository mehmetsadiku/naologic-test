export async function formatProductData(row: any, vendorId: string) {
  const product = {
    vendorId: vendorId,
    manifacturerId: row.ManufacturerID,
    data: {
      name: row['ProductName'],
      productId: row['ProductID'],
      type: 'non-inventory',
      shortDescription: '',
      description: '',
      vendorId: vendorId,
      // manufacturerId: await getManufacturerId(row['ManufacturerName']),
    },
  };

  return product;
}
