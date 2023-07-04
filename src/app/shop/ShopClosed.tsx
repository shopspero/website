'use client';

import { Box, Center, Container, Heading, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Shop() {
  return (
    <Container maxWidth={900} textAlign="center">
      <Center p={10}>
        <Heading as="h1" size="2xl">
          Shop
        </Heading>
      </Center>
      <Text mb={5}>
        Our shop is currently closed, but follow us on{' '}
        <Link
          as={NextLink}
          href="https://www.instagram.com/shopspero/"
          variant="underline"
          isExternal
        >
          Instagram
        </Link>{' '}
        or{' '}
        <Link
          as={NextLink}
          href="https://www.facebook.com/shopspero/"
          variant="underline"
          isExternal
        >
          Facebook
        </Link>{' '}
        for updates on our next drop!
      </Text>
    </Container>
  );
}
