import React from "react"
import { useListMediaQuery } from "../features/media/mediaApi"
import { Box } from "@mui/material"
import { Link } from "react-router-dom"
import { Flex } from "../styled"

const Home = () => {
  const { data: medias, isLoading } = useListMediaQuery()
  if (isLoading) return <Box>Loading...</Box>
  return (
    <Flex
      sx={{
        height: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {medias?.map((media, index) => {
        return (
          <Link to={`/media/${media._id}`} key={media._id}>
            {media.title}
          </Link>
        )
      })}
    </Flex>
  )
}

export default Home
