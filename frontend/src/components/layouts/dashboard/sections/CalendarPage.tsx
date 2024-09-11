import Container from "@/components/elements/Container";
import React from "react";

const Calendar = () => {
  return (
    <Container className="min-h-screen">
      <div className="flex flex-col gap-6">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-bold tracking-tight first:mt-0">
          Monitoring Calendar
        </h2>
        <p className="leading-7 text-justify">
          In this section you can manage system Absence data such as adding,
          changing and deleting.
        </p>
      </div>
      <div className="mt-12">Pengingat sudah absen belum hari ini</div>
    </Container>
  );
};

export default Calendar;
