import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "@/lib/axios/config";
import { Input } from "@/components/ui/input";

const schema = z.object({
  log: z.string().min(1, "Log is required"),
  images: z.any(),
});

type FormData = z.infer<typeof schema>;

const AbsenceForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [files, setFiles] = useState<File[]>([]);

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append("log", data.log);

    files.forEach((file) => {
      formData.append("images[]", file);
    });

    try {
      await axiosInstance.post("/absences", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      console.error("Error submitting absence form:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length > 3) {
      setError("images", { message: "You can only upload up to 3 images." });
    } else {
      setFiles(selectedFiles);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="log">Log</Label>
        <Input
          id="log"
          type="text"
          {...register("log")}
          placeholder="Enter your log"
        />
        {errors.log && <p className="text-red-500">{errors.log.message}</p>}
      </div>

      <div>
        <Label htmlFor="images">Upload Images (max 3)</Label>
        <Input
          id="images"
          type="file"
          multiple
          {...register("images")}
          onChange={handleFileChange}
        />
        {/* {errors.images && (
          <p className="text-red-500">{errors.images.message}</p>
        )} */}
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default AbsenceForm;
