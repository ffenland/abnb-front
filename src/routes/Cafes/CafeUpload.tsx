import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
  Textarea,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { type Address } from "react-daum-postcode";
import { useHostOnly, useProtectPage } from "../../libs/authHooks";
import ModalAddress from "../../components/ETC/ModalAddress";
import { FaTable } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  type IUploadCafeVariables,
  getCategories,
  getFacilities,
  uploadCafe,
} from "../../libs/api";
import type { ICafeDetail, ICategory, IFacility } from "../../types";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CafeUpload = () => {
  useProtectPage();
  useHostOnly();
  const { isLoading: isFacilitiesLoading, data: facilitiesData } = useQuery<
    IFacility[]
  >(["facilities"], getFacilities);
  const { isLoading: isCategoriesLoading, data: categoriesData } = useQuery<
    ICategory[]
  >(["categories"], getCategories);
  const {
    onOpen: onAddressOpen,
    onClose: onAddressClose,
    isOpen: isAddressOpen,
  } = useDisclosure();
  const onAddressComplete = (data: Address) => {
    console.log(data);
    setValue("address", data.address);
    return;
  };
  const { register, handleSubmit, setValue } = useForm<IUploadCafeVariables>();
  const toast = useToast();
  const navigate = useNavigate();
  const mutation = useMutation(uploadCafe, {
    onSuccess: (data: ICafeDetail) => {
      toast({
        title: "Cafe Uploaded",
        description: "성공적으로 등록했습니다.",
        status: "success",
      });
      navigate(`/cafes/${data.id}`);
    },
  });
  const onValid = (data: IUploadCafeVariables) => {
    mutation.mutate(data);
  };
  return (
    <Box
      pb={40}
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
    >
      <Container>
        <Heading textAlign={"center"}>Upload Cafe</Heading>
        <VStack spacing={8} as="form" onSubmit={handleSubmit(onValid)}>
          <FormControl>
            <FormLabel>상호명</FormLabel>
            <Input type="text" {...register("name")} />
            <FormHelperText>카페의 이름을 입력해주세요.</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>주소</FormLabel>
            <Button size={"sm"} onClick={onAddressOpen}>
              주소입력
            </Button>
            <Input mt={2} type="text" disabled {...register("address")} />
            <Input mt={2} type="text" {...register("detail_address")} />
            <FormHelperText>상세 주소를 입력해주세요.</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>테이블</FormLabel>
            <InputGroup>
              <InputLeftAddon children={<FaTable />} />
              <Input type="number" />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel>상세설명</FormLabel>
            <Textarea rows={5} {...register("description")} />
          </FormControl>
          <FormControl>
            <Checkbox {...register("pet_allowed")}>
              애완동물 동반 가능?
            </Checkbox>
          </FormControl>
          <FormControl>
            <FormLabel>타입</FormLabel>
            <Select placeholder="선택해주세요." {...register("kind")}>
              <option value="inddor">실내카페</option>
              <option value="outdoor">야외카페</option>
              <option value="both">실내/외 겸용</option>
              <option value="takeout">포장전용</option>
            </Select>
            <FormHelperText>카페가 어떤 종류인가요?</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>카테고리</FormLabel>
            <Select placeholder="선택해주세요." {...register("category")}>
              {categoriesData?.map((category) => (
                <option key={category.pk} value={category.pk}>
                  {category.name}
                </option>
              ))}
            </Select>
            <FormHelperText>카페가 어떤 종류인가요?</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>주요시설</FormLabel>
            <Grid templateColumns={"1fr 1fr"} gap={4}>
              {facilitiesData?.map((facility) => (
                <Box key={facility.pk}>
                  <Checkbox value={facility.pk} {...register("facilities")}>
                    {facility.name}
                  </Checkbox>
                  <FormHelperText>{facility.description}</FormHelperText>
                </Box>
              ))}
            </Grid>
          </FormControl>
          {mutation.isError ? (
            <Text color={"red.500"}>
              {"Something Wrong. " + mutation.error}
            </Text>
          ) : null}
          <Button
            type="submit"
            isLoading={mutation.isLoading}
            colorScheme="red"
            size={"lg"}
            w={"100%"}
          >
            Upload Room
          </Button>
        </VStack>
      </Container>
      <ModalAddress
        onClose={onAddressClose}
        isOpen={isAddressOpen}
        onComplete={onAddressComplete}
      />
    </Box>
  );
};
export default CafeUpload;
