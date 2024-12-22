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

const Dashboard = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [users, setUsers] = useState<IUser[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [take, setTake] = useState<number>(2);

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
    <div className="h-full bg-gradient-to-br from-[#E5DEFF] to-background p-6 sm:p-10 w-full">
      <div className="max-w-6xl w-full mx-auto pt-24">
        {users && users.length > 0 ? (
          <div className="p-6 space-y-6  border-2  bg-white  bg-opacity-70  border-white border-opacity-20 shadow-lg rounded-xl">
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              User Management
            </h1>
            <p className="text-muted-foreground mb-8">
              Manage your user credentials securely
            </p>
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
                    <th className="text-left py-4 px-4 font-semibold">Email</th>
                    <th className="text-left py-4 px-4 font-semibold">
                      Password
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers?.map((user) => (
                    <tr
                      key={user.id}
                      className="animate-fade hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-purple-500">
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
                            className="p-1.5 rounded-md hover:bg-purple-400/20 transition-colors"
                          >
                            {copiedId === `${user.id}-email` ? (
                              <Check className="h-4 w-4 text-green-400" />
                            ) : (
                              <Copy className="h-4 w-4 text-purple-500" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-purple-500">
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
                            className="p-1.5 rounded-md hover:bg-purple-400/20 transition-colors"
                          >
                            {copiedId === `${user.id}-pass` ? (
                              <Check className="h-4 w-4 text-green-400" />
                            ) : (
                              <Copy className="h-4 w-4 text-purple-500" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-4">
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
                    {[2, 5, 10, 20].map((tpl) => (
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

              <div className="flex gap-4 items-center justify-center">
                <Button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="w-full hover-scale"
                >
                  Previous
                </Button>

                <span className="text-muted-foreground whitespace-nowrap">
                  Page {page} of {totalPages}
                </span>

                <Button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  type="submit"
                  className="w-full hover-scale"
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
