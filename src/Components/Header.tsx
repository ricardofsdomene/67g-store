import {
  Avatar,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  useToast,
  Image,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../contexts/ContextProvider";
import { useWindowSize } from "../utils/useWindowSize";

import {
  RiArrowLeftFill,
  RiArrowLeftLine,
  RiCloseFill,
  RiMenu5Fill,
} from "react-icons/ri";
import {} from "react-icons/fi";
import { BiChevronDown, BiImageAdd, BiShoppingBag } from "react-icons/bi";
import { AiFillProfile } from "react-icons/ai";
import { useRouter } from "next/router";
import Loading from "./Loading";
import axios from "axios";
import FileResizer from "react-image-file-resizer";

export default function Header({ none = false }) {
  const { loading, user, signIn, signUp, signOut } = useContext(Context);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const toast = useToast();
  const router = useRouter();

  const [preview, setPreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("");

  const [values, setValues] = useState({
    name: "",
    active: true,
    image: "",
    description: "",
    default_price_data: {
      currency: "BRL",
      unit_amount_decimal: 0,
    },
  });

  const [price, setPrice] = useState(0);

  const [image, setImage] = useState();

  type Product = {
    id: string;
    object: string;
    active: boolean;
    attributes: [string];
    created: number;
    default_price: string;
    description: string;
    images: [string];
    livemode: boolean;
    metadata: object;
    name: string;
    package_dimensions: null;
    shippable: null;
    statement_descriptor: null;
    tax_code: null;
    type: string;
    unit_label: null;
    updated: number;
    url: null;
    price: object;
  };

  type ProductsType = {
    object: string;
    data: [Product];
    has_more: boolean;
    url: string;
  };

  const [products, setProducts] = useState<ProductsType>();

  useEffect(() => {
    handleGetProducts();
  }, []);

  async function handleGetProducts() {
    const products = await axios.get("http://localhost:5556/product/list/10");
    console.log(products.data);
    setProducts(products.data);
  }

  const handleDeleteImage = async () => {
    try {
      if (image) {
        const res = await axios.post("/course/delete-image", { image });
        toast({
          position: "top",
          status: "success",
          description: "Imagem removida com sucesso",
        });
        setImage(null);
        setPreview(null);
        setUploadButtonText("Upload Image");
      } else {
        toast({
          position: "top",
          status: "error",
          description: "Tente novamente em alguns instantes",
        });
      }
    } catch (err) {
      toast({
        position: "top",
        status: "error",
        description: "erro",
      });
      console.log(err);
      setValues({ ...values });
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");

    setPrice(Number(value));

    if (Number(value) < 10000) {
      const decimalValue = value + "00";

      setValues({
        ...values,
        default_price_data: {
          currency: "BRL",
          unit_amount_decimal: Number(decimalValue),
        },
      });
    }
  };

  const handleCreateImage = (e) => {
    if (e.target.files.length !== 0) {
      let file = e.target.files[0];
      setPreview(window.URL.createObjectURL(e.target.files[0]));
      setUploadButtonText(file.name);

      FileResizer.imageFileResizer(
        file,
        720,
        500,
        "JPEG",
        100,
        0,
        async (uri) => {
          try {
            const data = await axios.post(
              "http://localhost:5556/product/upload-image",
              {
                image: uri,
              }
            );

            setImage(data.data);
            setValues({ ...values, image: data.data.Location });
          } catch (err) {
            console.log(err);
            toast({
              status: "error",
              description: "Image upload failed. Try later.",
              duration: 1000,
            });
          }
        }
      );
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    try {
      const data = await axios.post("http://localhost:5556/product/create", {
        name: values.name,
        active: values.active,
        description: values.description,
        default_price_data: values.default_price_data,
        image: values.image,
      });
      console.log(data.data);
      toast({
        status: "success",
        description: "Produto adicionado com sucesso",
      });
      setDrawerType("Products");
    } catch (e) {
      toast({
        status: "error",
        description: "Tente novamente mais tarde",
      });
    }
  };

  const [drawerType, setDrawerType] = useState<
    | "Menu"
    | "Cart"
    | "SignIn"
    | "SignUp"
    | "Orders"
    | "Profile"
    | "Add"
    | "Products"
    | ""
  >("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    const response = await signIn({ email, password });
    if (response.error === true) {
      toast({
        status: "error",
        description: response.message,
      });
    } else if (response.status === "Sucesso!") {
      setEmail("");
      setName("");
      setPassword("");
      setTimeout(() => {
        onClose();
      }, 350);
      toast({
        status: "success",
        description: response.message,
      });
    }
  }

  async function handleSignUp() {
    const response = await signUp({ name, email, password });
    console.log(response);
    if (response.status === "Erro!") {
      toast({
        status: "error",
        description: response.error,
      });
    } else {
      setEmail("");
      setName("");
      setPassword("");
      setTimeout(() => {
        onClose();
      }, 350);
      toast({
        status: "success",
        description: "Usuário registrado com sucesso!",
      });
    }
  }

  const size = useWindowSize();

  if (!user) {
    <Loading />;
  }

  return (
    <Flex flexDir="column" position="fixed" w="100%" zIndex="1000">
      <Flex
        maxW={1200}
        mx="auto"
        style={{
          height: 60,
        }}
        bg="#fcfcff"
        w="100%"
        p={size.width < 1200 && "4"}
        justify="space-between"
        flexDir="row"
      >
        <Flex align="center">
          <Text
            cursor="pointer"
            onClick={() => router.push("/")}
            fontSize="3xl"
            fontWeight="medium"
            fontFamily="Staatliches"
            color="#333"
          >
            67g.co
          </Text>
        </Flex>
        <Flex align="center">
          <Icon
            cursor="pointer"
            onClick={() => {
              onOpen();
              setDrawerType("Cart");
            }}
            as={BiShoppingBag}
            color="#333"
            fontSize="3xl"
          />
          {size.width > 800 && (
            <Flex
              onClick={() => {
                onOpen();
                user ? setDrawerType("Menu") : setDrawerType("SignIn");
              }}
              cursor="pointer"
              ml="4"
              bg="#333"
              justify="center"
              align="center"
              p="2"
              px="4"
            >
              <Text color="#FFF" fontWeight="bold" fontSize="md">
                {user ? user.name : "Entrar"}
              </Text>
            </Flex>
          )}
          {size.width < 800 && (
            <Icon
              cursor="pointer"
              onClick={() => {
                onOpen();
                setDrawerType("Menu");
              }}
              ml="5"
              as={RiMenu5Fill}
              color="#333"
              fontSize="3xl"
            />
          )}
        </Flex>
      </Flex>
      {size.width > 800 && (
        <Flex
          maxW={1200}
          mx="auto"
          style={{
            height: 50,
          }}
          px={size.width < 1200 && "4"}
          pb="4"
          w="100%"
          bg="#fcfcff"
          align="center"
        >
          <Text
            cursor="pointer"
            _hover={{
              textDecorationLine: "underline",
            }}
            color="#333"
            mr="10"
            fontFamily="Staatliches"
            fontSize="2xl"
          >
            Para mulheres
          </Text>
          <Text
            cursor="pointer"
            _hover={{
              textDecorationLine: "underline",
            }}
            color="#333"
            mr="10"
            fontFamily="Staatliches"
            fontSize="2xl"
          >
            Para homens
          </Text>
          <Text
            cursor="pointer"
            _hover={{
              textDecorationLine: "underline",
            }}
            color="#333"
            fontFamily="Staatliches"
            fontSize="2xl"
          >
            Acessorios
          </Text>
        </Flex>
      )}
      {/* {none ? (
        <Flex
          style={{
            height: 0,
          }}
        />
      ) : (
        <Flex
          maxW={1200}
          style={{
            height: 80,
          }}
          w="100%"
          py="4"
          mx="auto"
          justify="space-between"
          flexDir="row"
        >
          <Flex>
            {router.asPath === "/account/signin" ||
            router.asPath === "/account/signup" ? (
              <Flex display="none" />
            ) : (
              <Text
                onClick={() => router.push("/overview")}
                textDecorationLine={
                  (router.asPath === "/overview" || router.asPath === "/") &&
                  "underline"
                }
                cursor="pointer"
                fontSize="xl"
                fontWeight="light"
                color="#333"
              >
                Inicio
              </Text>
            )}
            <Flex>
              <Text
                _hover={{
                  textDecorationLine: "underline",
                }}
                onClick={() => router.push("/whiteboard")}
                textDecorationLine={
                  router.asPath === "/whiteboard" && "underline"
                }
                ml="5"
                cursor="pointer"
                fontSize="xl"
                fontWeight="light"
                color="#333"
              >
                Categorias
              </Text>
              <Text
                _hover={{
                  textDecorationLine: "underline",
                }}
                onClick={() => router.push("/projects")}
                textDecorationLine={
                  router.asPath === "/projects" && "underline"
                }
                ml="5"
                cursor="pointer"
                fontSize="xl"
                fontWeight="bold"
                color="tomato"
              >
                Ofertas
              </Text>
            </Flex>
          </Flex>
        </Flex>
      )} */}
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          {drawerType === "Cart" && (
            <DrawerBody py="4">
              <Flex justify="space-between" align="center">
                <Text fontSize="2xl" fontWeight="bold" color="#333">
                  Carrinho
                </Text>
                <Flex
                  cursor="pointer"
                  onClick={() => {
                    onClose();
                    setDrawerType("");
                  }}
                  bg="#f0f0f0"
                  justify="center"
                  align="center"
                  style={{
                    height: 40,
                    width: 40,
                  }}
                >
                  <Icon as={RiCloseFill} color="#333" fontSize="2xl" />
                </Flex>
              </Flex>
              <Flex h="90%" justify="center" align="center" flexDir="column">
                <Text color="#333">Seu carrinho está vazio</Text>
              </Flex>
            </DrawerBody>
          )}

          {drawerType === "Menu" && (
            <DrawerBody py="4" overflow="hidden">
              <Flex justify="space-between" align="center">
                <Text fontSize="2xl" fontWeight="bold" color="#333">
                  Menu
                </Text>
                <Flex flexDir="row">
                  <Flex
                    cursor="pointer"
                    onClick={() => {
                      onClose();
                      setDrawerType("");
                    }}
                    bg="#f0f0f0"
                    justify="center"
                    align="center"
                    style={{
                      height: 40,
                      width: 40,
                    }}
                  >
                    <Icon as={RiCloseFill} color="#333" fontSize="2xl" />
                  </Flex>
                </Flex>
              </Flex>
              <Flex flexDir="column" h="98%" justify="space-between" pb="4">
                <Flex />
                <Flex flexDir="column" borderTop="1px solid #f0f0f0">
                  {user ? (
                    <Flex w="100%" justify="space-between">
                      <Flex flexDir="column" mt="6">
                        <Text
                          onClick={() => {
                            signOut();
                            onClose();
                          }}
                          cursor="pointer"
                          _hover={{
                            textDecorationLine: "underline",
                          }}
                          color="#333"
                          fontSize="lg"
                          mt="3"
                        >
                          Sair da sua conta
                        </Text>
                      </Flex>
                    </Flex>
                  ) : (
                    <Flex
                      _hover={{
                        textDecorationLine: "underline",
                      }}
                      cursor="pointer"
                      onClick={() => setDrawerType("SignIn")}
                      w="100%"
                      py="3"
                      bg="#333"
                      justify="center"
                      align="center"
                      color="#FFF"
                      fontWeight="bold"
                    >
                      Entrar na sua conta
                    </Flex>
                  )}
                </Flex>
              </Flex>
            </DrawerBody>
          )}

          {user && drawerType === "Orders" && (
            <DrawerBody py="4" overflow="hidden">
              <Flex justify="space-between" align="center">
                <Text fontSize="2xl" fontWeight="bold" color="#333">
                  Pedidos
                </Text>
                <Flex>
                  <Flex
                    mr="2"
                    cursor="pointer"
                    onClick={() => {
                      setDrawerType("Menu");
                    }}
                    bg="#f0f0f0"
                    justify="center"
                    align="center"
                    style={{
                      height: 40,
                      width: 40,
                    }}
                  >
                    <Icon as={RiArrowLeftLine} color="#333" fontSize="2xl" />
                  </Flex>
                  <Flex
                    cursor="pointer"
                    onClick={() => {
                      onClose();
                      setDrawerType("");
                    }}
                    bg="#f0f0f0"
                    justify="center"
                    align="center"
                    style={{
                      height: 40,
                      width: 40,
                    }}
                  >
                    <Icon as={RiCloseFill} color="#333" fontSize="2xl" />
                  </Flex>
                </Flex>
              </Flex>
              <Flex flexDir="column" h="98%" justify="space-between" pb="4">
                <Flex
                  flexDir="column"
                  mt="8"
                  h="100%"
                  justify="center"
                  align="center"
                >
                  <Text color="#333" w="100%" textAlign="center" fontSize="lg">
                    Você ainda não fez nenhum pedido
                  </Text>
                </Flex>
              </Flex>
            </DrawerBody>
          )}

          {drawerType === "SignIn" && (
            <DrawerBody py="4" overflow="hidden">
              <Flex justify="space-between" align="center">
                <Text fontSize="2xl" fontWeight="bold" color="#333">
                  Entrar
                </Text>
                <Flex flexDir="column">
                  <Flex
                    cursor="pointer"
                    onClick={() => {
                      onClose();
                      setDrawerType("");
                    }}
                    bg="#f0f0f0"
                    justify="center"
                    align="center"
                    style={{
                      height: 40,
                      width: 40,
                    }}
                  >
                    <Icon as={RiCloseFill} color="#333" fontSize="2xl" />
                  </Flex>
                </Flex>
              </Flex>
              <Flex flexDir="column" h="98%" justify="space-between" pb="4">
                <Flex flexDir="column" mt="8">
                  <Text mt="4" color="#333" fontSize="xl">
                    E-mail
                  </Text>
                  <Input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                    type="email"
                    borderRadius="0"
                    w="100%"
                    style={{
                      height: 50,
                    }}
                    color="#333"
                  />
                  <Flex w="100%" justify="space-between" align="center">
                    <Text mt="4" color="#333" fontSize="xl">
                      Senha
                    </Text>
                    <Text
                      cursor="pointer"
                      mt="4"
                      textDecorationLine="underline"
                      color="#333"
                      fontSize="md"
                    >
                      Esqueceu sua senha?
                    </Text>
                  </Flex>
                  <Input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setPassword(e.target.value);
                    }}
                    value={password}
                    borderRadius="0"
                    type="password"
                    w="100%"
                    style={{
                      height: 50,
                    }}
                    color="#333"
                  />
                </Flex>
                <Flex flexDir="column">
                  <Flex
                    onClick={handleSignIn}
                    cursor="pointer"
                    _hover={{
                      textDecorationLine: "underline",
                    }}
                    mt="2"
                    bg="#333"
                    justify="center"
                    align="center"
                    w="100%"
                    style={{
                      height: 50,
                    }}
                    color="#FFF"
                    fontWeight="bold"
                  >
                    Entrar
                  </Flex>
                  <Flex
                    onClick={() => setDrawerType("SignUp")}
                    cursor="pointer"
                    _hover={{
                      textDecorationLine: "underline",
                    }}
                    mt="2"
                    border="2px solid #333"
                    justify="center"
                    align="center"
                    w="100%"
                    style={{
                      height: 50,
                    }}
                    color="#333"
                  >
                    Ou criar sua conta
                  </Flex>
                </Flex>
              </Flex>
            </DrawerBody>
          )}

          {drawerType === "SignUp" && (
            <DrawerBody py="4" overflow="hidden">
              <Flex justify="space-between" align="center">
                <Text fontSize="2xl" fontWeight="bold" color="#333">
                  Criar conta
                </Text>
                <Flex flexDir="column">
                  <Flex
                    cursor="pointer"
                    onClick={() => {
                      onClose();
                      setDrawerType("");
                    }}
                    bg="#f0f0f0"
                    justify="center"
                    align="center"
                    style={{
                      height: 40,
                      width: 40,
                    }}
                  >
                    <Icon as={RiCloseFill} color="#333" fontSize="2xl" />
                  </Flex>
                </Flex>
              </Flex>
              <Flex flexDir="column" h="98%" justify="space-between" pb="4">
                <Flex flexDir="column" mt="8">
                  <Text mt="4" color="#333" fontSize="xl">
                    Nome
                  </Text>
                  <Input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setName(e.target.value);
                    }}
                    value={name}
                    borderRadius="0"
                    w="100%"
                    style={{
                      height: 50,
                    }}
                    color="#333"
                  />
                  <Text mt="4" color="#333" fontSize="xl">
                    E-mail
                  </Text>
                  <Input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                    type="email"
                    borderRadius="0"
                    w="100%"
                    style={{
                      height: 50,
                    }}
                    color="#333"
                  />
                  <Flex w="100%" justify="space-between" align="center">
                    <Text mt="4" color="#333" fontSize="xl">
                      Senha
                    </Text>
                  </Flex>
                  <Input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setPassword(e.target.value);
                    }}
                    value={password}
                    borderRadius="0"
                    type="password"
                    w="100%"
                    style={{
                      height: 50,
                    }}
                    color="#333"
                  />
                </Flex>
                <Flex flexDir="column">
                  <Flex
                    onClick={handleSignUp}
                    cursor="pointer"
                    _hover={{
                      textDecorationLine: "underline",
                    }}
                    mt="2"
                    bg="#333"
                    justify="center"
                    align="center"
                    w="100%"
                    style={{
                      height: 50,
                    }}
                    color="#FFF"
                    fontWeight="bold"
                  >
                    Criar conta
                  </Flex>
                  <Flex
                    onClick={() => setDrawerType("SignIn")}
                    cursor="pointer"
                    _hover={{
                      textDecorationLine: "underline",
                    }}
                    mt="2"
                    border="2px solid #333"
                    justify="center"
                    align="center"
                    w="100%"
                    style={{
                      height: 50,
                    }}
                    color="#333"
                  >
                    Ou entrar na sua conta
                  </Flex>
                </Flex>
              </Flex>
            </DrawerBody>
          )}

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
