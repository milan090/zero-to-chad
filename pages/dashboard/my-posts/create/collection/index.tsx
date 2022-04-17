import { NextPage } from "next";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { SideBar } from "src/client/layouts/SideBar.layout";
//import { storage } from "firebase/storage";
import ChevronLeftIcon from "public/images/dashboard/akar-icons_chevron-left.svg";

import { SubmitHandler, useForm } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import { CollectionDataInput } from "src/types/collection.types";
import { useUserStore } from "src/client/store/user.store";
import { useRouter } from "next/router";
import { TopicsSelector } from "src/client/components/TopicsSelector.component";
import { Topic } from "src/types/topic.types";
import { createCollection } from "src/services/collection.service";
import toast from "react-hot-toast";

type Inputs = {
  name: string;
  description: string;
};

const CreateCollectionPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [thumpnail, setThumpnail] = useState<null | File>(null);
  const user = useUserStore(({ uid, username }) => ({ uid, username }));
  const [selectedTopics, setselectedTopics] = useState<string[]>([]);
  const router = useRouter();

  const handleSelectedTopicsChange = (topics: Topic[]) => {
    setselectedTopics(topics.map((topic) => topic.id));
  };

  const onThumbnailChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event === null) return;
    if (event.target.files !== null) {
      setThumpnail(event.target.files[0]);
      console.log(event.target.files[0]);
    }
  };

  const handleCreate: SubmitHandler<Inputs> = ({ name, description }) => {
    const data: CollectionDataInput = {
      name,
      description,
      image: thumpnail || null,
      authorUid: user.uid,
      authorUsername: user.username,
      posts: [],
      tags: selectedTopics,
    };
    console.log(data);
    const collection = createCollection(data)
      .then((id) => {
        console.log(id);
        router.push("/dashboard/my-posts");
      })
      .catch((err) => console.log(err));
    toast.promise(collection, {
      loading: "Creating Collection...",
      success: <b>New Collection created!</b>,
      error: <b>Failed to create collection</b>,
    });
  };

  const appBarChildren = (
    <Box sx={{ display: "flex" }}>
      <ChevronLeftIcon />
      <Typography
        fontWeight="500"
        color="#79766E"
        sx={{ marginLeft: 1, marginTop: 0.2 }}
      >
        Posts/Create/Post/Collection
      </Typography>
    </Box>
  );

  return (
    <SideBar appBarChildren={appBarChildren}>
      <form
        style={{
          margin: "auto",
          maxWidth: 1300,
          padding: "0 2rem",
          boxSizing: "content-box",
        }}
        onSubmit={handleSubmit(handleCreate)}
      >
        <Typography variant="h4" fontWeight="600" sx={{ paddingTop: 3 }}>
          Create Collection
        </Typography>
        <Box sx={{ display: "flex", paddingTop: "1rem" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "background.paper",
              p: "1.5rem 1.5rem 3rem 1.5rem",
              borderRadius: "1rem",
              maxWidth: "44rem",
            }}
          >
            <input
              type="text"
              placeholder="Title goes here"
              style={{
                fontSize: "1.5rem",
                fontWeight: "500",
                border: "none",
                fontFamily: "Inter",
                outline: "none",
              }}
              {...register("name")}
            />
            <textarea
              id="content"
              // cols={30}
              rows={7}
              placeholder="Add a short description for others to read and know what this is about"
              style={{
                border: "none",
                outline: "none",
                fontFamily: "Inter",
                marginTop: "1.5rem",
                marginLeft: "0.25rem",
                fontSize: "1rem",
                width: "100%",
                // height: "25rem",
                resize: "none",
              }}
              {...register("description", {
                minLength: {
                  value: 20,
                  message: "Content should be atleast 20 characters long",
                },
                maxLength: {
                  value: 100,
                  message: "Content shouldn't be longer than 100 characters",
                },
              })}
            />
            <Typography color="error" variant="caption">
              {errors.description?.message}
            </Typography>
            <TopicsSelector
              handleChange={handleSelectedTopicsChange}
              label="Tags"
            />
          </Box>

          <Card
            sx={{
              width: 223,
              height: 223,
              borderRadius: 4,
              bgcolor: "#E8E8E8",
              marginLeft: 5,
              textAlign: "center",
            }}
          >
            <label htmlFor="upload-photo">
              <input
                accept="image/*"
                id="upload-photo"
                style={{ display: "none" }}
                type="file"
                onChange={onThumbnailChange}
              />
              <CardActionArea
                component="div"
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                }}
              >
                <CardContent sx={{ margin: "auto" }}>
                  <Typography fontWeight="500" sx={{ wordBreak: "break-all" }}>
                    {thumpnail?.name || "Upload Image"}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </label>
          </Card>
        </Box>
        <Button type="submit" sx={{ marginTop: "1rem" }} variant="contained">
          Create
        </Button>
      </form>
    </SideBar>
  );
};

export default CreateCollectionPage;
