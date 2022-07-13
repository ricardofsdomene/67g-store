import { Flex, Input, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import Header from "../../Components/Header";
import Loading from "../../Components/Loading";
import { Context } from "../../contexts/ContextProvider";
import { api } from "../../services/apiClient";
import { useWindowSize } from "../../utils/useWindowSize";

export default function Signin() {
  const size = useWindowSize();

  const { loading, signUp } = useContext(Context);

  const toast = useToast();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignUp = async () => {
    try {
      await signUp({ name, email, password });
    } catch (e) {
      toast({
        status: "error",
        description: "Error",
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Flex flexDir="column" px="4">
      <Header none />
      <Flex mx="auto" maxW={1200} flexDir="column" w="100%" h="100%">
        <Text fontWeight="bold" color="#333" fontSize="5xl">
          Signup
        </Text>
        <Text mt="10" fontWeight="bold" color="#333" fontSize="2xl">
          Nome
        </Text>
        <Input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}
          value={name}
          mt="2"
          h="12"
          color="#333"
          maxW={size.width > 700 ? 500 : "100%"}
          borderRadius="5"
          border="1px solid #eee"
          placeholder="e.g. Peter Panda"
        />
        <Text mt="4" fontWeight="bold" color="#333" fontSize="2xl">
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
        <Text mt="4" fontWeight="bold" color="#333" fontSize="2xl">
          Senha
        </Text>
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
          onClick={handleSignUp}
          cursor="pointer"
          mt="10"
          h="14"
          maxW={size.width > 700 ? 500 : "100%"}
          w="100%"
          borderRadius="5"
          bg="#333"
          justify="center"
          align="center"
        >
          <Text color="#FFF" fontSize="xl" fontWeight="bold">
            Entrar
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
