"use client";

import { EventCreateOrEdit } from "@/shared/@types/event-create-or-edit";
import { viaCep } from "@/shared/@types/via-cep";
import InputCustom from "@/shared/components/InputCustom/InputCustom";
import { DATAEVENTCREATEOREDIT } from "@/shared/data/form-data";
import { axiosAuth } from "@/shared/lib/hooks/axiosAuth";
import { Button, Card, Spinner } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

const Editar = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [form, setForm] = useState<EventCreateOrEdit>(DATAEVENTCREATEOREDIT);
  const params = useParams();
  const router = useRouter();
  const [isEvent, setIsEvent] = useState<boolean>(false);

  const handleEditar = async () => {
    setLoading(true);
    try {
      const res = await axiosAuth.put(`/event/${form.uuid_code}`, form);
      if (res.status == 200) {
        toast.success("Eventos salvo com sucesso!!", { autoClose: 3000 });
      } else {
        toast.warning("Não foi possivel savar", { autoClose: 3000 });
      }
    } catch (error) {
      toast.error("Erro na comunicação com servidor", { autoClose: 3000 });
    }
    setLoading(false);
  };

  const handleSearchCep = async (value: string) => {
    setForm((prev) => ({ ...prev, zipcode: MaskCep(value) }));

    fetch(`https://viacep.com.br/ws/${MaskCep(value).replace("-", "")}/json/`)
      .then((response) => response.json())
      .then((response: viaCep) => {
        setForm((prev) => ({
          ...prev,
          address: response.logradouro,
          city: response.localidade,
          neighborhood: response.bairro,
          state: response.estado,
          complement: response.complemento,
        }));
      })
      .catch((erro) => console.log(erro));
  };

  const MaskCep = (value: string) => {
    // Remove todos os caracteres que não são dígitos
    value = value.replace(/\D/g, "");

    // Aplica a máscara no formato 00000-000
    if (value.length > 5) {
      value = value.slice(0, 5) + "-" + value.slice(5, 8);
    }

    return value.slice(0, 9); // Limita o valor a 9 caracteres
  };

  const handleDetalhsEvent = useCallback(async () => {
    if (params.uuid_code) {
      const res = await axiosAuth.get(`/event/${params.uuid_code}`);
      if (res.status == 200) {
        if (res.data.event) {
          setLoading(false);
          setForm(res.data.event);
        } else {
          setIsEvent(true);
        }
      } else {
        toast.error(
          "Ocorreu um erro com a comunicaçãoErro Interno do Servidor",
          {
            autoClose: 3000,
          }
        );
      }
    }
  }, [params.uuid_code]);

  const handleRedirect = () => {
    router.push("/morena/evento/meu");
  };

  const handleDeletar = async () => {
    const res = await axiosAuth.delete(`/event/${params.uuid_code}`);
    setLoading(true);
    if (res.status == 200) {
      router.push("/morena/evento/meu");
    } else {
      toast.error("Ocorreu um erro com a comunicaçãoErro Interno do Servidor", {
        autoClose: 3000,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    handleDetalhsEvent();
  }, [handleDetalhsEvent]);

  return (
    <>
      {isEvent && (
        <div className="bg-modal w-full h-full fixed left-0 top-0 z-[55] flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: -500 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -500 }}
          >
            <Card className="p-7 ps-[50px] pe-[50px] relative">
              <IoClose
                className="absolute right-2 top-2 text-[20px] cursor-pointer"
                onClick={handleRedirect}
              />
              <div className="text-center text-[1.3em] font-bold">Aviso!!</div>
              <div className="mt-4">Evento não foi encontrado.</div>
            </Card>
          </motion.div>
        </div>
      )}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-container"
          >
            <div className="flex justify-center items-center w-full h-full">
              <Card className="p-4">
                <Spinner color="current" size="lg" />
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <section className="w-full flex justify-start items-center mt-[100px] flex-col pb-[100px]">
        <div className="text-[1.8em] font-bold">Editar Evento</div>
        <div className="mt-1 font-normal text-[1.2em]">
          Cadastre-se para participar ou criar um evento.
        </div>

        <form className="w-[50%] grid grid-cols-2 mt-9">
          <section className="flex justify-start items-start flex-col p-6">
            <div className="flex justify-center items-start flex-col">
              <label>Ativo?</label>
              <input
                onChange={(event) => {
                  setForm((prev) => ({
                    ...prev,
                    is_active: event.target.checked,
                  }));
                }}
                checked={form.is_active}
                type="checkbox"
                className="scale-[1.5] mt-5 ms-2"
              />
            </div>

            <div className="mt-9 w-full grid gap-7">
              <InputCustom
                value={form.name}
                onChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    name: value,
                  }))
                }
                type="text"
                label="Nome do Evento"
                placeholder="Digite o nome do evento"
              />

              <InputCustom
                value={form.description}
                type="textarea"
                label="Descrição"
                placeholder=""
                onChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    description: value,
                  }))
                }
              />

              <InputCustom
                value={form.starts_at}
                type="datetime-local"
                label="Data/Hora Inicio do Evento"
                placeholder=""
                onChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    starts_at: value,
                  }))
                }
              />

              <InputCustom
                value={form.ends_at}
                type="datetime-local"
                label="Data/Hora Fim do Evento"
                placeholder=""
                onChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    ends_at: value,
                  }))
                }
              />

              <InputCustom
                value={form.max_subscription}
                type="number"
                label="Vagas para o Evento"
                placeholder="Limite máximo de pessoas"
                onChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    max_subscription: Number(value),
                  }))
                }
              />
            </div>
          </section>

          <section className="p-6 grid gap-9">
            <InputCustom
              label={"CEP"}
              value={form.zipcode}
              placeholder={"00000-000"}
              type={"text"}
              onChange={handleSearchCep}
            />
            <InputCustom
              value={form.address}
              label={"Endereço"}
              placeholder={""}
              type={"text"}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  address: value,
                }))
              }
            />
            <InputCustom
              value={form.complement}
              label={"Complemento"}
              placeholder={""}
              type={"text"}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  complement: value,
                }))
              }
            />
            <InputCustom
              value={form.number}
              label={"Numero"}
              placeholder={""}
              type={"text"}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  number: value,
                }))
              }
            />
            <InputCustom
              value={form.neighborhood}
              label={"Bairro"}
              placeholder={""}
              type={"text"}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  neighborhood: value,
                }))
              }
            />
            <InputCustom
              value={form.city}
              label={"Cidade"}
              placeholder={""}
              type={"text"}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  city: value,
                }))
              }
            />
            <InputCustom
              value={form.state}
              label={"Estado"}
              placeholder={""}
              type={"text"}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  state: value,
                }))
              }
            />
          </section>
        </form>

        <Button
          size="lg"
          className="w-[400px] rounded-[100px] bg-[#000]  text-[#fff]"
          onClick={handleEditar}
        >
          Editar
        </Button>
        <Button
          size="lg"
          className="w-[400px] rounded-[100px] mt-3 text-[#fff] bg-[red]"
          variant="flat"
          onClick={handleDeletar}
        >
          Excluir
        </Button>
      </section>
    </>
  );
};

export default Editar;
