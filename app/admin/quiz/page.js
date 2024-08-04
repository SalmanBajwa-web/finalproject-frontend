"use client";

import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
  BookAIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Mail, Book } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGlobalContext } from '@/components/hook/Context'
import { useState } from "react";



export default function Dashboard() {

    const {
        user, setUser,questionArr,questionByGroup,
    } = useGlobalContext();


  const createQuestion = () => {
    const question = document.querySelector("#question").value;
    const answer = document.querySelector("#answer").value;
    const choice = document.querySelector("#choice").value;
    const subject = document.querySelector("#subject").value;
    const difficulty = document.querySelector(".difficulty button").textContent;

    // res.set("Authorization", `Bearer ${token}`);
    console.log("user.token: ",user.token);
    fetch("https://finalproject-backend-black.vercel.app/api/v1/questionRoute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${user.token}`
      },
      body: JSON.stringify({
        question,
        answer,
        choice: choice.split(","),
        subject,
        difficulty,
      }),
    })
      .then((item) => item.json())
      .then((item) => {
        console.log("createQuestion  :", item);
      })
      .catch((err) => {
        console.log("createQuestion Error :", err);
      });
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <BookAIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link
            href="#"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Questions
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Users
          </Link>

          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Analytics
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link href="#" className="hover:text-foreground">
                Dashboard
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Orders
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Products
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Customers
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Analytics
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <AlertDialog>
        <AlertDialogTrigger>
          <div className="outerBox flex align-end justify-end">
            <p className=" m-5 mr-8 mb-0 bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center">
              <Book className="mr-2 h-4 w-4" /> New Subject
            </p>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create New Subject</AlertDialogTitle>
              <div className="grid gap-2 mt-4">
                <Label htmlFor="a">Subject</Label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Subject"
                  required
                />
              </div>
              <div className="grid gap-2 mt-5">
                <Label htmlFor="a">Question</Label>
                <Input
                  id="question"
                  type="text"
                  placeholder="Question"
                  required
                />
              </div>
              <div className="grid gap-2 mt-4">
                <Label htmlFor="a">Write comma seprated choices</Label>
                <Input
                  id="choice"
                  type="text"
                  placeholder="Hydrogen, Oxygen, Cholorine, Sodium"
                  required
                />
              </div>
              <div className="grid gap-2 mt-4">
                <Label htmlFor="a">Answer</Label>
                <Input id="answer" type="text" placeholder="answer" required />
              </div>
            
              <div className="grid gap-2 mt-4 difficulty">
                <Label htmlFor="a">Difficulty</Label>

                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Difficulty</SelectLabel>
                      <SelectItem value="apple">easy</SelectItem>
                      <SelectItem value="banana">medium</SelectItem>
                      <SelectItem value="blueberry">hard</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={createQuestion}>Done</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="outerBox flex align-start justify-start">
        <p className="ml-8 ">Subjects </p>
      </div>

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            {Object.entries(questionByGroup).map(([key, value]) =>{
                return(
                    <Card x-chunk="dashboard-01-chunk-0" key={key}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                      Totall Quiz: {value.length}
                      </CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">  {key}</div>
                      {/* <p className="text-xs text-muted-foreground">
                        +20.1% from last month
                      </p> */}
                    </CardContent>
                  </Card>
                );
            })}
         
          
        </div>
      </main>
    </div>
  );
}
