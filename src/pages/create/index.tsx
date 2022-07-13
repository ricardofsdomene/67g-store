import { Flex, Icon, Image, Input, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import Resizer from "react-image-file-resizer";

export default function Create() {
  const toast = useToast();
  const router = useRouter();

  const [preview, setPreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("");

  const [values, setValues] = useState({
    name: "",
    active: true,
    image: "",
    description: "",
    default_price_data: {
      currency: "BRL",
      unit_amount_decimal: 0,
    },
  });

  const [price, setPrice] = useState(0);

  const [image, setImage] = useState();

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");

    setPrice(Number(value));

    if (Number(value) < 10000) {
      const decimalValue = value + "00";

      setValues({
        ...values,
        default_price_data: {
          currency: "BRL",
          unit_amount_decimal: Number(decimalValue),
        },
      });
    }
  };

  const handleCreateImage = (e) => {
    if (e.target.files.length !== 0) {
      let file = e.target.files[0];
      setPreview(window.URL.createObjectURL(e.target.files[0]));
      setUploadButtonText(file.name);

      Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
        try {
          const data = await axios.post(
            "http://localhost:5556/product/upload-image",
            {
              image: uri,
            }
          );

          setImage(data.data);
          setValues({ ...values, image: data.data.Location });
        } catch (err) {
          console.log(err);
          toast({
            status: "error",
            description: "Image upload failed. Try later.",
            duration: 1000,
          });
        }
      });
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    try {
      const data = await axios.post("http://localhost:5556/product/create", {
        name: values.name,
        active: values.active,
        description: values.description,
        default_price_data: values.default_price_data,
        image: values.image,
      });
      console.log(data.data);
      toast({
        status: "success",
        description: "Produto adicionado com sucesso",
      });
      router.push("/products")
    } catch (e) {
      toast({
        status: "error",
        description: "Tente novamente mais tarde",
      });
    }
  };

  return (
    <Flex
      w="100%"
      flexDir="column"
      bg="#FFF"
      h="100vh"
      justify="center"
      align="center"
    >
      <Text color="#333" fontWeight="bold" fontSize="2xl">
        Adicionar produto
      </Text>
      <Text my="2" color="#333" fontSize="lg">
        Nome do produto
      </Text>
      <Input
        mb="4"
        color="#333"
        style={{
          width: 250,
          height: 50,
        }}
        value={values.name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValues({ ...values, name: e.target.value });
        }}
      />
      <Text my="2" color="#333" fontSize="lg">
        Descrição do produto
      </Text>
      <Input
        mb="4"
        color="#333"
        style={{
          width: 250,
          height: 50,
        }}
        value={values.description}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValues({ ...values, description: e.target.value });
        }}
      />
      <Text my="2" color="#333" fontSize="lg">
        Valor do produto
      </Text>
      <Input
        mb="8"
        style={{
          marginTop: 10,
          borderRadius: 5,
          padding: 10,
          maxWidth: 90,
          color: "#777",
          height: 50,
          border: "1px solid #e0e0e0",
        }}
        placeholder="R$"
        value={price}
        onChange={handlePriceChange}
      />
      <label>
        {preview ? (
          <Image src={preview} maxH={160} maxW={160} borderRadius="5" />
        ) : (
          <Flex
            cursor="pointer"
            flexDir="column"
            bg="#eee"
            borderRadius="5"
            p="5"
            style={{
              height: 160,
            }}
            justify="center"
            align="center"
          >
            <Flex bg="#aaa" p="5" borderRadius="full">
              <Icon as={BiImageAdd} fontSize="xl" color="#999`" />
            </Flex>
            <Text color="#aaa" textAlign="center" mt="4" fontSize="lg">
              Clique para adicionar uma capa ao seu curso
            </Text>
          </Flex>
        )}
        <input
          onChange={handleCreateImage}
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            height: 160,
            background: "#eee",
            borderRadius: 5,
            display: "none",
          }}
          type="file"
          accept="image/*"
        />
      </label>
      <Flex
        cursor="pointer"
        onClick={handleCreateProduct}
        mt="4"
        style={{
          width: 300,
          height: 50,
        }}
        bg="#333"
        justify="center"
        align="center"
      >
        <Text color="#FFF" fontWeight="bold" fontSize="lg">
          Adicionar
        </Text>
      </Flex>
      <Text mt="4" color="#333" fontSize="lg">
        {JSON.stringify(values, null, 4)}
      </Text>
    </Flex>
  );
}
