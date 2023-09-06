import React from "react"
import { Box, Stack, Typography, Button, styled } from "@mui/material"
import { useParams } from "react-router-dom"
import { skipToken } from "@reduxjs/toolkit/dist/query"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"
import { useGetMediaQuery } from "../features/media/mediaApi"
import FullScreenLoading from "../components/FullScreenLoading"
import { Flex } from "../styled"

const MediaWrapper = styled(Box)(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",

  "&:after": {
    content: "''",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.2)",
    zIndex: 10,
  },
}))

const MediaInfoContainer = styled(Stack)(({ theme }) => ({
  position: "relative",
  zIndex: 20,
  marginTop: "auto",
  padding: theme.spacing(8),
  maxWidth: "45%",
}))

const Genre = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  border: `1px solid #ccc`,
  padding: theme.spacing(0.5, 1.5),
}))

const Media = () => {
  const { mediaId } = useParams()
  const { data: media, isLoading } = useGetMediaQuery(mediaId ?? skipToken)
  if (isLoading) return <FullScreenLoading />
  return (
    <MediaWrapper
      sx={{
        backgroundImage: `url(data:image/${
          media?.thumbnail.contentType
        };base64,${media?.thumbnail.data.toString("base64")})`,
      }}
    >
      <MediaInfoContainer gap={1.5}>
        <Typography component="h4" variant="h4" fontWeight="bold">
          {media?.title}
        </Typography>
        <Flex justifyContent="flex-start">
          <PlayArrowIcon color="primary" />
          <Typography component="span" color="primary" marginLeft={1}>
            Watch trailer
          </Typography>
        </Flex>
        <Stack direction="row" gap={2}>
          <Genre>{!media?.genre || "Action"}</Genre>
          <Genre>{!media?.genre || "Honor"}</Genre>
          <Genre>{!media?.genre || "Hollywood"}</Genre>
        </Stack>
        <Typography>{media?.description}</Typography>
        <Stack direction="row" gap={4}>
          <Typography>Run time</Typography>
          <Typography>2h35</Typography>
        </Stack>
        <Stack direction="row" gap={4}>
          <Typography>Directed</Typography>
          <Typography>{media?.director || "Tom Cruise"}</Typography>
        </Stack>
        <Stack direction="row" gap={4}>
          <Typography>Cast </Typography>
          <Typography>{media?.actors || "Tom Cruise"}</Typography>
        </Stack>
        <Stack direction="row" gap={4} alignItems="center">
          <Typography>Rating </Typography>
          <Genre sx={{ opacity: 0.8 }}>{"IMDB: 8/10"}</Genre>
        </Stack>
        <Stack direction="row" maxWidth="fit-content" spacing={2}>
          <Button variant="contained" startIcon={<PlayArrowIcon />} />
          <Button
            startIcon={<PlaylistAddIcon />}
            sx={{ bgcolor: "secondary.light" }}
          />
        </Stack>
      </MediaInfoContainer>
    </MediaWrapper>
  )
}

export default Media
