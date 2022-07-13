import { Flex, Text } from "@chakra-ui/react";
import React from "react";

export default function Notfound() {
  return (
    <Flex h="100%" w="100%" justify="center" align="center">
      <Text fontSize="5xl" color="#333">
        404
      </Text>
      <Text color="#333">Not found</Text>
    </Flex>
  );
}
