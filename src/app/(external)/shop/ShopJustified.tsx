'use client';

import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Link,
  Select,
  Spinner,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import ImageCarousel from '@/components/ImageCarousel';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState, useEffect } from 'react';
import { checkoutWithStripe } from '@/actions/checkout';

const sizes = {
  base: 310,
  sm: 440,
  md: 600,
};

const images = [
  // '/images/designs/justified-1.jpg',
  // '/images/designs/justified-2.jpg',
  // '/images/designs/justified-3.jpg',
  "/images/home/currentdrop3.jpg",
  "/images/home/currentdrop2.jpg",
  "/images/home/currentdrop.jpg"
];

export default function ShopJustified() {
  // const success = useSearchParams().get('success');
  const router = useRouter();

  const [size, setSize] = useState('undefined');
  const [pickupOrShip, setPickupOrShip] = useState('undefined');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSuccess(params.get('success') === 'true');
  }, []);

  async function handleSubmit(event: FormEvent) {
    // Prevent default or multiple submissions
    event.preventDefault();
    if (submitted) {
      return;
    }
    setSubmitted(true);
    setErrorMessage('');

    const { checkoutUrl, status } = await checkoutWithStripe(
      `justified-${size}`,
      pickupOrShip
    );
    if (status === 'out of stock') {
      setErrorMessage('Out of stock');
    } else if (status !== 'success' || !checkoutUrl) {
      setErrorMessage('Internal server error');
    } else {
      router.push(checkoutUrl);
    }
    setSubmitted(false);
  }

  return (
    <>
      {/* If success, show order confirmation page */}
      {success && (
        <Container maxWidth={900} textAlign="center">
          <Center p={10}>
            <Heading as="h1" size="2xl">
              Your order has been placed!
            </Heading>
          </Center>
          <Text mb={5}>
            You&apos;ll receive a confirmation email shortly. Feel free to
            contact us at{' '}
            <Link
              as={NextLink}
              href="mailto:shopspero@gmail.com"
              variant="underline"
              isExternal
            >
              shopspero@gmail.com
            </Link>{' '}
            with any questions.
          </Text>
        </Container>
      )}

      {/* If not success, show order page */}
      {!success && (
        <Container maxWidth={1300} textAlign="center">
          <Center p={10}>
            <Heading as="h1" size="2xl">
              Order the Justified Hoodie
            </Heading>
          </Center>
          <Wrap
            spacing={10}
            direction="row"
            align="center"
            justify="center"
            mt={5}
            mb={5}
          >
            <WrapItem>
              <ImageCarousel width={sizes} srcs={images} />
            </WrapItem>
            <WrapItem maxWidth={600}>
              <VStack align="left" gap={7}>
                <Box textAlign="left">
                The Justified Hoodie was inspired by Romans 3:24-26 which says 
                &ldquo;justified by his grace as a gift, through the redemption that 
                is in Christ Jesus, whom God put forward as a propitiation by his blood, 
                to be received by faith. This was to show God&apos;s righteousness, because 
                in his divine forbearance he had passed over former sins. It was to show 
                his righteousness at the present time, so that he might be just and the 
                justifier of the one who has faith in Jesus.&rdquo; The hoodie reminds us of 
                God&apos;s grace and how we have been justified at the cost of the precious 
                blood of Jesus Christ.
                </Box>
                <Text textAlign="left">
                  Price: <strong>$40</strong>
                </Text>
                <Box>
                  <form onSubmit={handleSubmit}>
                    <VStack gap={3}>
                      <FormControl as="fieldset" isRequired={true}>
                        <FormLabel as="legend">Size</FormLabel>
                        <Select
                          onChange={(e) => setSize(e.target.value)}
                          placeholder="Select size (Almost Gone!)">
                          <option value="s"disabled={true}>S (Out of Stock)</option>
                          <option value="m">M</option>
                          <option value="l">L</option>
                        </Select>
                      </FormControl>
                      <FormControl as="fieldset" isRequired={true}>
                        <FormLabel as="legend">
                          Pickup or delivery option
                        </FormLabel>
                        <Select
                          onChange={(e) => setPickupOrShip(e.target.value)}
                          placeholder="Select option"
                        >
                          <option value="pickup-berkeley">
                            Pickup from a Spero Member for no additional cost in Berkeley
                          </option>
                          <option value="ship">
                            Ship the product to me for an additional $6
                          </option>
                        </Select>
                      </FormControl>
                    </VStack>
                    <HStack pt={4} gap={5}>
                      <Button type="submit">Checkout</Button>
                      {submitted && <Spinner size="md" />}
                      <Text color="red">{errorMessage}</Text>
                    </HStack>
                  </form>
                </Box>
              </VStack>
            </WrapItem>
          </Wrap>
        </Container>
      )}
    </>
  );
}
