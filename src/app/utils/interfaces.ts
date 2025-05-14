export type DataObject = Record<string, unknown>;

export interface BookItem {
 id: string,
 volumeInfo: {
  authors: string[],
  categories: string[],
  publishedDate: string,
  description: string,
  subtitle: string,
  title: string,
  imageLinks: {
   smallThumbnail: string,
   thumbnail: string,
  }
 }
}

export interface BooksList {
 items: BookItem[],
}