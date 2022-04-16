import { db, storage } from "config/firebase.config";
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
import { ref, uploadBytes } from "firebase/storage";
import { generate } from "short-uuid";
import {
  CollectionData,
  CollectionDataDoc,
  CollectionDataInput,
} from "src/types/collection.types";
import { createPersistentDownloadUrl } from "./helpers";

export const createCollection = async ({
  image,
  ...data
}: CollectionDataInput) => {
  const collectionDoc: CollectionDataDoc = {
    ...data,
    likes: 0,
    views: 0,
  };
  const collectionId = generate();
  try {
    if (!!image) {
      const file = image.name;
      const f = file.split(".");
      const fileExt = f.pop();
      const fileName = f.join(".");

      const imageName = `${fileName}-${collectionId}.${fileExt}`;
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
      collectionDoc.imageUrl = imageUrl;
    }

    await setDoc(doc(db, "collection", collectionId), collectionDoc);

    return collectionId;
  } catch (error) {
    console.log(error);
  }
};

export const collectionConverter: FirestoreDataConverter<CollectionData> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toFirestore({ id, ...post }: CollectionData): CollectionDataDoc {
    return post;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<CollectionDataDoc>,
    options: SnapshotOptions
  ): CollectionData {
    const data = snapshot.data(options);
    return {
      ...data,
      id: snapshot.id,
    };
  },
};

export const fetchUserCollections = async (
  userUid: string
): Promise<CollectionData[]> => {
  const { docs } = await getDocs(
    query<CollectionData>(
      collection(db, "collection").withConverter(collectionConverter),
      where("authorUid", "==", userUid)
    )
  );

  return docs.map((doc) => doc.data());
};
