import { Flex, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../contexts/ContextProvider";

export default function Product() {
  const { loading, setLoading } = useContext(Context);

  const [product, setProduct] = useState();

  const router = useRouter();
  const toast = useToast();

  const id = router.query.slug;

  useEffect(() => {
    getProductById();
  }, []);

  async function getProductById() {
    try {
      setLoading(true);
      if (typeof window !== "undefined") {
        if (id) {
          await axios.get(`/product/${id}`).then((res) => {
            if (res.status === 200) {
              setProduct(res.data);
              setLoading(false);
            } else if (res.status === 500) {
              toast({
                status: "error",
                description: "Produto não encontrado",
              });
              router.push("/");
            }
          });
        }
      }
    } catch (err) {
      // toast({
      //   status: "error",
      //   description: "Curso não encontrado",
      // });
      router.push("/");
    }
  }

  return (
    <Flex w="100%">
      <Text color="#333" fontWeight="bold" fontSize="2xl">
        {JSON.stringify(product, null, 4)}
      </Text>
    </Flex>
  );
}
