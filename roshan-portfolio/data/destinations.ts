export const destinations = [
  {
    id: "projects",
    label: "Projects",
    floor: "01",
    roomVideo: "/videos/projects/projects.mp4",
  },
  {
    id: "skills",
    label: "Skills",
    floor: "02",
    roomVideo: "/videos/skills/skills.mp4",
  },
  {
    id: "experience",
    label: "Experience",
    floor: "03",
    roomVideo: "/videos/experience/experience.mp4",
  },
  {
    id: "education",
    label: "Education",
    floor: "04",
    roomVideo: "/videos/education/education.mp4",
  },
  {
    id: "contact",
    label: "Contact",
    floor: "EXIT",
    roomVideo: "/videos/contact/contact.mp4",
  },
] as const;

export type DestinationId =
  (typeof destinations)[number]["id"];