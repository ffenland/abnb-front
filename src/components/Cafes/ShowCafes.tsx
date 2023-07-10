import { Box, Grid, Heading, Image, Text, VStack } from "@chakra-ui/react";

const ShowCafes = () => {
  return (
    <Grid px={40} columnGap={4} rowGap={8} templateColumns={"repeat(5, 1fr)"}>
      <VStack spacing={-0.5} alignItems={"flex-start"}>
        <Box overflow={"hidden"} mb={3} rounded={"3xl"}>
          <Image
            h="280"
            objectFit={"cover"}
            src="https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20201202_117%2F1606871493850AXEYj_JPEG%2Fimage.jpg"
          />
        </Box>
        <Heading fontSize={"md"} noOfLines={1}>
          이엠스튜디오 에브리모먼트커피
        </Heading>
        <Text fontSize={"xs"} color={"gray.600"}>
          강원 강릉시 난설헌로 228-29
        </Text>
        <Text fontSize={"xs"} color={"gray.600"}>
          강원 강릉시 난설헌로 228-29
        </Text>
      </VStack>
    </Grid>
  );
};

export default ShowCafes;
