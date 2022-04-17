import { TextField, Autocomplete, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CollectionData } from "src/types/collection.types";
import { useUserStore } from "../store/user.store";
import { fetchUserCollections } from "src/services/collection.service";

type Props = {
  handleChange: (collection: string | null) => void;
};

export const CollectionSelector: React.FC<Props> = ({ handleChange }) => {
  const [userUid] = useUserStore((state) => [state.uid]);
  const [collections, setCollections] = useState<CollectionData[]>([]);

  useEffect(() => {
    if (userUid) {
      fetchUserCollections(userUid).then((res) => {
        setCollections(res);
      });
    }
  }, [userUid]);

  if (!collections) {
    return <Typography>error</Typography>;
  }

  return (
    <Autocomplete
      options={collections}
      getOptionLabel={(collection) => collection.name}
      id="select collection"
      blurOnSelect
      onChange={(e, value) => handleChange(value?.id || null)}
      renderInput={(params) => <TextField {...params} label="Collection" />}
      sx={{
        ".MuiAutocomplete-root": {
          backgroundColor: "grey",
        },
        "& .Mui-focused": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "black !important",
            borderWidth: "1px",
          },
        },
        "& .MuiInputLabel-shrink": {
          color: "grey !important",
          background: "white",
        },
      }}
    />
  );
};
