"use client";

import { Button, Card, Spinner } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { BsGeoAltFill } from "react-icons/bs";
import { IoIosCalendar } from "react-icons/io";

import { useParams, useRouter } from "next/navigation";
import { EventCreateOrEdit } from "@/shared/@types/event-create-or-edit";
import { AxiosResponse } from "axios";
import { ResponseDetailsEvent } from "@/shared/@types/Response-details-event";

import { axiosAuth } from "@/shared/lib/hooks/axiosAuth";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { axiosBase } from "@/shared/lib/axiosBase";
import LoadingCustom from "@/shared/components/LoadingCustom/LoadingCustom";
import { IoClose } from "react-icons/io5";

const Details = () => {
  const router = useRouter();

  const [isConflict, setIsConflict] = useState<boolean>(false);
  const { data: session } = useSession();
  const [showMensagem, setShowMensagem] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [checkingRegistration, setCheckingRegistration] =
    useState<boolean>(true);
  const [isCrowdedevent, setIsCrowdedevent] = useState<boolean>(true);
  const [event, setEvent] = useState<EventCreateOrEdit>();

  const params = useParams();

  const handleDetailsEvent = useCallback(async () => {
    if (!params.uuid_code) {
      alert("Codígo do evento não informado");
      return;
    }

    try {
      const res = await axiosBase.get<ResponseDetailsEvent>(
        `/event/${params.uuid_code}`
      );

      if (res.status == 200) {
        setEvent(res.data.event);

        if (res.data.event.max_subscription == res.data.writings) {
          setIsCrowdedevent(true);
          setShowMensagem(true);
        }

        setLoading(false);
      }
    } catch (error) {}
  }, []);

  const formatDate = (date: string) => {
    const data = new Date(date);

    // Opções de formatação com tipos corretos
    const opcoes: Intl.DateTimeFormatOptions = {
      weekday: "long", // 'long' é aceito
      year: "numeric", // 'numeric' é aceito
      month: "long", // 'long' é aceito
      day: "numeric", // 'numeric' é aceito
    };

    return new Intl.DateTimeFormat("pt-BR", opcoes).format(data);
  };

  const handleSignupEvent = async () => {
    if (!session) {
      router.push("/api/auth/signin");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosAuth.post("/event/register", {
        event_id: event?.id,
      });
      if (res.status == 200) {
        toast.success("Inscrição feita!!", { autoClose: 3000 });
        setIsCrowdedevent(true);
        setIsRegistered(true);
      } else if (res.status == 500) {
        toast.error("Erro Interno do Servidor", {
          autoClose: 3000,
        });
      } else {
        toast.success("Não foi possivel se inscrever, contato o suporte", {
          autoClose: 3000,
        });
      }
    } catch (error) {
      const axiosResponse = error as AxiosResponse;

      if (axiosResponse.status == 409) {
        setIsConflict(true);
      }

      toast.error("Erro Interno do Servidor", {
        autoClose: 3000,
      });
    }

    setLoading(false);
  };

  const handleRemoveRegistration = async () => {
    setLoading(true);
    try {
      const res = await axiosAuth.post("/event/remove", {
        event_id: event?.id,
      });
      if (res.status == 200) {
        setIsRegistered(false);
        setIsCrowdedevent(false);
        setCheckingRegistration(false);
      }
    } catch (error) {
      const response = error as AxiosResponse;

      if (response.status == 500) {
        toast.error("Erro Interno do Servidor");
      }
    }

    setLoading(false);
  };

  const checkIsMesignedUp = useCallback(async () => {
    if (event && session?.user) {
      try {
        const res = await axiosAuth.post("/event/checked_register", {
          event_id: event.id,
        });

        if (res.status == 200) {
          if (res.data.exists) {
            setIsRegistered(true);
            setIsCrowdedevent(true);
            setCheckingRegistration(false);
          } else {
            setIsRegistered(false);
            setIsCrowdedevent(false);
            setCheckingRegistration(false);
          }
        }
      } catch (error) {
        toast.error("Erro Interno do Servidor");
      }
    }
  }, [event, session?.user]);

  useEffect(() => {
    checkIsMesignedUp();
  }, [event, session?.user]);

  useEffect(() => {
    handleDetailsEvent();
  }, []);

  return (
    <AnimatePresence>
      {isConflict && (
        <motion.div className="modal-container">
          <motion.div
            initial={{ opacity: 0, y: -300 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -500 }}
            className="flex justify-center items-center w-full h-full"
          >
            <Card className="p-4 w-[400px] h-[200px] flex justify-center items-center flex-col relative">
              <IoClose
                className="absolute right-2 top-2 text-[20px] cursor-pointer"
                onClick={() => setIsConflict(false)}
              />
              <div className="text-[20px] text-center font-extrabold">
                <div> Não foi possivel se inscrever</div>
              </div>
              <div className="mt-4 text-center ">
                Você não pode se inscrever em dois eventos ao mesmo tempo.
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
      {loading && <LoadingCustom />}
      {!loading && (
        <section className="w-full flex justify-center items-center">
          <section className="mt-[100px] w-[50%]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[2.5em] font-extrabold"
            >
              {event?.name ? event.name : ""}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="ps-10 mt-[60px]"
            >
              <div className=" flex justify-start items-start">
                <IoIosCalendar className="text-[25px] mt-2" />
                <div className="ms-4 text-[1.1em]">
                  <strong>
                    {formatDate(event?.starts_at ? event?.starts_at : "")}
                  </strong>
                  <div>
                    Início:{" "}
                    {event?.starts_at
                      ? event?.starts_at.split(" ")[1].slice(0, -3)
                      : ""}{" "}
                    Encerramento:{" "}
                    {event?.ends_at
                      ? event?.ends_at.split(" ")[1].slice(0, -3)
                      : ""}
                  </div>
                </div>
              </div>

              <div className="mt-3 flex justify-start items-start">
                <BsGeoAltFill className="mt-4 text-[25px]" />
                <div className="ms-4">
                  <strong>{event ? event.complement : ""}</strong>
                  <div>
                    {event ? event.address : "Endereço não informado"},{" "}
                    {event ? event.number : "Sem numero"} -
                    {event?.neighborhood
                      ? event.neighborhood
                      : " Bairro não informado"}{" "}
                    - {event ? event.city : ""},{" "}
                    {event ? event.zipcode : "Cep não informado"}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="text-[1.5em] font-extrabold">
                  Informações do evento
                </div>
                <div className="w-[550px]">
                  {event ? event.description : "Sem descrição"}
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col justify-start items-start gap-3"
            >
              <Button
                onClick={handleSignupEvent}
                isDisabled={isCrowdedevent}
                className="w-[300px] rounded-[100px] bg-[#000] text-[#fff] mt-[60px] h-[57px]"
              >
                {checkingRegistration && (
                  <>
                    <Spinner size="sm" color="white" /> Verificando Inscrição
                  </>
                )}
                {!checkingRegistration && !isRegistered && <>Inscrever</>}
                {isRegistered && <>Você ja está inscrito</>}
              </Button>

              {isRegistered && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Button
                    onClick={handleRemoveRegistration}
                    variant="flat"
                    color="danger"
                    className="rounded-[100px] w-[300px] h-[40px]"
                  >
                    Remover inscrição
                  </Button>
                </motion.div>
              )}
            </motion.div>
            {showMensagem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[red] mt-4 w-[500px]"
              >
                Desculpe, este evento já atingiu o limite máximo de
                participantes permitidos. Não é possível realizar novas
                inscrições
              </motion.div>
            )}
          </section>
        </section>
      )}
    </AnimatePresence>
  );
};

export default Details;
