export interface Trip {
  _id: string, // Mongodb Object ID
  code: string,
  name: string,
  length: string,
  start: Date,
  resort: string,
  perPerson: string,
  image: string,
  description: string
}
