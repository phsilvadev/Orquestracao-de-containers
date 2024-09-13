"use client";

import { Events } from "@/shared/@types/events";
import { DATA } from "@/shared/data/events.data";
import { axiosBase } from "@/shared/lib/axiosBase";

import { Card } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const Morena = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const [event, setEvent] = useState<Events[]>([]);

  const events = useCallback(async () => {
    try {
      const res = await axiosBase.get("/event/");

      if (res.status == 200) {
        setEvent(res.data);
        setLoading(false);
      }
    } catch (error) {}
  }, []);

  const formatDate = (date: string) => {
    // Separar os componentes do ano, mês e dia
    const [ano, mes, dia] = date.split(" ")[0].split("-");

    // Criar a data usando o construtor com ano, mês (zero indexado), e dia
    const dataObj = new Date(Number(ano), Number(mes) - 1, Number(dia)); // O mês começa em zero, por isso subtraímos 1

    // Cria um array com os meses em português
    const meses = [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ];

    // Formata a data no formato desejado
    const dataFormatada = `${dia.padStart(2, "0")} de ${
      meses[dataObj.getMonth()]
    }, ${dataObj.getFullYear()}`;

    return dataFormatada;
  };

  useEffect(() => {
    events();
  }, []);

  return (
    <section className="flex justify-center items-center mt-[50px] sm:mt-[100px] flex-col pb-[100px]">
      <div className="text-[1.8em] font-bold">Eventos da morena</div>
      <div className="w-full sm:flex sm:justify-center sm:items-start mt-[100px]">
        <div
          className={[
            "grid",
            "lg:grid-cols-3",
            "max-md:p-[20px]",
            "gap-9",
            "lg:w-[66%]",
          ].join(" ")}
        >
          {loading &&
            DATA.map((item, index) => (
              <Card
                key={index}
                className="bg-[#fff] shadow-md rounded-[30px] sm:w-[450px] lg:w-full h-[200px]"
              >
                <Link
                  href={""}
                  className="pt-[55px] pb-[55px] ps-8 flex justify-center items-start flex-col h-full gap-2 w-full"
                >
                  <div className="skeleton rounded-[100px] h-[24px] w-[200px]"></div>
                  <div className=" skeleton text-[1.5em] rounded-[100px] w-[90%] h-[40px] font-bold text-start"></div>
                  <div className="skeleton rounded-[100px] w-[280px] h-[24px]"></div>
                </Link>
              </Card>
            ))}

          <AnimatePresence>
            {!loading &&
              event.length &&
              event.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Card
                    isPressable
                    className="bg-[#fff] shadow-md rounded-[30px] sm:w-[450px] lg:w-full h-[200px]"
                  >
                    <Link
                      href={`/morena/evento/detalhes/${item.uuid_code}`}
                      className="border ps-8 flex justify-center items-start flex-col h-full w-full"
                    >
                      <div>{formatDate(item.starts_at)}</div>
                      <div className="text-[1.5em] font-bold text-start">
                        {item.name}
                      </div>
                      <div className="mt-2">
                        {item.address},{item.number} - {item.city}
                      </div>
                    </Link>
                  </Card>
                </motion.div>
              ))}
            {!loading && !event.length && (
              <section className="col-span-3 text-center bg-[#fff] p-2 border-1 rounded-[20px] h-[200px] flex justify-center items-center">
                Nenhum evento disponível
              </section>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Morena;
