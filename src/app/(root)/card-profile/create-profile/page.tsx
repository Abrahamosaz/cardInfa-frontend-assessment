import Container from "@/components/Container";
import CreateProfile from "@/components/card/cardProfile/CreateProfile";
import React from "react";

const CreateProfilePage = () => {
  return (
    <Container
      title="Create Profile"
      subtitle="Fill in profile details and add card fee."
    >
      <CreateProfile />
    </Container>
  );
};

export default CreateProfilePage;
