"use client";

import { Events } from "@/shared/@types/events";
import { DATA } from "@/shared/data/events.data";
import { axiosAuth } from "@/shared/lib/hooks/axiosAuth";
import { Card } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const MorenaEventoMeuEventos = () => {
  // const data: Array<Events> = [];
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Events[]>([]);

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

  const handleMeEvent = useCallback(async () => {
    try {
      const res = await axiosAuth.post("/event/me");

      if (res.status == 200) {
        setData(res.data);
        setLoading(false);
      }
    } catch (error) {}
  }, []);

  useEffect(() => {
    handleMeEvent();
  }, [handleMeEvent]);

  return (
    <section className="flex justify-center items-center mt-[100px] flex-col pb-[100px]">
      <div className="text-[1.8em] font-bold">Meus Eventos</div>
      <div className="mt-[200px] grid grid-cols-3 sm:w-[67%] gap-9">
        <AnimatePresence>
          {loading &&
            DATA.map((item, index) => (
              <Card
                key={index}
                className="bg-[#fff] shadow-md rounded-[30px] max-sm:w-[100%]"
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
          {!loading &&
            data.length &&
            data.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Card
                  isPressable
                  className="bg-[#fff] shadow-md rounded-[30px] w-full h-[200px]"
                >
                  <Link
                    href={`/morena/evento/editar/${item ? item.uuid_code : ""}`}
                    className=" border ps-8 flex justify-center items-start flex-col h-full w-full"
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
          {!loading && !data.length && (
            <section className="col-span-3 text-center bg-[#fff] p-2 border-1 rounded-[50px] h-[300px] flex justify-center items-center">
              Nenhum evento disponível
            </section>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MorenaEventoMeuEventos;
