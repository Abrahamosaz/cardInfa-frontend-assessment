import { active, inactive } from "@/public/icons";
import { dataProps } from "./type";

type sideBarContentProps = {
  id: number;
  icon: string;
  activeIcon: string;
  label: string;
  path: string;
};

export const siderBarContent: sideBarContentProps[] = [
  {
    id: 1,
    icon: inactive.Branches,
    activeIcon: inactive.Branches,
    label: "Branches",
    path: "/branches",
  },
  {
    id: 2,
    icon: inactive.Roles,
    activeIcon: inactive.Roles,
    label: "Roles",
    path: "/roles",
  },
  {
    id: 3,
    icon: inactive.Users,
    activeIcon: inactive.Users,
    label: "Users",
    path: "/users",
  },
  {
    id: 4,
    icon: inactive.CardScheme,
    activeIcon: inactive.CardScheme,
    label: "Card Scheme",
    path: "/card-scheme",
  },
  {
    id: 5,
    icon: inactive.CardProfile,
    activeIcon: active.ActiveCardProfile,
    label: "Card Profile",
    path: "/card-profile",
  },
  {
    id: 6,
    icon: inactive.CardRequest,
    activeIcon: active.ActiveCardRequest,
    label: "Card Request",
    path: "/card-request",
  },
  {
    id: 7,
    icon: inactive.Stock,
    activeIcon: inactive.Stock,
    label: "Stock",
    path: "/stock",
  },
  {
    id: 8,
    icon: inactive.Cards,
    activeIcon: inactive.Cards,
    label: "Cards",
    path: "/cards",
  },
  {
    id: 9,
    icon: inactive.AuthorizationList,
    activeIcon: inactive.AuthorizationList,
    label: "Authorization List",
    path: "/authorization-list",
  },
  {
    id: 10,
    icon: inactive.AuthorizationQueue,
    activeIcon: inactive.AuthorizationQueue,
    label: "Authorization Queue",
    path: "/authorization-queue",
  },
  {
    id: 11,
    icon: inactive.Trial,
    activeIcon: inactive.Trial,
    label: "Trial",
    path: "/trial",
  },
  {
    id: 12,
    icon: inactive.Account,
    activeIcon: inactive.Account,
    label: "Account",
    path: "/account",
  },
];

export const CardProfileData: dataProps[] = [
  {
    id: 1,
    name: "Verve-1",
    currency: "NGN",
    expiration: 40,
    binPrefix: 506077,
    createdAt: "2024-01-01",
  },
  {
    id: 2,
    name: "Verve-2",
    currency: "NGN",
    expiration: 40,
    binPrefix: 506078,
    createdAt: "2024-01-02",
  },
  {
    id: 3,
    name: "Verve-3",
    currency: "NGN",
    expiration: 40,
    binPrefix: 506079,
    createdAt: "2024-01-03",
  },
  {
    id: 4,
    name: "Verve-4",
    currency: "NGN",
    expiration: 40,
    binPrefix: 506080,
    createdAt: "2024-01-04",
  },
];
