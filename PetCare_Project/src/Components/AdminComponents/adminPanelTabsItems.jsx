import CompanyControl from "./AdminControlComponents/CompanyControl/CompanyControl";
import Dashboard from "./AdminControlComponents/Dashboard/Dashboard";
import PetControl from "./AdminControlComponents/PetControl/PetControl";
import ShelterControl from "./AdminControlComponents/ShelterControl/ShelterControl";
import UserControl from "./AdminControlComponents/UserControl/UserControl";
import VetControl from "./AdminControlComponents/VetControl/VetControl";

export const adminPanelTabsItems = [
  {
    label: `Dashboard`,
    key: 1,
    children: (
        <Dashboard />
    ),
  },
  {
    label: `User data control`,
    key: 2,
    children: (
        <UserControl />
    ),
  },
  {
    label: `Vet control`,
    key: 3,
    children: (
        <VetControl />
    ),
  },
  {
    label: `Company control`,
    key: 4,
    children: (
        <CompanyControl />
    ),
  },
  {
    label: `Shelter control`,
    key: 5,
    children: (
        <ShelterControl />
    ),
  },
  {
    label: `Pet control`,
    key: 6,
    children: (
        <PetControl />
    ),
  },
];
