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
import WebNav from "@/components/mycomp/webNav";
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
  const [totallObj, setTotallObj] = useState({});
  // console.log("Id :",id);
  const [allUser, setAllUser] = useState([]);
  // func




  const fetchUsers = () => {
    fetch("https://finalproject-backend-black.vercel.app/api/v1/userRoute?page=1&limit=500", {
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then((item) => item.json())
      .then((item) => {
        if (item.status === "success") {
          console.log("fetchUsers success:", item);
          setAllUser(item.data.data);

          let totallObjNew = calculateTotals(item.data.data);
          setTotallObj(totallObjNew);
          setChartData([
            {
              browser: "wrong",
              visitors: totallObjNew.totalWrong,
              fill: "var(--color-wrong)",
            },
            {
              browser: "right",
              visitors: totallObjNew.totalRight,
              fill: "var(--color-right)",
            },
            { browser: "blank", visitors: 0, fill: "var(--color-blank)" },
          ]);
        }
        console.log("fetchUsers  :", item);
      })
      .catch((err) => {
        console.log("fetchUsers Error :", err);
      });
  };
  function calculateTotalsOld(obj) {
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
  function calculateTotals(obj) {
    let arr = [];

    obj.forEach((item) => {
      if (item.progress) {
        arr.push(item.progress);
      }
    });

    let totalRight = 0;
    let totalWrong = 0;

    arr.forEach((obj) => {
      Object.keys(obj).forEach((key) => {
        totalRight += obj[key].right;
        totalWrong += obj[key].wrong;
      });
    });

    return {
      totalRight,
      totalWrong,
    };
  }


  // usereefff
  useEffect(() => {
    // console.log("User :", user);
    fetchUsers();
  }, [user]);



  return (
    <div className="flex min-h-screen w-full flex-col">
      <WebNav />

      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Users Totall Percentage </CardTitle>
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

      {/* 
      <div className="flex justify-center items-center" >
        {Object.keys(newUserData).map((key, index) => (
          <Card className="w-[350px] m-3">
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
      </div> */}
      <div className="flex justify-center items-center">
        {allUser?.map((item, key) => {
          if (item.name === "admin") {
            return (
                <p key={JSON.stringify(item)}></p>
            );
          }
          return (
            <Card className="w-[350px] m-3" key={JSON.stringify(item)}>
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>In this category percentage</CardDescription>
              </CardHeader>
           

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
                    data={[
                      {
                        browser: "wrong",
                        visitors: calculateTotalsOld(item.progress).totalWrong,
                        fill: "var(--color-wrong)",
                      },
                      {
                        browser: "right",
                        visitors: calculateTotalsOld(item.progress).totalRight,
                        fill: "var(--color-right)",
                      },
                      {
                        browser: "blank",
                        visitors: 0,
                        fill: "var(--color-blank)",
                      },
                    ]}
                    dataKey="visitors"
                    nameKey="browser"
                    innerRadius={60}
                    strokeWidth={5}
                  ></Pie>
                </PieChart>
              </ChartContainer>

              <CardContent className="flex justify-center items-center">
                {item.progress &&
                  Object.keys(item.progress).map((key, index) => (
                    <div className=" m-2 px-1 mt-0 " key={key+index}>
                      <p>{key}</p>
                      <div>
                        <p className="text-xs">
                          Right: {item.progress[key].right}
                        </p>
                        <p className="text-xs">
                          Wrong: {item.progress[key].wrong}
                        </p>
                      </div>
                      <CardFooter className="flex justify-between"></CardFooter>
                    </div>
                  ))}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
