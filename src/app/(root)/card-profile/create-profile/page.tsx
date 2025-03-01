import Container from "@/components/Container";
import CreateOrEditProfile from "@/components/card/cardProfile/CreateOrEditProfile";
import React from "react";

const CreateProfilePage = () => {
  return (
    <Container
      title="Create Profile"
      subtitle="Fill in profile details and add card fee."
    >
      <CreateOrEditProfile />
    </Container>
  );
};

export default CreateProfilePage;
