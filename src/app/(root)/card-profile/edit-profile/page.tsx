import Container from "@/components/Container";
import CreateOrEditProfile from "@/components/card/cardProfile/CreateOrEditProfile";
import React from "react";

const EditProfilePage = () => {
  return (
    <Container
      title="Edit Profile"
      subtitle="Fill in profile details and add card fee."
    >
      <CreateOrEditProfile type="edit" />
    </Container>
  );
};

export default EditProfilePage;
