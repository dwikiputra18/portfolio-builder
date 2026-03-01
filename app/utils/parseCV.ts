import { CVData } from "../type";

export function parseCVText(text: string): CVData {
  const email = text.match(/\S+@\S+\.\S+/)?.[0] || "";
  const phone = text.match(/(\+62|0)8\d{8,12}/)?.[0] || "";

  const name = text.split("\n")[0]?.trim() || "";

  const skillsList = [
    "PHP",
    "JavaScript",
    "Laravel",
    "MySQL",
    "HTML5",
    "CSS3",
    "Git"
  ];

  const detectedSkills = skillsList.filter(skill =>
    text.toLowerCase().includes(skill.toLowerCase())
  );

  return {
    personalData: {
      fullName: name,
      email,
      phone,
      address: "",
      summary: "",
      city: "",
      postalCode: ""
    },
    education: [],
    workExperience: [],
    skills: {
      technical: detectedSkills,
      soft: [],
      languages: []
    },
    certificates: []
  };
}
