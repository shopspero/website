import {
  Box,
  Flex,
  Heading,
  Link,
  Container,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import Slideshow from "@/components/Slideshow";

export default function Page() {
  return (
    <>
      {/* Newest Drop Section */}
      <Box position="relative">
        <Slideshow />

        {/* Overlay with Text */}
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          bg="rgba(0, 0, 0, 0.5)"
          color="white"
          textAlign="center"
          p={4}
          position="absolute"
          width="100%"
          top={0}
          zIndex={1}
        >
          <Heading as="h1" fontSize={{ base: "4xl", md: "6xl" }} fontWeight="bold" mb={4}>
            JUSTIFIED BY GRACE
          </Heading>
          <Link
            as={NextLink}
            href="/shop"
            fontSize={{ base: "md", md: "lg" }}
            color="white"
            textDecoration="underline"
            _hover={{ color: "gray.300", textDecoration: "none" }}
          >
            SHOP
          </Link>
        </Flex>
      </Box>

      {/* Campus Section */}
      <Container maxWidth="1300px" py={10}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <VStack spacing={4}>
            <Image src="/images/home/category1.jpg" width={400} height={600} alt="UC Irvine" style={{ borderRadius: "8px" }} />
            <Heading as="h3" size="lg">UC Irvine</Heading>
          </VStack>

          <VStack spacing={4}>
            <Image src="/images/home/category2.jpg" width={400} height={600} alt="UC Berkeley" style={{ borderRadius: "8px" }} />
            <Heading as="h3" size="lg">UC Berkeley</Heading>
          </VStack>

          <VStack spacing={4}>
            <Image src="/images/home/category3.jpg" width={400} height={600} alt="Northeastern" style={{ borderRadius: "8px" }} />
            <Heading as="h3" size="lg">Northeastern</Heading>
          </VStack>
        </SimpleGrid>
      </Container>
    </>
  );
}
