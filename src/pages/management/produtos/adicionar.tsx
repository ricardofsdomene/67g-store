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
import { BiImageAdd } from "react-icons/bi";
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
          position: "fixed",
          height: "100vh",
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
            Adicionar produto
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

    function ProductInfo() {
      return (
        <Flex bg="#FFF" borderRadius="5" p="4" flexDir="column">
          <Text color="#333" fontSize="16" fontWeight="bold">
            Titulo
          </Text>
          <Input mt="2" placeholder="camiseta manga loja" w="100%" />
          <Text mt="4" mb="2" color="#333" fontSize="16" fontWeight="bold">
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
              minHeight: 200,
              maxHeight: 300,
              borderRadius: 5,
              border: "1px solid #e0e0e0",
            }}
            cols={size.width < 500 ? 4 : size.width < 600 ? 7 : 9}
            rows={size.width < 500 ? 4 : size.width < 600 ? 7 : 9}
          ></textarea>
        </Flex>
      );
    }

    function ProductMedia() {
      return (
        <Flex mt="4" bg="#FFF" borderRadius="5" p="4" flexDir="column">
          <Text color="#333" fontSize="16" fontWeight="bold">
            Media
          </Text>
          <Flex
            mt="2"
            bg="#f0f0f0"
            borderRadius="5"
            style={{
              height: 150,
              width: "100%",
            }}
            justify="center"
            flexDir="column"
            align="center"
          >
            <Flex
              bg="#d0d0d0"
              justify="center"
              align="center"
              borderRadius="full"
              style={{
                height: 60,
                width: 60,
              }}
            >
              <Icon as={BiImageAdd} fontSize="20" color="#333" />
            </Flex>
            <Text color="#333" mt="4" fontSize="18">
              Clique para adicionar
            </Text>
          </Flex>
        </Flex>
      );
    }

    function ProductValue() {
      return (
        <Flex mt="4" bg="#FFF" borderRadius="5" p="4" flexDir="column">
          <Text color="#333" fontSize="16" fontWeight="bold">
            Preços
          </Text>
          <Flex mt="2" w="100%" justify="space-between">
            <Flex flexDir="column" w="48%">
              <Text color="#333" fontSize="14">
                Preço por produto
              </Text>
              <Input mt="1" placeholder="R$ 0.00" w="100%" />
            </Flex>
            <Flex flexDir="column" w="50%">
              <Text color="#333" fontSize="14">
                Encontre de até
              </Text>
              <Input mt="1" placeholder="R$ 0.00" w="100%" />
            </Flex>
          </Flex>
          <Flex
            w="100%"
            style={{
              height: 1,
            }}
            bg="#e0e0e0"
            my="6"
          />
          <Text color="#333" fontSize="14">
            Custo por produto
          </Text>
          <Input mt="1" placeholder="R$ 0.00" w="100%" />
        </Flex>
      );
    }

    function ProductAmount() {
      return (
        <Flex mt="4" bg="#FFF" borderRadius="5" p="4" flexDir="column">
          <Text color="#333" fontSize="16" fontWeight="bold">
            Estoque
          </Text>
          <Text mt="2" color="#333" fontSize="14">
            Produtos em estoque
          </Text>
          <Input mt="2" placeholder="0" w="100%" />
        </Flex>
      );
    }

    function ProductActions() {
      return (
        <Flex mt="4" bg="#FFF" borderRadius="5" p="4" flexDir="column">
          <Flex w="100%" justify="space-between" align="center">
            <Flex flexDir="column">
              <Text color="#333" fontSize="18" fontWeight="bold">
                name
              </Text>
              <Text color="#333" fontSize="14">
                R$ 0.00
              </Text>
            </Flex>
            <Flex
              style={{
                width: 200,
                height: 40,
              }}
              bg="green"
              justify="center"
              align="center"
              borderRadius="5"
              cursor="pointer"
            >
              <Text color="#FFF" fontWeight="bold" fontSize="16">
                Adicionar
              </Text>
            </Flex>
          </Flex>
        </Flex>
      );
    }

    return (
      <Flex
        style={{
          paddingLeft: size.width > 800 && 300,
          backgroundColor: "#ddd",
          width: "100%",
          height: "100%",
        }}
        flexDir="column"
      >
        <Header />
        <Flex p="4" flexDir="column" w={size.width < 1000 ? "100%" : "60%"}>
          <ProductInfo />
          <ProductMedia />
          <ProductValue />
          <ProductAmount />
          <ProductActions />
        </Flex>
        {size.width > 1000 && <Flex w="40%" />}
      </Flex>
    );
  }

  return (
    <Flex bg="#333" h="100%" w="100%">
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
