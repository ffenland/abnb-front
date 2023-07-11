import { Grid } from "@chakra-ui/react";
import CafeItem from "./CafeItem";
import CafeItemSkeleton from "./CafeItemSkeleton";
import { useEffect, useState } from "react";
const ShowCafes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cafes, setCafes] = useState(undefined);
  useEffect(() => {
    const getCafes = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/v1/cafes/");
      const result = await response.json();
      setCafes(result);
      setIsLoading(false);
    };
    getCafes();
  }, []);
  return (
    <Grid
      px={{
        base: 10,
        lg: 40,
      }}
      columnGap={4}
      rowGap={8}
      templateColumns={{
        sm: "1fr",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
        "2xl": "repeat(5, 1fr)",
      }}
    >
      {isLoading ? (
        <>
          <CafeItemSkeleton />
          <CafeItemSkeleton />
          <CafeItemSkeleton />
          <CafeItemSkeleton />
          <CafeItemSkeleton />
          <CafeItemSkeleton />
          <CafeItemSkeleton />
          <CafeItemSkeleton />
          <CafeItemSkeleton />
        </>
      ) : null}
      <CafeItem />
    </Grid>
  );
};

export default ShowCafes;
