import { IUser } from "@/actions/user";

const DetailsPopup = ({
  user,
  onClose,
}: {
  user: IUser;
  onClose: () => void;
}) => {
  const details = {
    "First Name": user.firstName,
    "Last Name": user.lastName,
    "Company Name": user.companyName,
    "MC Number": user.mcNumber,
    DOT: user.dot,
  };

  const allDetailsMissing = Object.values(details).every(
    (value) => value === null
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-4 sm:mx-6 md:mx-auto">
        <h2 className="text-xl font-semibold text-purple-600 mb-6 border-b pb-2 text-center">
          Driver Details
        </h2>
        <div className="text-sm space-y-4">
          {allDetailsMissing ? (
            <p className="text-center text-red-500 font-medium">
              Details are not provided.
            </p>
          ) : (
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              }}
            >
              {Object.entries(details).map(([key, value]) => (
                <div
                  key={key}
                  className="flex flex-col bg-gray-100 p-3 rounded-md shadow-sm"
                >
                  <span className="text-gray-500 text-xs">{key}</span>
                  <span className="text-gray-900 text-sm font-medium">
                    {value ?? "Not Provided"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md transition-all"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DetailsPopup;
