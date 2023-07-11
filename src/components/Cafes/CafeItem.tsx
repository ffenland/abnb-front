import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaStar, FaRegHeart } from "react-icons/fa";
const CafeItem = () => {
  const gray = useColorModeValue("gray.600", "gray.300");
  return (
    <VStack spacing={1} alignItems={"flex-start"}>
      <Box position={"relative"} overflow={"hidden"} mb={3} rounded={"3xl"}>
        <Image
          minH="280"
          objectFit={"cover"}
          src="https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20201202_117%2F1606871493850AXEYj_JPEG%2Fimage.jpg"
        />
        <Button
          variant={"unstyled"}
          position={"absolute"}
          top={0}
          right={0}
          color={"gray.200"}
        >
          <FaRegHeart size={20} />
        </Button>
      </Box>
      <Box w={"100%"}>
        <Grid gap={2} templateColumns={"6fr 1fr"}>
          <Text as={"b"} fontSize={"md"} noOfLines={1}>
            이엠스튜디오 에브리모먼트커피
          </Text>
          <HStack
            _hover={{
              color: "yellow.500",
            }}
            spacing={1}
          >
            <FaStar size={15} />
            <Text>5.0</Text>
          </HStack>
        </Grid>
        <Text fontSize={"xs"} color={gray}>
          강원 강릉시 난설헌로 228-29
        </Text>
      </Box>
      <Text w={"100%"} noOfLines={1} fontSize={"xs"} color={gray}>
        잔디밭에 텐트가 설치된 캠핑 감성 카페
      </Text>
    </VStack>
  );
};

export default CafeItem;
