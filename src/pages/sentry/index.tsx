import styled from "styled-components";

import AMap from "@/components/amap";

const Container = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
`;

export default function Sentry() {
  return (
    <Container>
      <AMap />
    </Container>
  );
}
