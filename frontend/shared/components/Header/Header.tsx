"use client";

import Image from "next/image";
import logo from "@/app/logo.svg";
import Link from "next/link";
import { Card, Divider } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { axiosAuth } from "../../lib/hooks/axiosAuth";
import { User } from "../../@types/User";
import { TiThMenuOutline } from "react-icons/ti";
import { AnimatePresence, motion } from "framer-motion";
import { BsCalendarEventFill } from "react-icons/bs";
import { IoLogOut } from "react-icons/io5";
import {
  RiLoginCircleFill,
  RiLogoutBoxRFill,
  RiLogoutCircleFill,
} from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { MENU } from "@/shared/data/menu";
import { Imenu } from "@/shared/@types/menu";

const Header = () => {
  const { data: sesson, update } = useSession();

  const [user, setUser] = useState<User>();
  const [menu, setMenu] = useState<Imenu[]>(MENU);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleFindUser = useCallback(async () => {
    try {
      const res = await axiosAuth.post("/auth/me");

      if (res.status == 200) {
        update({
          user: {
            id: res.data.id,
            name: res.data.username,
            email: res.data.email,
          },
        });
      }
    } catch (error) {}
  }, [sesson]);

  useEffect(() => {
    if (sesson?.user.id == undefined && sesson?.user.loggedIn) {
      handleFindUser();
    }
  }, [sesson]);

  useEffect(() => {
    if (sesson?.user.id) {
      setUser(sesson.user);
    }
  }, [sesson]);

  return (
    <>
      <AnimatePresence>
        {showModal && (
          <motion.div
            onClick={() => setShowModal(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-modal p-1 flex justify-center items-end fixed left-0 top-0 w-full h-full overflow-hidden z-50"
          >
            <motion.div
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="w-full p-6 rounded-[20px] bg-[#fff]"
            >
              {user && (
                <Card
                  isPressable
                  className="p-2 rounded-[10px] bg-[#000] text-[#fff] flex justify-start items-center gap-2 flex-row w-full"
                >
                  <div className="bg-[#fff] p-2 rounded-[100px]">
                    <FaUser className="text-[20px] text-[#000]" />
                  </div>
                  {user.name}
                </Card>
              )}
              <div className="font-semibold text-[1.5em]">Menu</div>

              <ul className="mt-4 grid gap-7">
                <li className="rounded-[10px] text-[#FDA403]">
                  <Link
                    href={"/morena/evento"}
                    className="flex justify-start items-center w-full h-full gap-2 font-semibold "
                  >
                    <GoHomeFill className="text-[30px] me-[6px]" /> Pagina
                    Principal
                  </Link>
                </li>
                <li className=" rounded-[10px]">
                  <Link
                    href={"/morena/evento/criar"}
                    className="flex justify-start items-center w-full h-full gap-2 font-semibold "
                  >
                    <BsCalendarEventFill className="text-[25px] me-[6px] " />{" "}
                    Criar Evento{" "}
                  </Link>
                </li>
                {user && (
                  <li
                    className="rounded-[10px]"
                    onClick={() => {
                      signOut();
                    }}
                  >
                    <Link
                      href={""}
                      className="flex justify-start items-center w-full h-full gap-2 font-semibold "
                    >
                      <RiLogoutCircleFill className="text-[30px] " />
                      Sair
                    </Link>
                  </li>
                )}
                {!user && (
                  <>
                    <Divider />
                    <li className="rounded-[10px]">
                      <Link
                        href={"/api/auth/singIn"}
                        className="flex justify-start items-center w-full h-full gap-2 font-semibold bg-[#000] text-[#fff] p-4 rounded-[100px]"
                      >
                        <RiLoginCircleFill className="text-[30px] " />
                        Entrar
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className=" bg-[#fff] w-[100%] flex justify-around items-center max-sm:h-[100px] h-[120px]">
        <Link href={"/morena"}>
          <Image src={logo} alt="" width={180} height={80} />
        </Link>
        <TiThMenuOutline
          className="text-[40px] hidden max-sm:block"
          onClick={() => setShowModal(true)}
        />
        <span className="flex justify-start items-center gap-5 max-sm:hidden">
          <Link href={"/morena/evento/criar"} className="font-extrabold">
            Criar evento
          </Link>

          <Divider
            orientation="vertical"
            className="h-[20px] w-[3px] bg-[#000]"
          />
          {user && (
            <>
              <Link href={"/morena/evento/meu"} className="font-extrabold">
                {user.name.split(" ")[0]} {user.name.split(" ")[1]}
              </Link>
              <Divider
                orientation="vertical"
                className="h-[20px] w-[3px] bg-[#000]"
              />
            </>
          )}

          {!user && (
            <Link href={"/api/auth/signin"} className="font-extrabold">
              Entrar
            </Link>
          )}

          {user && (
            <Link
              href={""}
              onClick={() => signOut()}
              className="font-extrabold"
            >
              SAIR
            </Link>
          )}
        </span>
      </header>
    </>
  );
};

export default Header;
