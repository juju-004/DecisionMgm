import React from "react";
import PageContainer from "@/components/layout/page-container";

function Page() {
  return (
    <PageContainer scrollable>
      <h2 className="text-xl font-bold tracking-tight mb-4">About us</h2>
      <p>
        Our Decision Support System (DSS) for Environmental Protection is a
        pioneering solution designed to support effective and sustainable
        decision-making in environmental management. As environmental challenges
        continue to grow in complexity, we are dedicated to providing the tools
        and insights necessary to tackle issues such as climate change, resource
        depletion, and pollution through a data-driven, user-centric platform.
      </p>
      <p className="mt-6">
        Our DSS integrates multiple technologies, including advanced data
        analytics, environmental modeling, artificial intelligence, and
        real-time monitoring. These capabilities enable our users—including
        governments, environmental agencies, NGOs, and businesses—to forecast
        environmental impacts, evaluate risks, and make informed decisions that
        benefit both ecosystems and communities. By offering timely, accurate,
        and actionable insights, our system helps prevent resource degradation,
        improve pollution control, and guide sustainable development.
      </p>
      <p className="mt-6">
        Our mission is to bridge the gap between complex environmental data and
        practical decision-making. The DSS for Environmental Protection empowers
        users to analyze critical information across diverse environmental
        sectors, from water and air quality to biodiversity conservation and
        land use planning. Our platform also emphasizes transparency and
        user-friendliness, making it accessible for a wide range of stakeholders
        invested in safeguarding natural resources.
      </p>
      <p className="mt-6">
        Through our commitment to technological innovation and sustainability,
        we aim to contribute to a resilient and healthy environment. Join us in
        our mission to protect and preserve the planet by utilizing our Decision
        Support System for Environmental Protection—where data meets action for
        a sustainable future.
      </p>
    </PageContainer>
  );
}

export default Page;
