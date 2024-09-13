import { Card } from "@nextui-org/react";
import Link from "next/link";

interface Events {
  date: string;
  title: string;
  description: string;
}

const MorenaEventoMeuEventos = () => {
  const data: Array<Events> = [
    {
      date: "05 de Outubro, 2024",
      title: "JOTA25 em São José dos Campos",
      description: "Farma conde - São Jośe dos Campos",
    },
    {
      date: "05 de Outubro, 2024",
      title: "JOTA25 em São José dos Campos",
      description: "Farma conde - São Jośe dos Campos",
    },
    {
      date: "05 de Outubro, 2024",
      title: "JOTA25 em São José dos Campos",
      description: "Farma conde - São Jośe dos Campos",
    },
    {
      date: "05 de Outubro, 2024",
      title: "JOTA25 em São José dos Campos",
      description: "Farma conde - São Jośe dos Campos",
    },
  ];

  return (
    <section className="flex justify-center items-center mt-[100px] flex-col">
      <div className="text-[1.8em] font-bold">Meus Eventos</div>
      <div className="mt-[200px] grid grid-cols-3 w-[55%] gap-9">
        {data.map((item, index) => (
          <Card
            key={index}
            isPressable
            className="bg-[#fff] h-[230px]  shadow-md rounded-[30px] "
          >
            <Link
              href={""}
              className="border ps-8 flex justify-center items-start flex-col h-full"
            >
              <div>{item.date}</div>
              <div className="text-[1.9em] font-bold text-start">
                {item.title}
              </div>
              <div>{item.description}</div>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default MorenaEventoMeuEventos;
