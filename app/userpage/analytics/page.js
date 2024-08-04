"use client";
// import { useParams } from 'next/router';
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
import { useGlobalContext } from "@/components/hook/Context";
import { useState, useEffect } from "react";

import Image from "next/image";
import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  PanelLeft,
  PlusCircle,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { CardFooter } from "@/components/ui/card";
import UserPageNav from "@/components/mycomp/UserPageNav";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
// const chartData = [
//   { browser: "wrong", visitors: 275, fill: "var(--color-wrong)" },
//   { browser: "right", visitors: 200, fill: "var(--color-right)" },
//   { browser: "blank", visitors: 200, fill: "var(--color-blank)" },
// ]
const chartConfig = {
  wrong: {
    label: "wrong",
    color: "hsl(var(--chart-1))",
  },
  right: {
    label: "right",
    color: "hsl(var(--chart-2))",
  },
  blank: {
    label: "blank",
    color: "hsl(var(--chart-5))",
  },
};

export default function Analytics({ params }) {
  const [chartData, setChartData] = useState([
    { browser: "wrong", visitors: 275, fill: "var(--color-wrong)" },
    { browser: "right", visitors: 200, fill: "var(--color-right)" },
    { browser: "blank", visitors: 200, fill: "var(--color-blank)" },
  ]);

  let { id } = params;
  id = decodeURIComponent(id);
  const { user, setUser, questionArr, questionByGroup, fetchQuestion } =
    useGlobalContext();
  const [newUserData, setNewUserData] = useState({});
  const [totallObj, setTotallObj] = useState({});
  // console.log("Id :",id);

  // func



  const getNewUserData = (rightBox) => {
    fetch(`https://finalproject-backend-black.vercel.app/api/v1/userRoute/aboutMe`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((item) => item.json())
      .then((item) => {
        console.log("getNewUserData  :", item);
        setNewUserData(item.data.data.progress);
        const totallObj = calculateTotals(item.data.data.progress);
        setTotallObj(totallObj);
        setChartData([
          {
            browser: "wrong",
            visitors: totallObj.totalWrong,
            fill: "var(--color-wrong)",
          },
          {
            browser: "right",
            visitors: totallObj.totalRight,
            fill: "var(--color-right)",
          },
          { browser: "blank", visitors: 0, fill: "var(--color-blank)" },
        ]);
        // setChartData();
        // item.data.data.progress
        // setOpen(false);
        // fetchUsers();
      })
      .catch((err) => {
        console.log("getNewUserData Error :", err);
      });
  };
  function calculateTotals(obj) {
    let totalRight = 0;
    let totalWrong = 0;

    for (const key in obj) {
      totalRight += obj[key].right;
      totalWrong += obj[key].wrong;
    }

    return {
      totalRight,
      totalWrong,
    };
  }



  // usereefff
  useEffect(() => {
    getNewUserData();
  }, [user]);


  return (
    <div className="flex min-h-screen w-full flex-col">
      <UserPageNav />

      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Your Totall Percentage </CardTitle>
          <CardDescription>Here is chart</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={60}
                strokeWidth={5}
              ></Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Right Answers :{totallObj.totalWrong}
          </div>
          <div className="flex items-center gap-2 font-medium leading-none">
            Wrong Answers :{totallObj.totalRight}
          </div>
          <div className="leading-none text-muted-foreground mt-3"></div>
        </CardFooter>
      </Card>


      <div className="flex justify-center items-center" >
        {Object.keys(newUserData).map((key, index) => (
          <Card className="w-[350px] m-3" key={key}>
            <CardHeader>
              <CardTitle>{key}</CardTitle>
              <CardDescription>In this category percentage</CardDescription>
            </CardHeader>
            <CardContent>
              <div key={index}>
                <h2></h2>
                <p>Right: {newUserData[key].right}</p>
                <p>Wrong: {newUserData[key].wrong}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between"></CardFooter>
          </Card>
        ))}
      </div>


    </div>
  );
}
