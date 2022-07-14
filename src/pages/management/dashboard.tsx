import {
  Avatar,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { BiAddToQueue, BiChevronDown, BiFlag } from "react-icons/bi";
import { MdAdd, MdLibraryAdd, MdOutlineAddBox } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import { Context } from "../../contexts/ContextProvider";
import { useWindowSize } from "../../utils/useWindowSize";

export default function Admin() {
  const { user } = useContext(Context);

  const size = useWindowSize();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      if (user.role === "67g") {
        setLoading(false);
      } else {
        router.push("/");
      }
    }
  }, [user]);

  function Side() {
    return (
      <Flex
        style={{
          width: 300,
          height: "100%",
          backgroundColor: "#eee",
        }}
        p="4"
      >
        {loading ? (
          <Flex
            bg="#dadada"
            style={{
              width: 200,
              height: 30,
              borderRadius: 5,
            }}
          />
        ) : (
          <Text color="#333" fontSize="20">
            Dashboard
          </Text>
        )}
      </Flex>
    );
  }

  function Main() {
    function Header() {
      function Navigation() {
        function Item({ route }) {
          return (
            <Flex
              onClick={() => router.push(`/management/${route.toLowerCase()}`)}
              cursor="pointer"
              bg={
                router.pathname === `/management/${route.toLowerCase()}` &&
                "#d0d0d0"
              }
              borderRadius="5"
              py="2"
              px="4"
              justify="center"
              align="center"
            >
              <Text color="#333">{route}</Text>
            </Flex>
          );
        }

        return (
          <Flex mt="4">
            <Item route="Dashboard" />
            <Item route="Produtos" />
            <Item route="Pedidos" />
          </Flex>
        );
      }

      return (
        <Flex
          style={{
            width: "100%",
            backgroundColor: "#ddd",
          }}
          borderBottom="1px solid #d0d0d0"
          flexDir="column"
          p="4"
          pb="6"
        >
          <Flex w="100%" justify="space-between">
            <Flex
              cursor="pointer"
              onClick={() => router.push("/")}
              align="center"
            >
              <Icon mr="2" as={FiArrowLeft} color="#333" fontSize="18" />
              <Text color="#333" fontSize="22">
                67g store
              </Text>
            </Flex>
            <Menu>
              <MenuButton>
                <Avatar cursor="pointer" name="Ricardo Domene" size="sm" />
              </MenuButton>
              <MenuList
                style={{
                  border: "0px solid transparent",
                  backgroundColor: "#f0f0f0",
                }}
                p="4"
              >
                <Text
                  _hover={{
                    textDecorationLine: "underline",
                  }}
                  cursor="pointer"
                  color="#333"
                >
                  Ricardo Domene
                </Text>
                <Text
                  _hover={{
                    textDecorationLine: "underline",
                  }}
                  mt="4"
                  cursor="pointer"
                  color="#333"
                >
                  Sair da sua conta
                </Text>
              </MenuList>
            </Menu>
          </Flex>
          <Navigation />
        </Flex>
      );
    }

    function Setup() {
      return (
        <Flex w="100%" bg="#b9ccc1" p="4" align="center">
          <Flex
            borderRadius="full"
            style={{
              height: 50,
              width: 50,
            }}
            bg="#FFF"
            justify="center"
            align="center"
          >
            <Icon as={BiFlag} color="green.400" fontSize="20" />
          </Flex>
          <Flex ml="4" flexDir="column">
            <Text color="#333" fontSize="16" fontWeight="bold">
              Configurar sua loja
            </Text>
            <Text color="#333" fontSize="16">
              Você já deu seu primeiro passo
            </Text>
          </Flex>
          <Flex
            bg="#FFF"
            justify="center"
            ml="auto"
            p="1"
            align="center"
            borderRadius="full"
          >
            <Icon as={BiChevronDown} color="#333" fontSize="20" />
          </Flex>
        </Flex>
      );
    }

    function Actions() {
      function Action({ title, subtitle, emoji }) {
        return (
          <Flex
            cursor="pointer"
            style={{
              width: "100%",
            }}
            align="center"
            flexDir="row"
            p="4"
            mr="4"
            bg="#EEE"
          >
            <Flex
              bg="#ddd"
              justify="center"
              align="center"
              style={{
                height: 40,
                width: 40,
              }}
              borderRadius="5"
              p="4"
            >
              <Icon as={emoji} fontSize="20" color="green" />
            </Flex>
            <Flex flexDir="column" ml="4">
              <Text color="#333" fontWeight="bold" fontSize="18">
                {title}
              </Text>
              <Text color="#333">{subtitle}</Text>
            </Flex>
          </Flex>
        );
      }

      return (
        <Flex w="100%" justify="space-between">
          <Flex mt="2" flexDir="column" w={size.width > 1000 ? "50%" : "100%"}>
            <Text color="#333" fontSize="16" fontWeight="bold">
              Começar a vender
            </Text>
            <Flex
              flexDir="column"
              borderRadius="5"
              bg="#FFF"
              p="0.5"
              border="1px solid #bbb"
              w="100%"
              mt="4"
            >
              <Action
                title="Adicionar produto"
                subtitle="Comece a vender hoje mesmo"
                emoji={MdAdd}
              />
              <Flex w="100%" style={{
                height: 1
              }} bg="#e5e5e5" />
              <Action
                title="Adicionar pedido"
                subtitle="Comece a organizar seus pedidos"
                emoji={MdAdd}
              />
            </Flex>
          </Flex>
          {size.width > 1000 && <Flex w="50%"></Flex>}
        </Flex>
      );
    }

    return (
      <Flex
        style={{
          backgroundColor: "#ddd",
          width: "100%",
          height: "100%",
        }}
        flexDir="column"
      >
        <Header />
        <Setup />
        <Flex p="4" flexDir="column">
          <Actions />
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex bg="#333" h="100vh" w="100%">
      {size.width > 800 && <Side />}
      {loading ? (
        <Flex h="100%" w="100%" bg="#ddd" justify="center" align="center">
          <Spinner size="lg" color="#333" />
        </Flex>
      ) : (
        <Main />
      )}
    </Flex>
  );
}
