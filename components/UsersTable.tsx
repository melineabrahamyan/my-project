import { IUser } from "@/actions/user";
import { useToast } from "@/hooks/use-toast";
import { formatDateToDDMMYYYY, getFormattedDate } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import DetailsPopup from "./DetailsPopup";

const UsersTable = ({ users }: { users?: IUser[] }) => {
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

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

  const handleShowUserDetails = (user: IUser) => {
    setSelectedUser(user);
  };

  const handleClosePopup = () => {
    setSelectedUser(null);
  };

  return (
    <>
      {selectedUser && (
        <DetailsPopup user={selectedUser} onClose={handleClosePopup} />
      )}
      <div className="overflow-x-auto px-4 sm:px-6 lg:px-8">
        <table className="w-full table-fixed border-collapse min-w-[480px]">
          <thead>
            <tr className="border-b border-purple-300/20">
              <th className="text-left p-4 font-semibold text-xs sm:text-sm md:text-base w-[30%]">
                Email
              </th>
              <th className="text-left p-4 font-semibold text-xs sm:text-sm md:text-base w-[30%]">
                Password
              </th>
              <th className="text-left p-4 font-semibold text-xs sm:text-sm md:text-base w-[20%]">
                Registration Date
              </th>
              <th className="text-left p-4 font-semibold text-xs sm:text-sm md:text-base w-[20%]">
                Registered by
              </th>
              <th className="text-center p-4 font-semibold text-xs sm:text-sm md:text-base w-[10%]">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-purple-100 transition-colors"
              >
                <td className="p-2 sm:p-4 break-words">
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-purple-500 text-xs sm:text-sm md:text-base truncate">
                      {user.email}
                    </span>
                    <button
                      onClick={() =>
                        copyToClipboard(user.email, `${user.id}-email`, "email")
                      }
                      className="rounded-md hover:bg-purple-400/20 transition-colors"
                    >
                      {copiedId === `${user.id}-email` ? (
                        <Check className="h-3 lg:h-4 w-3 lg:w-4 text-green-400" />
                      ) : (
                        <Copy className="h-3 lg:h-4 w-3 lg:w-4 text-purple-500" />
                      )}
                    </button>
                  </div>
                </td>
                <td className="p-2 sm:p-4 break-words">
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-purple-500 text-xs sm:text-sm md:text-base truncate">
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
                      className="rounded-md hover:bg-purple-400/20 transition-colors"
                    >
                      {copiedId === `${user.id}-pass` ? (
                        <Check className="h-3 lg:h-4 w-3 lg:w-4 text-green-400" />
                      ) : (
                        <Copy className="h-3 lg:h-4 w-3 lg:w-4 text-purple-500" />
                      )}
                    </button>
                  </div>
                </td>
                <td className="p-2 sm:p-4 break-words">
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-purple-500 text-xs sm:text-sm md:text-base hidden md:inline">
                      {getFormattedDate(new Date(user.createdAt))}
                    </span>
                    <span className="font-mono text-purple-500 text-xs lg:text-[16px] break-words inline md:hidden">
                      {formatDateToDDMMYYYY(new Date(user.createdAt))}
                    </span>
                  </div>
                </td>
                <td className="p-2 sm:p-4 text-purple-500 text-xs sm:text-sm md:text-base break-words">
                  {user.registeredBy}
                </td>
                <td
                  onClick={() => handleShowUserDetails(user)}
                  className="p-2 sm:p-4 text-center text-purple-500 hover:text-purple-400 text-xs sm:text-sm md:text-base cursor-pointer"
                >
                  Show
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersTable;
