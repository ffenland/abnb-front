import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { checkBooking, getCafeDetail, getCafeReviews } from "../../libs/api";
import { useEffect, useState } from "react";

interface ICafePhoto {
  pk: number;
  cf_id: string;
  description: string;
}

interface ICafe {
  id: number;
  owner: {
    username: string;
    avatar: string;
  };
  facilities: {
    name: string;
    description: string;
  }[];

  category: {
    name: string;
    kind: string;
  };
  potato: string;
  is_owner: boolean;
  is_on_wishlist: boolean;
  photo_set: ICafePhoto[];
  created_at: Date;
  updated_at: Date;
  name: string;
  address: string;
  detail_address: string;
  description: string;
  pet_allowed: boolean;
  kind: string;
}

interface IReview {
  user: {
    username: string;
    avatar: string;
  };
  payload: string;
  rating: number;
}
type ValuePiece = Date | null;

const Cafe = () => {
  const { cafePk } = useParams();
  const { isLoading, data } = useQuery<ICafe>(["cafes", cafePk], getCafeDetail);
  const { isLoading: isReviewsLoading, data: reviewsData } = useQuery<
    IReview[]
  >(["cafes", cafePk, "reviews"], getCafeReviews);
  const [calendarDates, setCalendarDates] = useState<ValuePiece[]>([
    null,
    null,
  ]);
  const { data: checkBookingData, isLoading: isBookingCheck } = useQuery(
    ["check", cafePk, calendarDates],
    checkBooking,
    {
      enabled: calendarDates[0] !== null && calendarDates[1] !== null,
      cacheTime: 0,
    }
  );

  return (
    <Box
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
    >
      <Skeleton isLoaded={!isLoading} height={"43px"} width={"25%"}>
        <Heading>{data?.name}</Heading>
      </Skeleton>
      <Grid
        mt={8}
        rounded={"xl"}
        overflow={"hidden"}
        height={"60vh"}
        gap={3}
        templateRows={"1fr 1fr"}
        templateColumns={"repeat(4, 1fr)"}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <GridItem
            key={i}
            overflow={"hidden"}
            colSpan={i === 0 ? 2 : 1}
            rowSpan={i === 0 ? 2 : 1}
          >
            <Skeleton isLoaded={!isLoading} h={"100%"} w={"100%"}>
              {data?.photo_set && data.photo_set.length > 0 ? (
                <Image
                  w={"100%"}
                  h={"100%"}
                  objectFit={"cover"}
                  src={data?.photo_set[i].cf_id}
                />
              ) : null}
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <Grid gap={20} maxW={"container.lg"} templateColumns={"2fr 1fr"}>
        <Box>
          <HStack mt="10" w="100%" justifyContent={"space-between"}>
            <VStack alignItems={"flex-start"}>
              <Skeleton isLoaded={!isLoading} h={"30px"}>
                <Heading fontSize={"2xl"} noOfLines={1}>
                  Cafe hosted by {data?.owner.username}
                </Heading>
              </Skeleton>
              <Skeleton isLoaded={!isLoading} h={"30px"}>
                <HStack justifyContent={"flex-start"} w="100%">
                  <Text>테이블 5개</Text>
                  <Text>·</Text>
                  <Text>단체룸 1개</Text>
                </HStack>
              </Skeleton>
            </VStack>
            <Avatar
              name={data?.owner.username}
              size={"xl"}
              src={data?.owner.avatar}
            ></Avatar>
          </HStack>
          <Box mt={10}>
            <Heading fontSize={"2xl"} mb={5}>
              <HStack>
                <FaStar />
                <Text>data.rating</Text>
                <Text>·</Text>
                <Text>
                  {reviewsData?.length} review
                  {reviewsData?.length === 1 ? "" : "s"}
                </Text>
              </HStack>
            </Heading>
            <Container mx={"none"} mt={15} maxW={"container.lg"}>
              <Grid templateColumns={"1fr 1fr"} gap={2}>
                {reviewsData?.map((review, i) => (
                  <VStack key={i} alignItems={"flex-start"}>
                    <HStack>
                      <Avatar
                        name={review.user.username}
                        src={review.user.avatar}
                        size={"md"}
                      />
                      <VStack alignItems={"flex-start"} spacing={0}>
                        <Heading fontSize={"md"}>
                          {review.user.username}
                        </Heading>
                        <HStack spacing={1}>
                          <FaStar size={12} />
                          <Text>{review.rating}</Text>
                        </HStack>
                      </VStack>
                    </HStack>
                    <Text>{review.payload}</Text>
                  </VStack>
                ))}
              </Grid>
            </Container>
          </Box>
        </Box>
        <Box>
          <Calendar
            onChange={(value) => {
              if (Array.isArray(value)) {
                setCalendarDates(value);
              }
            }}
            minDetail="month"
            next2Label={null}
            prev2Label={null}
            minDate={new Date()}
            selectRange
          />
          <Button
            disabled={!checkBookingData?.ok}
            isLoading={isBookingCheck}
            mt={5}
            w={"100%"}
            colorScheme={"red"}
          >
            Make Booking
          </Button>
          {!isBookingCheck && !checkBookingData?.ok ? (
            <Text>Sorry cannot book those dates</Text>
          ) : null}
        </Box>
      </Grid>
    </Box>
  );
};

export default Cafe;
