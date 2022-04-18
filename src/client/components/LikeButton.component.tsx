import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useUserStore } from "../store/user.store";
import {
  doc,
  increment,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "config/firebase.config";
import { Box, IconButton } from "@mui/material";
import { useDocumentData } from "react-firebase-hooks/firestore";

type Props = {
  id: string;
};

export const PostLikeButton: React.FC<Props> = ({ id }) => {
  const [userUid, loading] = useUserStore((state) => [
    state.uid,
    state.loading,
  ]);

  const [like, likeLoading] = useDocumentData(
    doc(db, "posts", id, "likedUsers", userUid)
  );

  const handleLike = () => {
    const likeRef = doc(db, "posts", id, "likedUsers", userUid);
    const postRef = doc(db, "posts", id);
    setDoc(likeRef, { createdAt: Timestamp.now() });
    updateDoc(postRef, { likes: increment(1) });
  };

  if (likeLoading || loading) {
    return (
      <Box>
        <FavoriteBorderOutlinedIcon />;
      </Box>
    );
  }

  return (
    <Box sx={{ height: 24 }}>
      {like ? (
        <FavoriteIcon sx={{ color: "red" }} />
      ) : (
        <IconButton onClick={handleLike} sx={{ padding: 0 }}>
          <FavoriteBorderOutlinedIcon />
        </IconButton>
      )}
    </Box>
  );
};

export const CollectionLikeButton: React.FC<Props> = ({ id }) => {
  const [userUid, loading] = useUserStore((state) => [
    state.uid,
    state.loading,
  ]);

  const [like, likeLoading] = useDocumentData(
    doc(db, "collection", id, "likedUsers", userUid)
  );

  const handleLike = () => {
    const likeRef = doc(db, "collection", id, "likedUsers", userUid);
    const postRef = doc(db, "collection", id);
    setDoc(likeRef, { createdAt: Timestamp.now() });
    updateDoc(postRef, { likes: increment(1) });
  };

  if (likeLoading || loading) {
    return (
      <Box>
        <FavoriteBorderOutlinedIcon />
      </Box>
    );
  }

  return (
    <Box sx={{ height: 24 }}>
      {like ? (
        <FavoriteIcon sx={{ color: "red" }} />
      ) : (
        <IconButton onClick={handleLike} sx={{ padding: 0 }}>
          <FavoriteBorderOutlinedIcon />
        </IconButton>
      )}
    </Box>
  );
};
