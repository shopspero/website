export const metadata = {
  title: 'Team - Spero',
};

import staffData from '@/app/(external)/team/staff-data';
import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';

export default function Page() {
  return (
    <Box bg="white" color="black" py={10}>
      {/* Header Section */}
      <Container maxW="container.lg" mb={10}>
        <Flex align="center" mb={4}>
          {/* Logo */}
          <Image
            src="/images/logo.png"
            alt="Spero Logo"
            boxSize="50px" // Adjust size as needed
            mr={3} // Spacing between the logo and heading
          />
          {/* Heading */}
          <Heading as="h1" size="2xl" fontWeight="bold">
            Who we are
          </Heading>
        </Flex>
        <Text fontSize="lg" color="gray.700" textAlign="left">
          Spero is comprised of a diverse group of Christians who use their
          talents and skills to glorify God through their work. Meet the team
          that makes Spero a reality.
        </Text>
      </Container>

      {/* Team Grid */}
      <Container maxW="container.lg">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {staffData.map((staff) => (
            <VStack key={staff.name} spacing={4} align="center">
              {/* Profile Image */}
              <Image
                src={staff.img}
                alt={staff.name}
                borderRadius="md"
                objectFit="cover"
                width="100%"
                maxWidth="250px" 
                height="250px"
              />
              {/* Name and Role */}
              <Heading as="h3" size="md" fontWeight="semibold">
                {staff.name}
              </Heading>
              <Text fontSize="sm" color="gray.600">
                {staff.role}
              </Text>
            </VStack>
          ))}
        </SimpleGrid>
      </Container>

      {/* Join Us Section */}
      <Container maxW="container.lg" mt={20}>
        <Heading as="h2" size="xl" fontWeight="bold" mb={4} textAlign="left">
          Join Us
        </Heading>
        <Text fontSize="lg" color="gray.700" mb={4} textAlign="left">
          Interested in working with an amazingly creative team who loves God?
          We&apos;re always looking for new members! If you&apos;re excited
          about using your creative talents to glorify God, reach out to us:
        </Text>
        <Text textAlign="left">
          Email us at{' '}
          <Text as="span" color="blue.500">
            <a href="mailto:shopspero@gmail.com">shopspero@gmail.com</a>
          </Text>
        </Text>
        <Text textAlign="left">
          Or message us on{' '}
          <Text as="span" color="blue.500">
            <a href="https://www.instagram.com/shopspero/" target="_blank">
              Instagram
            </a>
          </Text>{' '}
          or{' '}
          <Text as="span" color="blue.500">
            <a href="https://www.facebook.com/shopspero/" target="_blank">
              Facebook
            </a>
          </Text>
          .
        </Text>
      </Container>
    </Box>
  );
}
