"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getAllUsers, IUser } from "@/actions/user";
import NoUser from "@/components/NoUser";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Statistics from "@/components/Statistics";
import Loader from "@/components/Loader";
import UsersTable from "@/components/UsersTable";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<IUser[]>();
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [take, setTake] = useState<number>(10);

  useEffect(() => {
    const getUsers = async () => {
      const { data, meta } = await getAllUsers(page, take);
      setUsers(data);
      setTotalCount(meta.totalCount);
    };

    getUsers();
  }, [page, take]);

  const filteredUsers = users?.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.registeredBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(totalCount / take);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  return (
    <div className="min-h-[100vh] h-full p-6 sm:p-10 w-full">
      <div className="max-w-6xl w-full mx-auto pt-24">
        {!users ? (
          <Loader />
        ) : users.length > 0 ? (
          <div className="p-6 space-y-4 sm:space-y-6  border-2  bg-white  bg-opacity-70  border-white border-opacity-20 shadow-lg rounded-xl mb-4">
            <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">
              User Management
            </h1>
            <div className="flex justify-between flex-col lg:flex-row">
              <p className="text-muted-foreground mb-8 hidden lg:inline">
                Manage your user credentials securely
              </p>
              <Statistics />
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search users..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="overflow-x-auto rounded-lg">
              <UsersTable users={filteredUsers} />
            </div>

            <div className="flex justify-between items-center mt-4 flex-col md:flex-row gap-4">
              <div className="flex gap-4 w-full max-w-[300px]">
                <Select
                  value={take.toString()}
                  onValueChange={(e) => {
                    setTake(Number(e));
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="input-transition">
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {[10, 25, 50].map((tpl) => (
                      <SelectItem key={tpl} value={tpl.toString()}>
                        {tpl} per page
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={page.toString()}
                  required
                  onValueChange={(val) => {
                    const selectedPage = parseInt(val, 10);
                    handlePageChange(selectedPage);
                  }}
                >
                  <SelectTrigger className="input-transition">
                    <SelectValue placeholder={page} />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(totalPages).keys()].map((i) => (
                      <SelectItem key={i} value={(i + 1).toString()}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 sm:gap-4 items-center justify-center">
                <Button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="w-full hover-scale p-4 h-full max-h-10"
                >
                  Previous
                </Button>

                <span className="text-muted-foreground whitespace-nowrap text-xs sm:text-[16px]">
                  Page {page} of {totalPages}
                </span>

                <Button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  type="submit"
                  className="w-full hover-scale p-4 h-full max-h-10"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <NoUser />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
