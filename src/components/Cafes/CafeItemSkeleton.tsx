import { Box, HStack, Skeleton } from "@chakra-ui/react";

const CafeItemSkeleton = () => {
  return (
    <Box>
      <Skeleton rounded="2xl" height={"280px"} mb={5} />
      <HStack justifyContent={"space-between"}>
        <Skeleton rounded="lg" width="60%" height={4} mb={1} />
        <Skeleton rounded="lg" width="15%" height={4} />
      </HStack>
      <Skeleton rounded="lg" width="40%" height={3} mb={3} />
      <Skeleton rounded="lg" width="25%" height={3} />
    </Box>
  );
};

export default CafeItemSkeleton;
