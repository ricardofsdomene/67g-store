import { Flex, Icon, Spinner, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { RiAddFill } from "react-icons/ri";
import Header from "../../Components/Header";
import Loading from "../../Components/Loading";
import { Context } from "../../contexts/ContextProvider";
import { useWindowSize } from "../../utils/useWindowSize";

export default function Project() {
  const router = useRouter();

  const size = useWindowSize();

  const slug = router.query.slug;

  const { user, loading } = useContext(Context);

  if (loading) {
    return <Loading />;
  }

  return (
    <Flex flexDir="column" w="100%" bg="#FCFCFF" px="4">
      <Header />
      <Flex
        maxW={1200}
        mx="auto"
        flexDir="column"
        bg="#FCFCFF"
        w="100%"
        borderRadius="10"
      >
        <Flex
          cursor="pointer"
          flexDir="row"
          w="100%"
          justify="space-between"
          align="center"
        >
          <Flex flexDir="column">
            <Text fontSize="5xl" fontWeight="bold" color="#333">
              {slug}
            </Text>
          </Flex>
        </Flex>
        <Flex
          mt="10"
          w="100%"
          justify="space-between"
          flexDir={size.width > 700 ? "row" : "column"}
        >
          <Flex
            flexDir="column"
            p="10"
            maxW={size.width < 1200 && 600}
            style={{
              width: size.width > 700 ? "49%" : "100%",
              height: 300,
            }}
            borderRadius="5"
            bg="#EEE"
            justify="space-between"
          >
            <Flex flexDir="column">
              <Text fontSize="5xl" fontWeight="bold" color="#333">
                Nota
              </Text>
              <Text mt="5" fontSize="lg" color="#333">
                Adicionar uma nova nota, esboço ou ideia.
              </Text>
            </Flex>
            <Flex
              borderRadius="5"
              justify="center"
              bg="#333"
              align="center"
              px="10"
              maxW={200}
              py="4"
            >
              <Text color="#FFF" fontWeight="bold">
                Adicionar
              </Text>
            </Flex>
          </Flex>
          <Flex
            flexDir="column"
            p="10"
            mt={size.width < 700 && "4"}
            maxW={size.width < 1200 && 600}
            style={{
              width: size.width > 700 ? "49%" : "100%",
              height: 300,
            }}
            borderRadius="5"
            bg="#EEE"
            justify="space-between"
          >
            <Flex flexDir="column">
              <Text fontSize="5xl" fontWeight="bold" color="#333">
                Tarefa
              </Text>
              <Text mt="5" fontSize="lg" color="#333">
                Adicionar nova tarefa, módulo ou feature.
              </Text>
            </Flex>
            <Flex
              borderRadius="5"
              justify="center"
              bg="#333"
              align="center"
              px="10"
              maxW={200}
              py="4"
            >
              <Text color="#FFF" fontWeight="bold">
                Adicionar
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
