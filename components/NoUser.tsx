import Image from "next/image";

const NoUser = () => {
  return (
    <div className="p-6 pb-9 space-y-1  border-2  bg-white  bg-opacity-70  border-white border-opacity-20 shadow-lg rounded-xl">
      <Image
        src="/sad-van.png"
        width={350}
        height={350}
        alt="logo"
        className="mx-auto"
      />
      <h1 className="text-3xl font-semibold text-foreground text-center">
        No Users Registered Yet
      </h1>
      <p className="text-muted-foreground text-center">
        Currently, no users have registered on the website.
      </p>
      <p className="text-muted-foreground text-center max-w-[700px] w-full mx-auto">
        Once users sign up, they will appear here for you to manage. Feel free
        to share the registration link with potential users to get started.
      </p>
    </div>
  );
};

export default NoUser;
