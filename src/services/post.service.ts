import { ref, uploadBytes } from "firebase/storage";
import { db, storage } from "config/firebase.config";
import { generate } from "short-uuid";
import { doc, setDoc } from "firebase/firestore";
import { PostInputs, PostDoc } from "src/types/post.types";
import { createPersistentDownloadUrl } from "./helpers";

export const createPost = async ({ image, ...data }: PostInputs) => {
  const regularPostDoc: PostDoc = {
    ...data,
    imageUrl: null,
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
      regularPostDoc.imageUrl = imageUrl;
    }

    await setDoc(doc(db, "posts", postId), regularPostDoc);

    return postId;
  } catch (error) {
    console.log(error);
  }
};
