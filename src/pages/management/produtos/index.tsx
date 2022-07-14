import {
  Avatar,
  Flex,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuList,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Context } from "../../../contexts/ContextProvider";
import { useWindowSize } from "../../../utils/useWindowSize";

export default function Admin() {
  const { user } = useContext(Context);

  const size = useWindowSize();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [desc, setDesc] = useState(undefined);

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
            Produtos
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
                router.pathname ===
                  `/management/${route.toLowerCase()}/adicionar` && "#d0d0d0"
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
            <Item route="Clientes" />
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
        >
          <Flex w="100%" justify="space-between">
            <Flex
              cursor="pointer"
              onClick={() => router.push("/management/dashboard")}
              align="center"
            >
              <Icon mr="2" as={FiArrowLeft} color="#333" fontSize="18" />
              <Text color="#333" fontSize="22">
                Dashboard
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
        <Flex p="4" flexDir="column" w={size.width < 1000 ? "100%" : "60%"}>
          <Flex bg="#FFF" borderRadius="5" p="4" flexDir="column">
            <Text color="#333" fontSize="16">
              Titulo
            </Text>
            <Input mt="2" placeholder="camiseta manga loja" w="100%" />
            <Text mt="4" color="#333" fontSize="16">
              Descrição
            </Text>
            <textarea
              value={desc}
              onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>): void =>
                setDesc(ev.target.value)
              }
              name="description"
              style={{
                padding: 10,
                color: "#333",
                width: "100%",
                borderRadius: 5,
                border: "1px solid #e0e0e0",
              }}
              cols={size.width < 500 ? 4 : size.width < 600 ? 7 : 9}
              rows={size.width < 500 ? 4 : size.width < 600 ? 7 : 9}
            ></textarea>
          </Flex>
        </Flex>
        {size.width > 1000 && <Flex w="40%" />}
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
