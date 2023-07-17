import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useHostOnly, useProtectPage } from "../../libs/authHooks";
import { useMutation } from "@tanstack/react-query";
import { createPhoto, getUploadUrl, uploadImage } from "../../libs/api";

interface IForm {
  file: FileList;
}

const PhotoUpload = () => {
  useProtectPage();
  useHostOnly();

  const { register, handleSubmit, getValues, reset } = useForm<IForm>();
  const { cafePk } = useParams();
  const toast = useToast();
  const createPhotoMutation = useMutation(createPhoto, {
    onSuccess: () => {
      toast({
        title: "Upload Complete",
        status: "success",
        isClosable: true,
      });
      reset();
    },
  });
  const uploadImageMutation = useMutation(uploadImage, {
    onSuccess: ({ result }: any) => {
      if (cafePk) {
        createPhotoMutation.mutate({
          cf_id: `https://imagedelivery.net/4qM0nUySNuH-4XE1BufwsQ/${result.id}/public`,
          description: "photo",
          cafePk,
        });
      }
    },
  });
  const getUploadURLMutation = useMutation(getUploadUrl, {
    onSuccess: ({ id, uploadURL }: { id: string; uploadURL: string }) => {
      uploadImageMutation.mutate({
        uploadURL,
        file: getValues("file"),
      });
    },
  });

  const onValid = (data: IForm) => {
    getUploadURLMutation.mutate();
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
        <Heading textAlign={"center"}>Upload a Photo</Heading>
        <VStack as="form" onSubmit={handleSubmit(onValid)} spacing={5} mt={10}>
          <FormControl>
            <Input {...register("file")} type="file" accept="image/*" />
          </FormControl>
          <Button
            isLoading={
              getUploadURLMutation.isLoading ||
              uploadImageMutation.isLoading ||
              createPhotoMutation.isLoading
            }
            type="submit"
            w="full"
            colorScheme={"red"}
          >
            Upload photos
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};
export default PhotoUpload;
