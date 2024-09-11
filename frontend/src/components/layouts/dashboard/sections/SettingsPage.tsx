"use client";

import Container from "@/components/elements/Container";
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Lock } from "lucide-react";

const Settings = () => {
  return (
    <Container className="min-h-screen">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-bold tracking-tight first:mt-0">
        Profile Account Settings
      </h2>

      <div className="mt-12">
        <ProfileAccountSettings />
      </div>
    </Container>
  );
};

function ProfileAccountSettings() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [role, setRole] = useState("Employee");
  const [sector, setSector] = useState("Finance");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Settings updated:", {
      name,
      email,
      role,
      sector,
    });
  };

  return (
    <div className="container mx-auto pb-10">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex items-center space-x-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src="/placeholder.svg?height=96&width=96" alt={name} />
            <AvatarFallback>
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <Button type="button" variant="outline">
            <Camera className="mr-2 h-4 w-4" />
            Change Picture
          </Button>
        </div>

        <Separator />

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={setRole} disabled>
              <SelectTrigger
                id="role"
                className="disabled:bg-gray-300 disabled:border-gray-300"
              >
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Employee">Staff</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Admin">Director</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sector">Sector</Label>
            <Select value={sector} onValueChange={setSector} disabled>
              <SelectTrigger
                id="sector"
                className="disabled:bg-gray-300 disabled:border-gray-300"
              >
                <SelectValue placeholder="Select sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Operational">Operational</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Security</h2>
          <Button type="button" variant="outline" className="w-full md:w-auto">
            <Lock className="mr-2 h-4 w-4" />
            Change Password
          </Button>
        </div>

        <Separator />

        <Button type="submit" className="w-full md:w-auto">
          Save Changes
        </Button>
      </form>
    </div>
  );
}

export default Settings;
