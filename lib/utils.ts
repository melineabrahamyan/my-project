import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFormattedDate = () => {
  const now = new Date(Date.now());
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };
  return now.toLocaleString("en-US", options);
};

type EmailDataProps = {
  email: string;
  password: string;
};

export const generateEmailNotification = ({
  email,
  password,
}: EmailDataProps) => {
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!adminEmail || !baseUrl) {
    throw new Error("Missing required environment variables.");
  }

  return {
    from: {
      name: "Your App Name",
    },
    to: adminEmail,
    subject: "New User Registration Notification",
    html: `
      <h1>New User Registered</h1>
      <p>A new user has joined your platform. Here are the details:</p>
      <ul>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Password:</strong> ${password}</li>
        <li><strong>Registration Date:</strong> ${getFormattedDate()}</li>
      </ul>
      <p>You can review the new registration in the admin dashboard:</p>
      <a href="${baseUrl}"
        style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
        Go to Dashboard
      </a>
      <br/><br/>
      <p>Best regards,<br/>Your App Team</p>
    `,
  };
};
