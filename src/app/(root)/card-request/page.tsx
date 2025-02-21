import CardRequest from "@/components/card/cardRequest/CardRequest";
import Container from "@/components/Container";
import React from "react";

const CardRequestPage = () => {
  return (
    <Container
      title="Card Request"
      subtitle="Create, View and edit card request here."
    >
      <CardRequest />
    </Container>
  );
};

export default CardRequestPage;
