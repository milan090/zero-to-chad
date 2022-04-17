import { Autocomplete, Skeleton, TextField, Typography } from "@mui/material";
import { db } from "config/firebase.config";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { topicConverter } from "src/services/topic.service";
import { Topic } from "src/types/topic.types";

type Props = {
  handleChange: (topics: Topic[]) => void;
  label?: string;
  bgColor?: string;
};

export const TopicsSelector: React.FC<Props> = ({
  handleChange,
  label,
  bgColor,
}) => {
  const [topics, loading] = useCollectionData<Topic>(
    collection(db, "topics").withConverter(topicConverter)
  );

  if (loading) {
    return <Skeleton variant="rectangular" height={20} width={150} />;
  } else if (!topics) {
    return <Typography>error</Typography>;
  }
  return (
    <Autocomplete //TODO: remove outline
      multiple
      limitTags={2}
      id="multiple-limit-tags"
      options={topics}
      getOptionLabel={(option) => option.name}
      onChange={(e, value) => handleChange(value || [])}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label || "Topics"}
          placeholder="Science"
          sx={{ background: bgColor || "#E8E8E8", borderRadius: 2 }}
        />
      )}
      sx={{
        width: "500px",
        borderRadius: 2,
        ".MuiAutocomplete-root": {
          backgroundColor: "grey",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          opacity: 0,
        },
        "& .MuiInputLabel-shrink": {
          color: "grey !important",
          background: "white",
        },
      }}
    />
  );
};
