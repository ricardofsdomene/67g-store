import React, { useEffect } from "react";

import ReactTooltip from "react-tooltip";
import {
  Flex,
  Icon,
  Image,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import Router from "next/router";

import {
  MdMenu,
  MdOutlineLoyalty,
  MdOutlineSettings,
  MdOutlineSpaceDashboard,
} from "react-icons/md";
import { useWindowSize } from "../../utils/useWindowSize";
import { BiChevronDown } from "react-icons/bi";

export default function Admin() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const size = useWindowSize();

  useEffect(() => {
    onOpen();
  }, []);

  function Sidebar() {
    return (
      <Flex
        position="fixed"
        h="90%"
        style={{
          width: 100,
        }}
        bg="#444"
        justify="space-between"
        flexDir="column"
        align="center"
        py="8"
        borderRadius="5"
      >
        <Image
          src="/logo-b.jpg"
          style={{
            height: 50,
            width: 50,
            borderRadius: 5,
          }}
        />
        <Flex
          flexDir="column"
          align="center"
          justify="space-between"
          style={{
            width: 50,
            height: "50%",
          }}
        >
          <Flex data-tip="Dashboard" cursor="pointer" pb="4">
            <Icon as={MdOutlineSpaceDashboard} fontSize="30" color="#FFF" />
          </Flex>
          <Flex data-tip="Ajustes">
            <Icon
              cursor="pointer"
              as={MdOutlineSpaceDashboard}
              fontSize="30"
              color="#FFF"
            />
          </Flex>
          <Flex data-tip="Produtos">
            <Icon
              cursor="pointer"
              as={MdOutlineLoyalty}
              fontSize="30"
              color="#FFF"
            />
          </Flex>
          <Flex data-tip="Ajustes">
            <Icon
              cursor="pointer"
              as={MdOutlineSpaceDashboard}
              fontSize="30"
              color="#FFF"
            />
          </Flex>
        </Flex>
        <Flex
          flexDir="column"
          align="center"
          justify="space-between"
          style={{
            width: 50,
          }}
        >
          <Flex data-tip="Ajustes">
            <Icon
              cursor="pointer"
              as={MdOutlineSettings}
              fontSize="30"
              color="#FFF"
            />
          </Flex>
        </Flex>
        <ReactTooltip place="bottom" />
      </Flex>
    );
  }

  function Menu() {
    return (
      <>
        <Flex position="fixed" px="4">
          <Icon
            cursor="pointer"
            onClick={() => onOpen()}
            as={MdMenu}
            color="#FFF"
            fontSize="35"
          />
        </Flex>
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerContent
            style={{
              width: 150,
              height: "100vh",
              backgroundColor: "#444",
            }}
          >
            <DrawerBody>
              <Flex
                position="fixed"
                h="100%"
                style={{
                  width: 100,
                }}
                bg="#444"
                flexDir="column"
                align="center"
                py="8"
                borderRadius="5"
              >
                <Flex
                  bg="#666"
                  align="center"
                  style={{
                    width: 130,
                    height: 40,
                  }}
                  borderRadius="5"
                  justify="space-between"
                  px="4"
                >
                  <Text color="#FFF" fontSize="18">
                    Loja 0
                  </Text>
                  <Icon as={BiChevronDown} color="#FFF" fontSize="29" />
                </Flex>
                <Flex
                  flexDir="column"
                  align="center"
                  style={{
                    width: 50,
                    height: "50%",
                  }}
                >
                  <Flex
                    align="center"
                    bg="#555"
                    flexDir="column"
                    cursor="pointer"
                    py="4"
                    style={{
                      width: 130,
                      marginTop: 65,
                    }}
                    px="3"
                    borderRadius="5"
                    pb="4"
                  >
                    <Icon
                      as={MdOutlineSpaceDashboard}
                      fontSize="30"
                      color="#FFF"
                    />
                    <Text color="#FFF" mt="2">
                      Dashboard
                    </Text>
                  </Flex>
                  <Flex
                    align="center"
                    style={{
                      width: 130,
                    }}
                    py="4"
                    px="3"
                    mt="4"
                    bg="#555"
                    borderRadius="5"
                    flexDir="column"
                    cursor="pointer"
                    pb="4"
                  >
                    <Icon as={MdOutlineLoyalty} fontSize="30" color="#FFF" />
                    <Text color="#FFF" mt="2">
                      Produtos
                    </Text>
                  </Flex>
                  <Flex
                    align="center"
                    style={{
                      width: 130,
                    }}
                    py="4"
                    px="3"
                    mt="4"
                    bg="#555"
                    borderRadius="5"
                    flexDir="column"
                    cursor="pointer"
                    pb="4"
                  >
                    <Icon as={MdOutlineLoyalty} fontSize="30" color="#FFF" />
                    <Text color="#FFF" mt="2">
                      Produtos
                    </Text>
                  </Flex>
                  <Flex
                    bg="#555"
                    align="center"
                    flexDir="column"
                    cursor="pointer"
                    mt="4"
                    py="4"
                    style={{
                      width: 130,
                    }}
                    px="3"
                    borderRadius="5"
                  >
                    <Icon as={MdOutlineSettings} fontSize="30" color="#FFF" />
                    <Text color="#FFF" mt="2">
                      Configurações
                    </Text>
                  </Flex>
                </Flex>
                <Flex />
                <ReactTooltip place="bottom" />
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  return (
    <Flex h="100vh" w="100%" bg="#333" px="5" py="10">
      {size.width < 800 ? <Menu /> : <Sidebar />}
    </Flex>
  );
}
