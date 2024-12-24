"use client";

import { useEffect, useState } from "react";
import { Search, Copy, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
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
import { getFormattedDate } from "@/lib/utils";
import Statistics from "@/components/Statistics";

const Dashboard = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [users, setUsers] = useState<IUser[]>([]);
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

  const filteredUsers = users?.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyToClipboard = async (
    text: string,
    id: string,
    type: "email" | "password"
  ) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({
      title: "Copied to clipboard",
      description: `${type === "email" ? "Email" : "Password"} has been copied`,
      duration: 2000,
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const totalPages = Math.ceil(totalCount / take);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  return (
    <div className="min-h-[100vh] h-full p-6 sm:p-10 w-full">
      <div className="max-w-6xl w-full mx-auto pt-24">
        {users && users.length > 0 ? (
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
              <table className="w-full table-fixed">
                <thead>
                  <tr className="border-b border-purple-300/20">
                    <th className="text-left p-4 font-semibold w-1/2 text-sm sm:text-[16px]">
                      Email
                    </th>
                    <th className="text-left p-4 font-semibold w-1/2 text-sm sm:text-[16px]">
                      Password
                    </th>
                    <th className="text-left p-4 font-semibold w-1/2 text-sm sm:text-[16px]">
                      Registration Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers?.map((user) => (
                    <tr
                      key={user.id}
                      className="animate-fade hover:bg-white/5 transition-colors"
                    >
                      <td className="p-2 md:p-4 break-words">
                        <div className="flex items-start gap-2">
                          <span className="font-mono text-purple-500 text-xs lg:text-[16px] w-20 md:w-full truncate">
                            {user.email}
                          </span>
                          <button
                            onClick={() =>
                              copyToClipboard(
                                user.email,
                                `${user.id}-email`,
                                "email"
                              )
                            }
                            className="my-auto rounded-md hover:bg-purple-400/20 transition-colors"
                          >
                            {copiedId === `${user.id}-email` ? (
                              <Check className="h-3 lg:h-4 w-3 lg:w-4 text-green-400" />
                            ) : (
                              <Copy className="h-3 lg:h-4 w-3 lg:w-4 text-purple-500" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="p-2 md:p-4 break-words">
                        <div className="flex items-start gap-2">
                          <span className="font-mono text-purple-500 text-xs lg:text-[16px] w-20  truncate">
                            {user.password}
                          </span>
                          <button
                            onClick={() =>
                              copyToClipboard(
                                user.password,
                                `${user.id}-pass`,
                                "password"
                              )
                            }
                            className="my-auto rounded-md hover:bg-purple-400/20 transition-colors"
                          >
                            {copiedId === `${user.id}-pass` ? (
                              <Check className="h-3 lg:h-4 w-3 lg:w-4 text-green-400" />
                            ) : (
                              <Copy className="h-3 lg:h-4 w-3 lg:w-4 text-purple-500" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="p-2 md:p-4 break-words">
                        <div className="flex items-start gap-2">
                          <span className="font-mono text-purple-500 text-xs lg:text-[16px] break-words">
                            {getFormattedDate(new Date(user.createdAt))}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-4 flex-col md:flex-row gap-4">
              <div className="flex gap-4">
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

                <Input
                  type="number"
                  value={page}
                  onChange={(e) =>
                    setPage(
                      Math.max(1, Math.min(totalPages, Number(e.target.value)))
                    )
                  }
                  className="p-2 border rounded-md w-24"
                  min={1}
                  max={totalPages}
                />
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
