export interface CollectionDataInput {
  name: string;
  description: string;
  image: File | null;
  tags: string[];
  posts: string[];
  authorUsername: string;
  authorUid: string;
}

export interface CollectionDataDoc extends Omit<CollectionDataInput, "image"> {
  imageUrl?: string;
  likes: number;
  views: number;
}

export interface CollectionData extends CollectionDataDoc {
  id: string;
}
