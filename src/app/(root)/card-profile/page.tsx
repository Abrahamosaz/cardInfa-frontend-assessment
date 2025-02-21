import React from "react";
import Container from "@/components/Container";
import CardProfile from "@/components/card/cardProfile/CardProfile";

const CardProfilePage = () => {
  return (
    <Container
      title="Card Profile"
      subtitle="Create, View and edit card profile here."
    >
      <CardProfile />
    </Container>
  );
};

export default CardProfilePage;
