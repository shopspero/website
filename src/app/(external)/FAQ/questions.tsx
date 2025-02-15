import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon, Link,
} from '@chakra-ui/react';
  
  const FAQS = [
    {
      question: 'What is SPERO?',
      answer: 'SPERO is a team of college students committed to sharing the gospel through biblically empowered apparel.',
    },
    {
      question: 'What does the word "SPERO" mean?',
      answer: <>
        In Latin, "SPERO" means "to hope." Our vision is inspired by Matthew 10:29-31, which reflects care for the insignificant.<br/><br/>
        {' '}If you want to learn more about our name, check out our{' '}
        <Link href="https://shopspero.medium.com/what-does-spero-mean-8abf8394a91a" color="blue.500" isExternal>
          Medium article
        </Link>.
      </>
    },
    {
      question: 'How much of the profits are donated?',
      answer: '30% of all profits are donated to various social-good organizations such as Compassion International and Laundry Love.',
    },
    {
      question: 'Can I return or exchange an item?',
      answer: 'No, all purchases are final unless there are extenuating circumstances or there is a fault in the clothes.',
    },
  ];
  
  export default function questions() {
    return (
      <Box bg="gray.50" py={10}>
        <Container maxWidth="900px">
          <Heading as="h2" size="xl" textAlign="center" mb={6}>
            Frequently Asked Questions
          </Heading>
          <VStack spacing={4}>
            <Accordion allowToggle width="100%">
              {FAQS.map((faq, index) => (
                <AccordionItem key={index} border="none">
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: 'gray.200', color: 'black' }}
                      py={4}
                    >
                      <Box as="span" flex="1" textAlign="left" fontWeight="medium">
                        {faq.question}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} fontSize="md" color="gray.600">
                    {faq.answer}
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </VStack>
        </Container>
      </Box>
    );
  }
  