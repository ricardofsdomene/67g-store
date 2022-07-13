import {
  Flex,
  Text,
  Image as ChakraImage,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Tooltip,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { BiBarcode, BiChevronDown, BiFilter, BiPlay } from "react-icons/bi";
import Header from "../Components/Header";
import Loading from "../Components/Loading";
import { Context } from "../contexts/ContextProvider";
import { useWindowSize } from "../utils/useWindowSize";

import {
  FaCcMastercard,
  FaCcStripe,
  FaCcVisa,
  FaExpeditedssl,
} from "react-icons/fa";
import {} from "react-icons/bi";

export default function Index() {
  const size = useWindowSize();

  const { user, loading } = useContext(Context);

  if (loading) {
    return <Loading />;
  }

  // Components

  type ItemType = {
    id: string;
    name: string;
    amount: number;
    image: string;
  };

  type ItemsType = {
    data: Array<ItemType>;
  };

  function Items({ data }: ItemsType) {
    return (
      <Flex
        px={size.width < 1200 && "4"}
        flexDir={size.width > 800 ? "row" : "column"}
        justify="space-between"
        w="100%"
      >
        {data.map((item, i) => {
          return (
            <Flex flexDir="column" mt={size.width < 800 && "4"}>
              <ChakraImage
                objectFit="cover"
                src={item.image}
                style={{
                  height: size.width < 800 ? 400 : 250,
                  width: size.width > 800 ? 300 : "100%",
                }}
              />
              <Flex
                align="center"
                flexDir="column"
                bg="#F5F5F5"
                justify="center"
                py="5"
              >
                {size.width < 800 && (
                  <Text color="#333" fontSize="mdƒ" fontFamily="Staatliches">
                    [Clique para ver o produto]
                  </Text>
                )}
                <Text
                  color="#333"
                  fontSize={size.width > 1000 ? "4xl" : "3xl"}
                  fontFamily="Staatliches"
                >
                  {item.name}
                </Text>
                <Flex w="100%" px="4">
                  <Flex
                    _hover={{
                      backgroundColor: "#333",
                      color: "#FFF",
                      textDecorationLine: "underline",
                    }}
                    cursor="pointer"
                    mt="4"
                    py="3"
                    border="2px solid #333"
                    justify="center"
                    align="center"
                    w="100%"
                    color="#333"
                    fontWeight="bold"
                  >
                    Comprar agora
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    );
  }

  // Sections

  function Hero1() {
    return (
      <Flex
        flexDir={size.width > 700 ? "row" : "column"}
        w="100%"
        align={size.width > 700 && "center"}
        justify="space-between"
      >
        <Text
          fontSize={
            size.width > 1000 ? "6xl" : size.width > 700 ? "5xl" : "4xl"
          }
          w={size.width > 700 ? "60%" : "90%"}
          color="#333"
          fontWeight="bold"
        >
          Passion & love for natural-beaty
        </Text>
        <Flex
          mt={size.width < 700 && "5"}
          bg="#f0f0f0"
          justify="center"
          align="center"
          style={{
            backgroundPosition: "center",
            backgroundImage: `url("https://github.com/0xrfsd.png")`,
            height: 250,
            width: size.width > 700 ? "50%" : "100%",
          }}
        >
          <Flex borderRadius="full" p="5" bg="#ddd">
            <Icon as={BiPlay} color="#333" fontSize="4xl" />
          </Flex>
        </Flex>
      </Flex>
    );
  }

  function Hero2() {
    return (
      <Flex
        flexDir="column"
        maxW={1200}
        justify="flex-end"
        align="center"
        mx="auto"
        w="100%"
        h={size.width > 700 ? "85vh" : "76vh"}
      >
        <ChakraImage
          position="absolute"
          maxW={1200}
          mx="auto"
          src="/mosaic.png"
          h={size.width > 700 ? "85vh" : "76vh"}
          w="100%"
          objectFit="cover"
        />

        <Flex />
        <Flex ml="10" mr="10" zIndex="2" flexDir="column" pb="50">
          <Text fontSize="4xl" fontWeight="bold" fontFamily="Fascinate">
            SUMMER' COLLECTION
          </Text>
        </Flex>
      </Flex>
    );
  }

  function Hero3() {
    function Item({ title, subtitle }) {
      return (
        <Flex
          flexDir="column"
          justify="center"
          p="8"
          w={size.width > 800 ? "49.5%" : "100%"}
          mt="4"
          style={{
            height: size.width > 800 ? 320 : 220,
          }}
          bg="#F3F3F3"
        >
          <Text color="#333" fontSize="2xl">
            {title}
          </Text>
          <Text color="#333" fontSize="lg">
            {subtitle}
          </Text>
        </Flex>
      );
    }

    return (
      <Flex
        maxW={1200}
        px={size.width < 1200 && "4"}
        mx="auto"
        flexDir={size.width > 800 ? "row" : "column"}
        w="100%"
        justify="space-between"
      >
        <Item title="Homens" subtitle="A partir de R$170" />
        <Item title="Mulheres" subtitle="A partir de R$170" />
      </Flex>
    );
  }

  function Hero4({ title, subtitle }) {
    return (
      <Flex p="4">
        <Flex
          style={{
            height: size.width > 800 ? 320 : 220,
          }}
          justify="center"
          flexDir="column"
          p="8"
          maxW={1200}
          mx="auto"
          w="100%"
          bg="#F3F3F3"
        >
          <Text color="#333" fontSize="2xl">
            {title}
          </Text>
          <Text color="#333" fontSize="lg">
            {subtitle}
          </Text>
        </Flex>
      </Flex>
    );
  }

  function Banner() {
    return (
      <Flex
        flexDir="column"
        w="100%"
        p="4"
        justify="center"
        align="center"
        style={{
          marginTop: 60 + 30,
        }}
      >
        <Text fontFamily="Staatliches" fontSize="2xl" color="#333">
          FRETE GRÁTIS PARA TODO O BRASIL
        </Text>
        <Flex
          style={{
            width: 300,
            height: 2,
            backgroundColor: "green",
          }}
        />
      </Flex>
    );
  }

  function Filter() {
    return (
      <Flex
        w="100%"
        justify="space-between"
        maxW={1200}
        mx="auto"
        pt="4"
        px={size.width < 1200 && "4"}
      >
        <Menu>
          <MenuButton>
            <Flex p="2" border="1px solid #AAA" align="center">
              <Text color="#333">Ordenar por</Text>
              <Icon as={BiFilter} fontSize="lg" ml="2" color="#333" />
            </Flex>
          </MenuButton>
          <MenuList
            borderRadius="0"
            boxShadow="rgba(0,0,0,0.1) 0 0 10px"
            border="1px solid #AAA"
            p="0"
          >
            <Flex
              cursor="pointer"
              _hover={{
                backgroundColor: "#f0f0f0",
              }}
              p="4"
              align="center"
            >
              <Text color="#333">Mais vendidos</Text>
            </Flex>
            <Flex
              cursor="pointer"
              _hover={{
                backgroundColor: "#f0f0f0",
              }}
              p="4"
              align="center"
            >
              <Text color="#333">Menor valor</Text>
            </Flex>
            <Flex
              cursor="pointer"
              _hover={{
                backgroundColor: "#f0f0f0",
              }}
              p="4"
              align="center"
            >
              <Text color="#333">Maior valor</Text>
            </Flex>
          </MenuList>
        </Menu>
      </Flex>
    );
  }

  function DualCollection() {
    return (
      <Flex flexDir={size.width > 700 ? "row" : "column"}>
        <Flex
          flexDir="column"
          w="100%"
          bg="#eee"
          style={{
            height: 350,
          }}
          justifyContent="flex-end"
        >
          <Flex
            borderBottomLeftRadius="5"
            borderBottomRightRadius="5"
            bg="rgba(0, 0, 0, 0.6)"
            w="100%"
            align="center"
            justify="center"
            style={{
              height: 50,
            }}
          >
            <Text color="#FFF" fontWeight="bold" fontSize="xl">
              MEN
            </Text>
          </Flex>
        </Flex>
        <Flex
          mt={size.width < 700 && "4"}
          ml={size.width > 700 && "4"}
          flexDir="column"
          w="100%"
          bg="#eee"
          style={{
            height: 350,
          }}
          justifyContent="flex-end"
        >
          <Flex
            borderBottomLeftRadius="5"
            borderBottomRightRadius="5"
            bg="rgba(0, 0, 0, 0.6)"
            w="100%"
            align="center"
            justify="center"
            p="4"
            style={{
              height: 50,
            }}
          >
            <Text color="#FFF" fontWeight="bold" fontSize="xl">
              WOMEN
            </Text>
          </Flex>
        </Flex>
      </Flex>
    );
  }

  function Products({ title }) {
    return (
      <Flex w="100%" flexDir="column" maxW={1200} mx="auto" mt="2">
        <Flex justify="center" py="10" align="center" flexDir="column">
          <Text
            mb="8"
            color="#333"
            fontSize={
              size.width > 1000 ? "4xl" : size.width > 700 ? "3xl" : "3xl"
            }
            fontFamily="Staatliches"
          >
            {title}
          </Text>
          <Items
            data={[
              {
                amount: 5000,
                id: "0",
                image:
                  "https://pauw.com/media/catalog/product/cache/2e927cff84d2cd21e84659d9fe947dc1/p/a/pauw-692846006550740-P3_2.jpg",
                name: "Loro Piana",
              },
              {
                amount: 5000,
                id: "0",
                image:
                  "https://pauw.com/media/catalog/product/cache/2e927cff84d2cd21e84659d9fe947dc1/p/a/pauw-692846006550740-P3_2.jpg",
                name: "Loro Piana #2",
              },
              {
                amount: 5000,
                id: "0",
                image:
                  "https://pauw.com/media/catalog/product/cache/2e927cff84d2cd21e84659d9fe947dc1/p/a/pauw-692846006550740-P3_2.jpg",
                name: "Loro Piana #3",
              },
              {
                amount: 5000,
                id: "0",
                image:
                  "https://pauw.com/media/catalog/product/cache/2e927cff84d2cd21e84659d9fe947dc1/p/a/pauw-692846006550740-P3_2.jpg",
                name: "Loro Piana #4",
              },
            ]}
          />
        </Flex>
      </Flex>
    );
  }

  function DualProducts({ title }) {
    return (
      <Flex w="100%" flexDir="column" maxW={1200} mx="auto">
        <Flex justify="center" py="10" align="center" flexDir="column">
          <Text
            mb="8"
            color="#333"
            fontSize={
              size.width > 1000 ? "4xl" : size.width > 700 ? "3xl" : "3xl"
            }
            fontFamily="Staatliches"
          >
            {title}
          </Text>
          <Items
            data={[
              {
                amount: 5000,
                id: "0",
                image:
                  "https://pauw.com/media/catalog/product/cache/2e927cff84d2cd21e84659d9fe947dc1/p/a/pauw-692846006550740-P3_2.jpg",
                name: "Loro Piana",
              },
              {
                amount: 5000,
                id: "0",
                image:
                  "https://pauw.com/media/catalog/product/cache/2e927cff84d2cd21e84659d9fe947dc1/p/a/pauw-692846006550740-P3_2.jpg",
                name: "Loro Piana #2",
              },
              {
                amount: 5000,
                id: "0",
                image:
                  "https://pauw.com/media/catalog/product/cache/2e927cff84d2cd21e84659d9fe947dc1/p/a/pauw-692846006550740-P3_2.jpg",
                name: "Loro Piana #3",
              },
              {
                amount: 5000,
                id: "0",
                image:
                  "https://pauw.com/media/catalog/product/cache/2e927cff84d2cd21e84659d9fe947dc1/p/a/pauw-692846006550740-P3_2.jpg",
                name: "Loro Piana #4",
              },
            ]}
          />
          {size.width > 800 && (
            <Items
              data={[
                {
                  amount: 5000,
                  id: "0",
                  image:
                    "https://pauw.com/media/catalog/product/cache/2e927cff84d2cd21e84659d9fe947dc1/p/a/pauw-692846006550740-P3_2.jpg",
                  name: "Loro Piana",
                },
                {
                  amount: 5000,
                  id: "0",
                  image:
                    "https://pauw.com/media/catalog/product/cache/2e927cff84d2cd21e84659d9fe947dc1/p/a/pauw-692846006550740-P3_2.jpg",
                  name: "Loro Piana #2",
                },
                {
                  amount: 5000,
                  id: "0",
                  image:
                    "https://pauw.com/media/catalog/product/cache/2e927cff84d2cd21e84659d9fe947dc1/p/a/pauw-692846006550740-P3_2.jpg",
                  name: "Loro Piana #3",
                },
                {
                  amount: 5000,
                  id: "0",
                  image:
                    "https://pauw.com/media/catalog/product/cache/2e927cff84d2cd21e84659d9fe947dc1/p/a/pauw-692846006550740-P3_2.jpg",
                  name: "Loro Piana #4",
                },
              ]}
            />
          )}
        </Flex>
      </Flex>
    );
  }

  function Hero5() {
    return (
      <Flex
        w="100%"
        flexDir={size.width < 800 ? "column" : "row"}
        my="8"
        px={size.width < 1200 && "4"}
        maxW={1200}
        mx="auto"
      >
        <Flex w="100%" justify="center" flexDir="column" bg="#F3F3F3" p="8">
          <Flex flexDir="column">
            <Text color="#333" fontWeight="bold" fontSize="2xl">
              SALE
            </Text>
            <Text color="#333" fontSize="xl">
              Up to 70% discount
            </Text>
          </Flex>
        </Flex>
      </Flex>
    );
  }

  function Newsletter() {
    return (
      <Flex
        maxW={1200}
        mx="auto"
        py="20"
        px="8"
        my="10"
        flexDir="column"
        bg="#F3F3F3"
        justify="center"
        align="center"
        w="100%"
      >
        <Text
          color="#333"
          fontSize="xl"
          w="100%"
          textAlign="center"
          fontWeight="bold"
        >
          GET DISCOUNT UP TO 20% FOR YOUR FIRST PURCHASE AT FURNITRA.
        </Text>
        <Flex
          cursor="pointer"
          mt="8"
          py="3"
          w={size.width < 800 ? "100%" : 300}
          justify="center"
          align="center"
          bg="#333"
        >
          <Text color="#FFF" fontSize="lg" fontWeight="bold">
            CLAIM IT
          </Text>
        </Flex>
      </Flex>
    );
  }

  function Footer() {
    return (
      <Flex
        px={size.width < 1200 && "4"}
        maxW={1200}
        mx="auto"
        flexDir={size.width > 800 ? "row" : "column"}
        w="100%"
        pt="10"
        pb="2"
        justify="space-between"
      >
        <Flex flexDir="column">
          <Text color="#333" fontWeight="bold">
            67g
          </Text>
          <Text mt="4" color="#333" textDecorationLine="underline">
            Tênis para mulheres
          </Text>
          <Text mt="4" color="#333" textDecorationLine="underline">
            Tênis para homens
          </Text>
        </Flex>
        <Flex flexDir="column" mt={size.width < 700 && "10"}>
          <Text color="#333" fontWeight="bold">
            O que você procura?
          </Text>
          <Text mt="4" color="#333" textDecorationLine="underline">
            Meus pedidos
          </Text>
          <Text mt="4" color="#333" textDecorationLine="underline">
            Preciso de ajuda
          </Text>
        </Flex>
        <Flex flexDir="column" mt={size.width < 700 && "10"}>
          <Text color="#333" fontWeight="bold">
            Privacidade
          </Text>
          <Text mt="4" color="#333" textDecorationLine="underline">
            Termos de serviço
          </Text>
          <Text mt="4" color="#333" textDecorationLine="underline">
            Políticas de privacidade
          </Text>
        </Flex>
      </Flex>
    );
  }

  function Copyright() {
    return (
      <Flex
        px={size.width < 1200 && "4"}
        w="100%"
        maxW={1200}
        mx="auto"
        mt="8"
        mb="4"
        justify="space-between"
        align="flex-end"
      >
        <Text color="#aaa" fontSize="lg" fontFamily="Staatliches">
          Copyright © 67g. All Right Reserved
        </Text>
        <Flex align="center">
          <Icon as={FaCcStripe} color="#aaa" mr="2" fontSize="30" />
          <Icon as={FaCcVisa} color="#aaa" mr="2" fontSize="30" />
          <Icon as={FaCcMastercard} color="#aaa" mr="2" fontSize="30" />
          <Icon as={FaExpeditedssl} color="#aaa" mr="2" fontSize="30" />
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex flexDir="column" w="100%" bg="#FCFCFF" pb="4">
      <Header />
      {/* <Banner /> */}
      <Hero2 />
      <Flex h="4" />
      <Hero3 />
      {/* <Hero4 title="Acessories" subtitle="Starting at $20" /> */}
      <Products title="Mais vendidos" />
      <Hero5 />
      <DualProducts title="Ultimos lançamentos" />
      <Newsletter />
      <Footer />
      <Copyright />
    </Flex>
  );
}
