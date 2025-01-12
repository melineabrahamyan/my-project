import { IUser } from "@/actions/user";

const DetailsPopup = ({
  user,
  onClose,
}: {
  user: IUser;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-md shadow-md max-w-md w-full m-4">
        <h2 className="text-lg font-bold text-purple-500 mb-4">
          Driver Details
        </h2>
        <div className="text-sm">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Password:</strong> {user.password}
          </p>
          <p>
            <strong>Registration Date:</strong> {user.createdAt}
          </p>
          <p>
            <strong>Registered By:</strong> {user.registeredBy}
          </p>
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DetailsPopup;
