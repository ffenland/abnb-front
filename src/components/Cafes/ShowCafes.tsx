import { Grid } from "@chakra-ui/react";
import CafeItem from "./CafeItem";
import CafeItemSkeleton from "./CafeItemSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getCafes } from "../../libs/api";

interface IPhoto {
  pk: number;
  cf_id: string;
  description: string;
}

interface ICafe {
  pk: number;
  name: string;
  address: string;
  category: number;
  is_owner: boolean;
  photo_set: IPhoto[];
}

const ShowCafes = () => {
  const { isLoading, data } = useQuery<ICafe[]>(["cafes"], getCafes);
  return (
    <Grid
      mt={10}
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
      {data?.map((cafe) => (
        <CafeItem
          key={cafe.pk}
          pk={cafe.pk}
          isOwner={cafe.is_owner}
          name={cafe.name}
          address={cafe.address}
          imageUrl={cafe.photo_set[0]?.cf_id}
        />
      ))}
    </Grid>
  );
};

export default ShowCafes;
