export const productoDto = (producto:any, id:number, timestamp:Date) => ({
  id,
  timestamp,
  ...producto,
});

