// findObjectIndex fonksiyonu
 export function findObjectIndex(array, objectToFind, excludeKey) {
  toRaw(array)
  toRaw(objectToFind)
  const filteredObjectToFind = JSON.stringify(
    Object.keys(objectToFind)
      .filter(key => key !== excludeKey)
      .sort()
      .reduce((obj, key) => {
        obj[key] = objectToFind[key];
        return obj;
      }, {})
  );

  return array.findIndex(obj => {
    const filteredObj = JSON.stringify(
      Object.keys(obj)
        .filter(key => key !== excludeKey)
        .sort()
        .reduce((newObj, key) => {
          newObj[key] = obj[key];
          return newObj;
        }, {})
    );
    return filteredObj === filteredObjectToFind;
  });
}


export function formatPrice(value) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

