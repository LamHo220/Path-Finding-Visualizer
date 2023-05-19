import Header from "@/Components/Header";
import { Container, Row } from "@nextui-org/react";
import Grid from "./Components/Grid";
import { Path, Steps } from "./Components/Results";

function App() {
  return (
    <>
      <Header />
      <Container css={{ paddingTop: "0.5rem" }} lg>
        <Row justify="space-around" align="center">
          <Steps />
          <Path />
        </Row>
        <Grid />
      </Container>
    </>
  );
}

export default App;
