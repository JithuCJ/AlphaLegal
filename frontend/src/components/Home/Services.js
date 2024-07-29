import React from "react";
import "../../CSS/home/about.css"; // Verify the path is correct
import ContactSection from "./ContactSection";
const services = [
  {
    title: "Governance Framework",
    description:
      "Enhance AI practices responsibly with our cutting-edge AI Governance Framework Service. Our comprehensive guidelines and advanced algorithms promote transparency and accountability, ensuring ethical AI implementation. Trust our expertise for data privacy, bias mitigation, and regulatory compliance, as we optimize your AI initiatives for success.",
    imageUrl: "Service/ai-governance.jpeg",
    imageAlt: "Governance Framework",
  },
  {
    title: "Consulting",
    description:
      "Unlock AI's potential with our expert AI Consulting Service. Our seasoned professionals guide you through AI strategy, implementation, and optimization, driving innovation and business growth. From data analysis to model selection, our tailor-made solutions enhance your competitiveness in the evolving landscape. Experience transformative results with our comprehensive AI consulting services.",
    imageUrl: "Service/ai-consulting-services.jpg",
    imageAlt: "Service/Consulting",
  },
  {
    title: "Industrial Collaboration",
    description:
      "Revolutionize your industry through our AI Industrial Collaboration Service. Seamlessly integrating cutting-edge AI technologies, we optimize processes, boost productivity, and ignite innovation. Stay ahead of the competition with our industry expertise, unlocking new opportunities in AI-driven sectors. Collaborate with us to transform your business and embrace the future.",
    imageUrl: "Service/Industrial.webp",
    imageAlt: "Industrial.webp",
  },
  {
    title: "Training and Workshops",
    description:
      "Empower your team with our comprehensive AI training and workshops. Our industry experts deliver practical learning experiences, equipping your workforce with the skills and knowledge to harness AI’s full potential. From introductory sessions to advanced techniques, our tailored programs drive innovation and business success through AI proficiency.",
    imageUrl: "Service/Training.jpg",
    imageAlt: "Training and Workshops",
  },
  {
    title: "Risk Management",
    description:
      "Mitigate AI risks effectively with our specialized AI Risk Management services. Our comprehensive assessments and strategies proactively identify and address potential risks associated with AI technologies. Safeguard your organization’s reputation and stakeholders’ trust through responsible and ethical AI implementation. Protect data privacy, ensure algorithmic transparency, and mitigate bias with our proactive risk management solutions.",
    imageUrl: "Service/RiskMangement.jpg",
    imageAlt: "Risk Management",
  },
  {
    title: "Risk Mitigation",
    description:
      "Ensure AI system safety and reliability with our AI Risk Mitigation solutions. Our rigorous methodologies identify and mitigate potential risks throughout the AI lifecycle. From robust testing and validation to bias detection and explainability techniques, we proactively address risks, build trust, and uphold ethical AI practices. Experience peace of mind with our comprehensive risk mitigation approach.",
    imageUrl: "Service/RiskMitigarion.jpg",
    imageAlt: "Risk Mitigation",
  },
];

function Services() {
  return (
    <>
      <header className="header text-center py-5">
        <h1 className="display-3">Our Services</h1>
      </header>
      
      <div className="container">
        {services.map((service, index) => (
          <div className="row align-items-center mb-5" key={index}>
            <div className={`col-md-6 ${index % 2 === 1 ? "order-md-2" : ""}`}>
              <h2 className="service-title">
                {" "}
                <b> {service.title} </b>
              </h2>
              <p className="service-description">{service.description}</p>
            </div>
            <div className={`col-md-6 ${index % 2 === 1 ? "order-md-1" : ""}`}>
              <img
                src={service.imageUrl}
                alt={service.imageAlt}
                className="img-fluid rounded"
              />
            </div>
          </div>
        ))}
      </div>
      <ContactSection />
    </>
  );
}

export default Services;
