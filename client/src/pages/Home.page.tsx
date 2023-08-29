import React from "react"
import { useListMediaQuery } from "../features/media/mediaApi"
import { Box } from "@mui/material"
import ReactPlayer from "react-player"

const Home = () => {
  const { data: medias, isLoading } = useListMediaQuery()
  if (isLoading) return <Box>Loading...</Box>
  return (
    <div>
      {medias?.map((item, index) => {
        return (
          <Box key={item._id}>
            <Box key={index}>{item.title}</Box>
            <ReactPlayer
              url={"/api/media/video/" + item._id}
              controls
              light={
                <Box
                  component={"img"}
                  sx={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                  src={`data:image/${
                    item.thumbnail.contentType
                  };base64,${item.thumbnail.data.toString("base64")}`}
                  alt="Thumbnail"
                />
              }
            />
          </Box>
        )
      })}
    </div>
  )
}

export default Home
