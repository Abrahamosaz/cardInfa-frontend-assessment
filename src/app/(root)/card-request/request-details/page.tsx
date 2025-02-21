import RequestDetails from "@/components/card/cardRequest/RequestDetails";
import Container from "@/components/Container";
import React from "react";

const RequestDetailsPage = () => {
  return (
    <Container
      title="Request Details"
      subtitle="Perform predetermined actions on card requests here."
    >
      <RequestDetails />
    </Container>
  );
};

export default RequestDetailsPage;
