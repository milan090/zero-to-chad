import { ref, uploadBytes } from "firebase/storage";
import { db, storage } from "config/firebase.config";
import { generate } from "short-uuid";
import {
  collection,
  doc,
  FirestoreDataConverter,
  getDocs,
  query,
  QueryDocumentSnapshot,
  setDoc,
  SnapshotOptions,
  where,
} from "firebase/firestore";
import {
  PostInputs,
  PostDoc,
  RegularPost,
  QuotePost,
  QuotePostDoc,
  RegularPostDoc,
} from "src/types/post.types";
import { createPersistentDownloadUrl } from "./helpers";

export const createPost = async ({ image, ...data }: PostInputs) => {
  const postDoc: PostDoc = {
    ...data,
    likes: 0,
    views: 0,
  };
  const postId = generate();
  try {
    if (!!image) {
      const file = image.name;
      const f = file.split(".");
      const fileExt = f.pop();
      const fileName = f.join(".");

      const imageName = `${fileName}-${postId}.${fileExt}`;
      const imagePath = `images/${data.authorUsername}/${imageName}`;
      const imageRef = ref(storage, imagePath);
      const imageBlob = await image.arrayBuffer();

      const snapshot = await uploadBytes(imageRef, imageBlob);
      const { metadata } = snapshot;
      const downloadToken = (metadata.downloadTokens || [""])[0];
      const imageUrl = createPersistentDownloadUrl(
        metadata.bucket,
        metadata.fullPath,
        downloadToken
      );
      console.log(imageUrl);
      postDoc.imageUrl = imageUrl;
    }

    await setDoc(doc(db, "posts", postId), postDoc);

    return postId;
  } catch (error) {
    console.log(error);
  }
};

export const regularPosetConverter: FirestoreDataConverter<RegularPost> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toFirestore({ id, ...post }: RegularPost): RegularPostDoc {
    return post;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<RegularPostDoc>,
    options: SnapshotOptions
  ): RegularPost {
    const data = snapshot.data(options);
    return {
      ...data,
      id: snapshot.id,
    };
  },
};

export const quotePosetConverter: FirestoreDataConverter<QuotePost> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toFirestore({ id, ...post }: QuotePost): QuotePostDoc {
    return post;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<QuotePostDoc>,
    options: SnapshotOptions
  ): QuotePost {
    const data = snapshot.data(options);
    return {
      ...data,
      id: snapshot.id,
    };
  },
};

export const fetchUserPosts = async (
  userUid: string
): Promise<{ regularPosts: RegularPost[]; quotePosts: QuotePost[] }> => {
  const regularRef = query<RegularPost>(
    collection(db, "posts").withConverter(regularPosetConverter),
    where("authorUid", "==", userUid),
    where("type", "==", "regular")
  );

  const regularSnapshot = await getDocs(regularRef);
  const regularPosts = regularSnapshot.docs.map((doc) => doc.data());

  const quoteRef = query<QuotePost>(
    collection(db, "posts").withConverter(quotePosetConverter),
    where("authorUid", "==", userUid),
    where("type", "==", "quote")
  );

  const quoteSnapshot = await getDocs(quoteRef);
  const quotePosts = quoteSnapshot.docs.map((doc) => doc.data());

  return {
    regularPosts,
    quotePosts,
  };
};
