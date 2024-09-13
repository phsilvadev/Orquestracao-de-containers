import { BsCalendarEventFill } from "react-icons/bs";
import { GoHomeFill } from "react-icons/go";
import { Imenu } from "../@types/menu";

export const MENU: Imenu[] = [
  {
    id: 1,
    title: "Pagina Principal",
    url: "/morena",
    icon: <GoHomeFill className="text-[30px] me-[6px]" />,
    is_active: false,
  },
  {
    id: 2,
    title: "Criar Evento",
    url: "/morena/evento/criar",
    icon: <BsCalendarEventFill className="text-[25px] me-[6px] " />,
    is_active: false,
  },
];
