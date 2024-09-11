"use client";

import Container from "@/components/elements/Container";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Eye, Check, X } from "lucide-react";

const Verification = () => {
  return (
    <Container className="min-h-screen">
      <div className="flex flex-col gap-6">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-bold tracking-tight first:mt-0">
          Verification List
        </h2>
        <p className="leading-7 text-justify">
          In this section you can manage system Absence data such as adding,
          changing and deleting.
        </p>
      </div>
      <div className="mt-12">
        <VerificationAlert />
      </div>
      <div className="mt-12">
        <VerificationListTable />
      </div>
    </Container>
  );
};

const allAbsences = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  day: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"][
    Math.floor(Math.random() * 5)
  ],
  date: new Date(2023, 6, 10 + i).toISOString().split("T")[0],
  checkIn: `0${Math.floor(Math.random() * 3) + 8}:${Math.floor(
    Math.random() * 60
  )
    .toString()
    .padStart(2, "0")} AM`,
  checkOut: `0${Math.floor(Math.random() * 3) + 4}:${Math.floor(
    Math.random() * 60
  )
    .toString()
    .padStart(2, "0")} PM`,
  status: ["pending", "ditolak", "diterima"][Math.floor(Math.random() * 3)],
}));

function VerificationAlert() {
  return (
    <div className="rounded-lg border p-6">
      <div>
        <span>
          <h1>Welcome</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
            debitis. Alias, qui.
          </p>
        </span>
      </div>
      <button></button>
    </div>
  );
}

function VerificationListTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const filteredAbsences = allAbsences.filter(
    (absence) =>
      (absence.day.toLowerCase().includes(searchTerm.toLowerCase()) ||
        absence.date.includes(searchTerm)) &&
      (!startDate || absence.date >= startDate) &&
      (!endDate || absence.date <= endDate)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAbsences.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredAbsences.length / itemsPerPage);

  return (
    <div className="container mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-4">
        <Input
          placeholder="Search by day or date"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-1/3"
        />
        <div className="flex gap-2">
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="md:w-auto"
          />
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="md:w-auto"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((absence) => (
              <TableRow key={absence.id}>
                <TableCell>{absence.day}</TableCell>
                <TableCell>{absence.date}</TableCell>
                <TableCell>{absence.checkIn}</TableCell>
                <TableCell>{absence.checkOut}</TableCell>
                <TableCell>{absence.status}</TableCell>
                <TableCell>
                  <div className="flex justify-between">
                    <Button variant="outline" size="icon">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="outline" size="icon">
                      <Check className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="outline" size="icon">
                      <X className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-700">
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, filteredAbsences.length)} of{" "}
          {filteredAbsences.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Select
            value={currentPage.toString()}
            onValueChange={(value) => setCurrentPage(Number(value))}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Page" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: totalPages }, (_, i) => (
                <SelectItem key={i + 1} value={(i + 1).toString()}>
                  Page {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Verification;
