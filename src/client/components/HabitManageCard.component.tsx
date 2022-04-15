import * as React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Checkbox,
  Typography,
} from "@mui/material";
import CircleChecked from "@mui/icons-material/CheckCircle";
import CircleUnchecked from "@mui/icons-material/RadioButtonUnchecked";

type Props = {
  name: string;
  description: string;
  handleClick: () => void;
  checked: boolean;
  variant: "background" | "white";
};

export const HabitManageCard: React.FC<Props> = ({
  name,
  description,
  handleClick,
  checked,
  variant = "white",
}) => {
  const bgColor = variant === "background" ? "background.default" : "white";
  const bgColorChecked =
    variant === "background" ? "primary.main" : "background.default";

  return (
    <Card
      sx={{
        maxWidth: 218,
        height: 148,
        borderRadius: "1rem",
        backgroundColor: checked ? bgColorChecked : bgColor,
      }}
    >
      <CardActionArea
        onClick={handleClick}
        sx={{ height: "100%", display: "flex", alignItems: "flex-start" }}
      >
        <CardContent sx={{}}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ margin: 0 }}
          >
            {name}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Checkbox
            icon={<CircleUnchecked />}
            checkedIcon={
              <CircleChecked
                style={
                  {
                    // color: "#4CA4FD",
                  }
                }
                color="info"
              />
            }
            style={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
            checked={checked}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
