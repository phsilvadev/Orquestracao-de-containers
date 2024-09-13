"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

import { Button, Card, Spinner } from "@nextui-org/react";

import { AnimatePresence } from "framer-motion";
import Header from "@/shared/components/Header/Header";
import InputCustom from "@/shared/components/InputCustom/InputCustom";

const SignIn = () => {
  const [isOpenModalSpinner, setIsOpenModalSpinner] = useState<boolean>(false);

  const [singIn, setSingIn] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const handleSignIn = () => {
    setIsOpenModalSpinner(true);

    signIn("credentials", {
      email: singIn.email,
      password: singIn.password,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <>
      <AnimatePresence>
        {isOpenModalSpinner && (
          <div className="modal-container">
            <div className="flex justify-center items-center w-full h-full">
              <Card className="p-4">
                <Spinner color="current" size="lg" />
              </Card>
            </div>
          </div>
        )}
      </AnimatePresence>
      <div className="w-full overflow-y-auto">
        <Header />
        <div className="w-[100%] h-full flex justify-center items-start mt-[200px] gap-[180px]">
          <div className="w-[380px]">
            <div className="text-[1.5em] font-bold text-center">
              Entre com a sua conta
            </div>
            <div className="mt-3">
              Entre com a sua conta para participar do evento
            </div>

            <form action="" className="grid gap-8 mt-7">
              <div className="flex justify-start items-start flex-col">
                <InputCustom
                  value={singIn?.email}
                  onChange={(value) =>
                    setSingIn((prev) => ({ ...prev, email: value }))
                  }
                  label={"Email"}
                  placeholder={"Digite seu email"}
                  type={"text"}
                />
              </div>
              <div className="flex justify-start items-start flex-col">
                <InputCustom
                  value={singIn?.password}
                  onChange={(value) =>
                    setSingIn((prev) => ({ ...prev, password: value }))
                  }
                  label={"Senha"}
                  placeholder={"Digite sua senha"}
                  type={"password"}
                />
              </div>

              <Button
                onClick={handleSignIn}
                className="rounded-[100px] bg-[#000] text-[#fff]"
                size="lg"
              >
                Acessar
              </Button>
            </form>
          </div>
          <div className="w-[380px]">
            <div className="text-[1.5em] font-bold text-center">
              Cadastre-se
            </div>
            <div>Cadastre-se para participar ou em evento</div>

            <form action="" className="grid gap-8 mt-7">
              <div className="flex justify-start items-start flex-col">
                <label>Nome</label>
                <input
                  type="text"
                  className="p-4 w-full border rounded-[7px]"
                  placeholder="Digite seu nome"
                />
              </div>
              <div className="flex justify-start items-start flex-col">
                <label>Email</label>
                <input
                  type="text"
                  className="p-4 w-full border rounded-[7px]"
                  placeholder="Digite seu email"
                />
              </div>
              <div className="flex justify-start items-start flex-col">
                <label>Senha</label>
                <input
                  type="password"
                  className="p-4 w-full border rounded-[7px]"
                  placeholder="Digite sua senha"
                />
              </div>

              <Button
                className="rounded-[100px] bg-[#000] text-[#fff]"
                size="lg"
              >
                Criar conta
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
