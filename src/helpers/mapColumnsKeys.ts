const renameProperties = (objs, Campskeys) => {
  if (Array.isArray(objs)) {
    return objs.map(obj => renameObject(obj, Campskeys));
  } else {
    return renameObject(objs, Campskeys);
  }
};

const renameObject = (obj, Campskeys) => {
  const newObj = {};
  for (const key in obj) {
    newObj[Campskeys[key] || key] = obj[key];
  }
  return newObj;
};

export default renameProperties;
