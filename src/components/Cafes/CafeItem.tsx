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
import { Link } from "react-router-dom";

interface ICafeItem {
  pk: number;
  name: string;
  address: string;
  imageUrl?: string;
}

const CafeItem = ({ pk, name, address, imageUrl }: ICafeItem) => {
  const gray = useColorModeValue("gray.600", "gray.300");
  return (
    <Link to={`/cafes/${pk}`}>
      <VStack spacing={1} alignItems={"flex-start"}>
        <Box position={"relative"} overflow={"hidden"} mb={3} rounded={"3xl"}>
          <Image minH="280" objectFit={"cover"} src={imageUrl} />
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
              {name}
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
            {address}
          </Text>
        </Box>
        <Text w={"100%"} noOfLines={1} fontSize={"xs"} color={gray}>
          {"description 필요"}
        </Text>
      </VStack>
    </Link>
  );
};

export default CafeItem;
