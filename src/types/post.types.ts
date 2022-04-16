export interface RegularPostInputs {
  type: "regular";
  title: string;
  content: string;
  image: File | null;
  collectionId?: string;
  authorUid: string;
  authorUsername: string;
}

export interface RegularPostDoc extends Omit<RegularPostInputs, "image"> {
  imageUrl?: string;
  likes: number;
  views: number;
}

export interface RegularPost extends RegularPostDoc {
  id: string;
}

//
// Quotes Posts
//
export interface QuotePostInputs {
  type: "quote";
  author: string;
  content: string;
  image: File | null;
  collectionId?: string;
  authorUid: string;
  authorUsername: string;
}

export interface QuotePostDoc extends Omit<QuotePostInputs, "image"> {
  imageUrl?: string;
  likes: number;
  views: number;
}

export interface QuotePost extends QuotePostDoc {
  id: string;
}

export type PostInputs = RegularPostInputs | QuotePostInputs;
export type PostDoc = RegularPostDoc | QuotePostDoc;
export type Post = RegularPost | QuotePost;
