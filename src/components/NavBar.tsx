'use client';

import {
  Box,
  Flex,
  HStack,
  Link,
  Text,
  useColorModeValue,
  IconButton,
  Collapse,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

interface LinkInfo {
  title: string;
  href: string;
}

// Reusable NavLink component
const NavLink = (link: LinkInfo) => (
  <Link
    as={NextLink}
    href={link.href}
    px={3}
    py={2}
    rounded="md"
    _hover={{
      textDecoration: 'none',
      bg: 'gray.100',
      transitionDuration: '0.2s',
    }}
  >
    <Text>{link.title}</Text>
  </Link>
);

export default function NavBar({ links }: Readonly<{ links: LinkInfo[] }>) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isAtTop, setIsAtTop] = useState(true);
  const pathname = usePathname();

  // Detect if the user is at the top of the page
  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if on home page
  const isHomePage = pathname === '/';

  // Dynamically set styling based on scroll/home-page
  const bg = useColorModeValue(
    isAtTop && isHomePage ? 'transparent' : 'white',
    'gray.900'
  );
  const color = isAtTop && isHomePage ? 'white' : 'black';
  const boxShadow = isAtTop && isHomePage ? 'none' : 'sm';

  // Split links for left and right sections on desktop
  const half = Math.ceil(links.length / 2);
  const leftLinks = links.slice(0, half);
  const rightLinks = links.slice(half);

  // Base link styling for hover, etc.
  const linkStyle = {
    px: 3,
    py: 2,
    fontSize: 'sm',
    fontWeight: 'medium',
    _hover: {
      textDecoration: 'none',
      color: isAtTop && isHomePage ? 'gray.300' : 'gray.500',
    },
  };

  return (
    <>
      {/* Fixed Navbar */}
      <Box
        position="fixed"
        top={0}
        width="100%"
        zIndex="1000"
        bg={bg}
        color={color}
        boxShadow={boxShadow}
        transition="background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease"
        py={3}
      >
        <Flex
          maxWidth="1300px"
          mx="auto"
          align="center"
          justify="space-between"
          px={8}
        >
          {/* Mobile Toggle Button */}
          <IconButton
            size="md"
            icon={isOpen ? <SmallCloseIcon /> : <HamburgerIcon />}
            aria-label="Toggle Menu"
            display={{ base: 'flex', md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
            variant="ghost"
            _hover={{ bg: 'transparent' }}
            color={color}
          />

          {/* Left Links (Desktop) */}
          <HStack
            flex="1"
            spacing={6}
            display={{ base: 'none', md: 'flex' }}
          >
            {leftLinks.map((link) => (
              <Link
                key={link.title}
                as={NextLink}
                href={link.href}
                {...linkStyle}
              >
                {link.title}
              </Link>
            ))}
          </HStack>

          {/* Center "SPERO" Logo */}
          <Link as={NextLink} href="/" _hover={{ textDecoration: 'none' }}>
            <Text
              fontSize="lg"
              fontWeight="bold"
              textAlign="center"
              letterSpacing="wide"
              mx={{ base: 'auto', md: '0' }}
              display={{ base: 'block', md: 'inline-block' }}
            >
              SPERO
            </Text>
          </Link>

          {/* Right Links (Desktop) */}
          <HStack
            flex="1"
            spacing={6}
            justify="flex-end"
            display={{ base: 'none', md: 'flex' }}
          >
            {rightLinks.map((link) => (
              <Link
                key={link.title}
                as={NextLink}
                href={link.href}
                {...linkStyle}
              >
                {link.title}
              </Link>
            ))}
          </HStack>
        </Flex>

        {/* Mobile Menu (Collapse) */}
        <Collapse in={isOpen} animateOpacity>
          <Box
            pb={4}
            display={{ base: 'block', md: 'none' }}
            zIndex={1200}
            bg={bg} // so it lays on top with same color
          >
            <VStack as="nav" spacing={4} align="flex-start" px={8}>
              {/* Show *all* links in the mobile menu */}
              {links.map((link) => (
                <Link
                  key={link.title}
                  as={NextLink}
                  href={link.href}
                  {...linkStyle}
                  onClick={onClose}
                >
                  {link.title}
                </Link>
              ))}
            </VStack>
          </Box>
        </Collapse>
      </Box>

      {/* Spacer below navbar so content isn't hidden */}
      {!isHomePage && <Box height="60px" />}
    </>
  );
}
