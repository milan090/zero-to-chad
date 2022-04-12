import { ref, uploadBytes } from "firebase/storage";
import { db, storage } from "config/firebase.config";
import { generate } from "short-uuid";
import { doc, setDoc } from "firebase/firestore";

type PostType = "regular" | "quote";

export interface RegularPostData {
  type: PostType;
  title: string;
  content: string;
  image: File | null;
  collectionId?: string;
  authorUid: string;
  authorUsername: string;
}

interface RegularPostDoc {
  type: PostType;
  title: string;
  content: string;
  image: string | null;
  collectionId?: string;
  authorUid: string;
  authorUsername: string;
}

export const createRegularPost = async (data: RegularPostData) => {
  const regularPostDoc: RegularPostDoc = {
    ...data,
    image: null,
  };
  const postId = generate();
  try {
    if (!!data.image) {
      const file = data.image.name;
      const f = file.split(".");
      const fileExt = f.pop();
      const fileName = f.join(".");

      const imageName = `${fileName}-${postId}.${fileExt}`;
      const imageUrl = `images/${data.authorUsername}/${imageName}`;
      const imageRef = ref(storage, imageUrl);
      const imageBlob = await data.image.arrayBuffer();

      await uploadBytes(imageRef, imageBlob);
      regularPostDoc.image = imageUrl;
    }

    await setDoc(doc(db, "posts", postId), regularPostDoc);

    return postId;
  } catch (error) {
    console.log(error);
  }
};
