import Image from "next/image";

const NoUser = () => {
  return (
    <div className="p-6 pb-9 space-y-1  border-2  bg-white  bg-opacity-70  border-white border-opacity-20 shadow-lg rounded-xl">
      <Image
        src="/sad-van.png"
        width={350}
        height={350}
        alt="logo"
        className="mx-auto px-10 md:px-0"
      />
      <h1 className="text-2xl sm:text-3xl font-semibold text-foreground text-center">
        No Users Registered Yet
      </h1>
      <p className="text-muted-foreground text-center text-sm sm:text-[16px]">
        Currently, no users have registered on the website.
      </p>
      <p className="text-muted-foreground text-center max-w-[700px] w-full mx-auto text-sm sm:text-[16px]">
        Once users sign up, they will appear here for you to manage.
      </p>
    </div>
  );
};

export default NoUser;
