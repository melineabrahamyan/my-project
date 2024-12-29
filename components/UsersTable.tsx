import { IUser } from "@/actions/user";
import { useToast } from "@/hooks/use-toast";
import { formatDateToDDMMYYYY, getFormattedDate } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

const UsersTable = ({ users }: { users?: IUser[] }) => {
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

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

  return (
    <table className="w-full table-fixed">
      <thead>
        <tr className="border-b border-purple-300/20">
          <th className="text-left p-4 font-semibold w-1/2 text-xs xs:text-sm md:text-[16px]">
            Email
          </th>
          <th className="text-left p-4 font-semibold w-1/2 text-xs xs:text-sm md:text-[16px]">
            Password
          </th>
          <th className="text-left p-4 font-semibold w-1/2 text-xs xs:text-sm md:text-[16px]">
            Registration Date
          </th>
          <th className="text-left p-4 font-semibold w-1/4 text-xs xs:text-sm md:text-[16px] max-w-20">
            Registered by
          </th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
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
                    copyToClipboard(user.email, `${user.id}-email`, "email")
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
                <span className="font-mono text-purple-500 text-xs lg:text-[16px] break-words hidden md:inline">
                  {getFormattedDate(new Date(user.createdAt))}
                </span>
                <span className="font-mono text-purple-500 text-xs lg:text-[16px] break-words inline md:hidden">
                  {formatDateToDDMMYYYY(new Date(user.createdAt))}
                </span>
              </div>
            </td>
            <td className="font-mono text-purple-500 text-xs lg:text-[16px] p-2 max-w-20">
              {user.registeredBy}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
