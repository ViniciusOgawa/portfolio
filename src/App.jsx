import { Image, Button, ButtonGroup, Flex, Text, Box } from "@chakra-ui/react";
import "./styles/App.css";
import EuImage from "./assets/eu.svg";
import curriculo from "./assets/curriculo.svg";
import git from "./assets/github.svg";
import linkedin from "./assets/linkedin.svg";

function App() {
  return (
    <>
      <Flex bgColor="brand.500" h="100vh" w="100vw" flexDir="column">
        <header>
          <Flex
            h="70px"
            w="100vw"
            p="40px"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text color="white.50" fontSize="2xl" fontWeight="hairline">
              Vinicius Ogawa
            </Text>

            <ButtonGroup>
              <Button
                bgColor="transparent"
                color="white.50"
                fontSize="xl"
                fontWeight="hairline"
                _hover={{
                  backgroundColor: "transparent",
                  color: "white.50",
                  boxShadow: "none",
                }}
                className="underline-hover"
              >
                Home
              </Button>
              <Button
                bgColor="transparent"
                color="white.50"
                fontSize="xl"
                fontWeight="hairline"
                _hover={{
                  backgroundColor: "transparent",
                  color: "white.50",
                  boxShadow: "none",
                }}
                className="underline-hover"
              >
                Stacks
              </Button>
              <Button
                bgColor="transparent"
                color="white.50"
                fontSize="xl"
                fontWeight="hairline"
                _hover={{
                  backgroundColor: "transparent",
                  color: "white.50",
                  boxShadow: "none",
                }}
                className="underline-hover"
              >
                Projects
              </Button>
              <Button
                bgColor="transparent"
                color="white.50"
                fontSize="xl"
                fontWeight="hairline"
                _hover={{
                  backgroundColor: "transparent",
                  color: "white.50",
                  boxShadow: "none",
                }}
                className="underline-hover"
              >
                About me
              </Button>
            </ButtonGroup>
          </Flex>
        </header>

        <Flex h="100%" w="100%" flexDir="column">
          <Flex
            w="100%"
            h="100%"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            gap="20px"
            marginBottom="110px"
          >
            <Image
              src={EuImage}
              boxSize="180px"
              borderRadius="500px"
              boxShadow="rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;"
            />
            <Text color="white.50" fontSize="2xl" fontWeight="hairline">
              FullStack Developer
            </Text>
            <ButtonGroup>
              <Button
                as="a"
                href="https://github.com/ViniciusOgawa"
                target="_blank"
                _hover={{
                  backgroundColor: "transparent",
                  color: "white.50",
                  boxShadow: "none",
                }}
                bgColor="transparent"
              >
                <Image src={git} />
              </Button>
              <Button
                as="a"
                href="https://www.linkedin.com/in/vinicius-ogawa-91311b197/"
                target="_blank"
                _hover={{
                  backgroundColor: "transparent",
                  color: "white.50",
                  boxShadow: "none",
                }}
                bgColor="transparent"
              >
                <Image src={linkedin} />
              </Button>
              <Button
                as="a"
                href="https://docs.google.com/document/d/1iOfmK0ZBNq4vLd27hN0mJCrZPRvjryD4/edit?usp=sharing&ouid=117331709641004714228&rtpof=true&sd=true"
                target="_blank"
                _hover={{
                  backgroundColor: "transparent",
                  color: "white.50",
                  boxShadow: "none",
                }}
                bgColor="transparent"
              >
                <Image src={curriculo} alt="Currículo" />
              </Button>
            </ButtonGroup>
          </Flex>

          <Flex>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 220"
              className="waves"
            >
              <path
                className="wave-1"
                fill="#e0f7fa"
                fill-opacity="1"
                d="M0,32L48,42.7C96,53,192,75,288,106.7C384,139,480,181,576,186.7C672,192,768,160,864,138.7C960,117,1056,107,1152,133.3C1248,160,1344,224,1392,256L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>

              <path
                className="wave-2"
                fill="#80d4de"
                fill-opacity="0.6"
                d="M0,288L48,256C96,224,192,160,288,133.3C384,107,480,117,576,106.7C672,96,768,64,864,64C960,64,1056,96,1152,144C1248,192,1344,256,1392,288L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>

              <path
                className="wave-3"
                fill="#26b5cc"
                fill-opacity="0.3"
                d="M0,320L48,298.7C96,277,192,235,288,192C384,149,480,107,576,112C672,117,768,171,864,160C960,149,1056,75,1152,74.7C1248,75,1344,149,1392,186.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>

              <path
                className="wave-4"
                fill="#57A7B3"
                fill-opacity="0.8"
                d="M0,320L48,277.3C96,235,192,149,288,96C384,43,480,21,576,37.3C672,53,768,107,864,144C960,181,1056,203,1152,192C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default App;
