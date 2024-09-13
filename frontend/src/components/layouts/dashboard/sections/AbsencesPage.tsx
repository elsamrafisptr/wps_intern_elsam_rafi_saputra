"use client";

import Container from "@/components/elements/Container";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
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
import { Edit, Trash2, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { checkAbsenceToday, getAllAbsences } from "@/lib/axios/api/absences";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AbsenceForm from "./forms/AbsenceForm";

const Absences = () => {
  return (
    <Container className="min-h-screen">
      <div className="flex flex-col gap-6">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-bold tracking-tight first:mt-0">
          Absence List
        </h2>
        <p className="leading-7 text-justify">
          In this section you can manage system Absence data such as adding,
          changing and deleting.
        </p>
      </div>
      <div className="mt-12">
        <AbsenceAlert />
      </div>
      <div className="mt-12">
        <AbsenceListTable />
      </div>
    </Container>
  );
};

function AbsenceAlert() {
  const [hasCheckedIn, setHasCheckedIn] = useState<boolean | null>(null); // null to indicate loading state

  useEffect(() => {
    async function checkAbsenceStatus() {
      const result = await checkAbsenceToday();
      setHasCheckedIn(result);
    }

    checkAbsenceStatus();
  }, []);

  if (hasCheckedIn === null) {
    return (
      <div className="rounded-lg border p-6">
        <p>Loading absence data...</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border p-6">
      {hasCheckedIn ? (
        <div>
          <h1>Welcome</h1>
          <p>You have already checked in for today.</p>
        </div>
      ) : (
        <Dialog>
          <div>
            <h1 className="font-bold text-2xl">Welcome, Good Morning</h1>
            <p className="mt-1 mb-4">
              {"You haven't checked in yet. Please check in now."}
            </p>
            <DialogTrigger asChild>
              <Button>Check In</Button>
            </DialogTrigger>
          </div>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Daily Log Absence</DialogTitle>
            </DialogHeader>
            <AbsenceForm />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function AbsenceListTable() {
  const [absences, setAbsences] = useState([]); // State to store fetched absences
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch absence data when the component mounts
  useEffect(() => {
    const fetchAbsences = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getAllAbsences();
        setAbsences(data);
      } catch (err) {
        setError("Failed to fetch absences.");
      }
      setLoading(false);
    };
    fetchAbsences();
  }, []);

  // Filter absences based on search term and date range
  const filteredAbsences = absences.filter(
    (absence: any) =>
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

  if (loading) return <p>Loading absences...</p>;
  if (error) return <p>{error}</p>;

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
              <TableHead>Day</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((absence: any) => (
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
                      <span className="sr-only">View</span>
                    </Button>
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="outline" size="icon">
                      <Trash2 className="h-4 w-4" />
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


export default Absences;
