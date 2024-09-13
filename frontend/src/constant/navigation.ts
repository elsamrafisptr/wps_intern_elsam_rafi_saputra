import { Icons } from "@/components/elements/Icons";

const dashboardRoute = "/dashboard";

export const NAVIGATIONDATA = [
  { href: dashboardRoute, icon: Icons.home, label: "dashboard" },
  { href: dashboardRoute + "/absences", icon: Icons.about, label: "absences" },
  {
    href: dashboardRoute + "/verification",
    icon: Icons.project,
    label: "verification",
  },
  {
    href: dashboardRoute + "/calendar",
    icon: Icons.contact,
    label: "calendar",
  },
  {
    href: dashboardRoute + "/calendar",
    icon: Icons.contact,
    label: "User Management",
  },
  {
    href: dashboardRoute + "/calendar",
    icon: Icons.contact,
    label: "Sector Management",
  },
  {
    href: dashboardRoute + "/settings",
    icon: Icons.contact,
    label: "settings",
  },
];
