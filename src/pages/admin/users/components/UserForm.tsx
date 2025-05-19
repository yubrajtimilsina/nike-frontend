import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

interface UserModalProps {
  closeModal: () => void;
}
interface IUser{
    username:string,
    email:string,
    password:string,

}

const UserForm: React.FC<UserModalProps> = ({ closeModal }) => {
  const [data, setData] = useState<IUser>({
    username: "",
    email: "",
    password: "",

  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
        ...data,
        [name]: value
    })
  };
const {users}=useAppSelector((store)=>store.users)
const dispatch=useAppDispatch()
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    dispatch(user)
    setLoading(false);
    closeModal(); // Optionally close modal after submit
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" />
      <div className="relative w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add User</h3>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
            <input
              name="username"
              value={data.username}
              onChange={handleChange}
              type="text"
              required
              className="w-full mt-1 p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
              placeholder="adminuser"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              name="email"
              value={data.email}
              onChange={handleChange}
              type="email"
              required
              className="w-full mt-1 p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              name="password"
              value={data.password}
              onChange={handleChange}
              type="password"
              required
              className="w-full mt-1 p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
              placeholder="••••••••"
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
