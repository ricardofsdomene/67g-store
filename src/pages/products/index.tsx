import { Flex, Text, Image } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Products() {
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

  return (
    <Flex flexDir="column" w="100%" bg="#FFF" h="100vh" p="4">
      {products &&
        products.data.map((product, i) => {
          return (
            <Flex key={i}>
              {product.active === true && (
                <Flex flexDir="column">
                  <Text color="#333" fontSize="lg">
                    {product.name}
                  </Text>
                  <Image
                    src={product.images[0]}
                    style={{
                      height: 100,
                      width: 100,
                    }}
                  />
                </Flex>
              )}
            </Flex>
          );
        })}
    </Flex>
  );
}
