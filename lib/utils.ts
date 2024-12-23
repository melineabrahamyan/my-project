import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFormattedDate = (now: Date = new Date(Date.now())) => {
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
      <a href="${baseUrl}/admin/dashboard"
        style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
        Go to Dashboard
      </a>
      <br/><br/>
      <p>Best regards,<br/>Your App Team</p>
    `,
  };
};

export const addFooter = () => {
  return `<footer style="background-color: #f8f9fa; padding: 40px 20px; text-align: center; font-family: Arial, sans-serif; color: #333;">
  <div style="max-width: 600px; margin: 0 auto;">
    <p style="font-size: 18px; margin-bottom: 20px;">Don't miss out on amazing delivery opportunities!</p>
    <a href="https://my-project-nine-lime.vercel.app" 
       style="display: inline-block; padding: 15px 30px; background-color: #008A00; color: white; text-decoration: none; border-radius: 5px; font-size: 18px; font-weight: bold; text-transform: uppercase; transition: background-color 0.3s;">
       Register Now
    </a>
    <hr style="border: 0; border-top: 1px solid #e0e0e0; margin: 20px 0;">
    <p style="font-size: 14px; color: #777;">&copy; 2024 Your Company Name. All rights reserved.</p>
  </div>
</footer>
`;
};
