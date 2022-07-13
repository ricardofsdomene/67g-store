import { Flex, Input, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import Header from "../../Components/Header";
import Loading from "../../Components/Loading";
import { Context } from "../../contexts/ContextProvider";
import { useWindowSize } from "../../utils/useWindowSize";

export default function Signin() {
  const size = useWindowSize();

  const { loading, setLoading, signIn } = useContext(Context);

  const toast = useToast();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleSignIn() {
    const response = await signIn({ email, password });
    console.log(response);
    if (response.error === true) {
      toast({
        status: "error",
        description: response.message,
      });
    } else if (response.status === "Sucesso!") {
      toast({
        status: "success",
        description: response.message,
      });
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Flex flexDir="column">
      <Header none />
      <Flex flexDir="column" px="4">
        <Flex mx="auto" maxW={1200} flexDir="column" w="100%" h="100%">
          <Text fontWeight="bold" color="#333" fontSize="5xl">
            Signin
          </Text>
          <Text mt="10" fontWeight="bold" color="#333" fontSize="2xl">
            Email
          </Text>
          <Input
            type="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
            value={email}
            mt="2"
            h="12"
            color="#333"
            maxW={size.width > 700 ? 500 : "100%"}
            borderRadius="5"
            border="1px solid #eee"
            placeholder="e.g. peter@panda.com"
          />
          <Flex
            w="100%"
            align="center"
            maxW={size.width > 700 ? 500 : "100%"}
            justify="space-between"
          >
            <Text mt="4" fontWeight="bold" color="#333" fontSize="2xl">
              Senha
            </Text>
            <Text
              mt="4"
              cursor="pointer"
              textDecorationLine="underline"
              color="#333"
              fontSize="lg"
            >
              Esqueceu sua senha?
            </Text>
          </Flex>
          <Input
            type="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
            value={password}
            mt="2"
            h="12"
            color="#333"
            maxW={size.width > 700 ? 500 : "100%"}
            borderRadius="5"
            border="1px solid #eee"
          />
          <Flex
            _hover={{
              textDecorationLine: "underline",
            }}
            onClick={handleSignIn}
            cursor="pointer"
            mt="10"
            h="14"
            maxW={size.width > 700 ? 500 : "100%"}
            w="100%"
            borderRadius="5"
            bg="#333"
            justify="center"
            align="center"
            color="#FFF"
            fontSize="xl"
            fontWeight="bold"
          >
            Entrar
          </Flex>
          <Flex
            _hover={{
              textDecorationLine: "underline",
            }}
            onClick={handleSignIn}
            cursor="pointer"
            mt="4"
            h="14"
            maxW={size.width > 700 ? 500 : "100%"}
            w="100%"
            border="1px solid #333"
            borderRadius="5"
            bg="transparent"
            justify="center"
            align="center"
            color="#333"
            fontSize="xl"
            fontWeight="bold"
          >
            Ou registre-se agora
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
