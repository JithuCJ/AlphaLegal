const initialFormData = {
  company_name: "",
  industry: "",
  company_size: "",
  annual_revenue: "",
  locations: "",
  contact_name: "",
  contact_position: "",
  contact_email: "",
  contact_phone: "",
  ai_applications: [],
  compliance_requirements: [],
  ai_governance: "",
  ai_vendors: "",
};

const industryOptions = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Retail",
  "Manufacturing",
];

const companySizeOptions = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1001-5000",
  "5001-10000",
  "10001+",
];

const aiApplicationsOptions = [
  "Machine Learning",
  "Natural Language Processing",
  "Computer Vision",
  "Robotics",
  "Predictive Analytics",
];
const complianceRequirementsOptions = [
  "GDPR",
  "HIPAA",
  "CCPA",
  "SOX",
  "PCI DSS",
];

export {
  initialFormData,
  industryOptions,
  companySizeOptions,
  aiApplicationsOptions,
  complianceRequirementsOptions,
};
