import { useState } from "react";

interface Account {
  id: number;
  fullName: string;
  bankname: string;
  accountNumber: string;
}
export const Account: Account[] = [
  {
    id: 1,
    fullName: "John Doe",
    bankname: "Krungthai Bank",
    accountNumber: "123465789",
  },
];

interface AccountProps {
  accounts: Account[];
}

const MyBank = ({ accounts: initialAccounts }: AccountProps) => {
  const [showForm, setShowForm] = useState(false);
  const [fullName, setFullName] = useState("");
  const [bankname, setBankname] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [accounts, setAccounts] = useState(initialAccounts);

  const handleAddaccount = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setFullName("");
    setBankname("");
    setAccountNumber("");

    setEditingId(null);
  };

  const handleSave = () => {
    if (!fullName || !bankname || !accountNumber) {
      alert("Please fill these information. ");
      return;
    }

    if (editingId === null) {
      const newaccount: Account = {
        id: accounts.length + 1,
        fullName,
        bankname,
        accountNumber,
      };
      setAccounts([...accounts, newaccount]);
    } else {
      const editedaccount: Account = {
        id: editingId,
        fullName,
        bankname,
        accountNumber,
      };
      const updatedaccounts = accounts.map((account) =>
        account.id === editingId ? editedaccount : account
      );
      setAccounts(updatedaccounts);
    }
    handleCancel();
  };

  const handleEdit = (account: Account) => {
    setShowForm(true);
    setFullName(account.fullName);
    setBankname(account.bankname);
    setAccountNumber(account.accountNumber);

    setEditingId(account.id);
  };

  const handleDelete = (id: number) => {
    const filteredaccounts = accounts.filter((account) => account.id !== id);
    setAccounts(filteredaccounts);
  };

  return (
    <div className="container py-4 ml-[80px] mt-12">
      {" "}
      <div className="text-[24px] font-simibold text-[#48466D] not-italic font-medium md:font-medium mb-4 ">
        {" "}
        Bank Account
      </div>
      <div className="max-w-screen-lg">
        <div className="flex justify-end px-5">
          <button
            className="w-auto rounded-md border bg-[#48466D] px-5 py-2 text-sm font-medium text-white hover:bg-[#605d91] transition duration-300;"
            onClick={handleAddaccount}
          >
            Add New Account
          </button>
        </div>
        <div className="border-b border-gray-200 mt-4  "> </div>
      </div>

      <div>
        {accounts.map((account) => (
          <div key={account.id}>
            <div className="border max-w-screen-xl p-4 my-2">
              <div className="mx-3 text-[16px] text-[#52525B]  grid grid-cols-4">
                <div className=" text-[12px] text-[#94949B] font-bold col-start-1"> Name
                  <p className="font-bold text-[16px] text-[#52525B] mt-3"> {account.fullName} </p>
                </div>
                <div className=" text-[12px] text-[#94949B] font-bold col-start-2"> Bank Name
                  <p className=" text-[16px] text-[#52525B] mt-3">{account.bankname}</p>
                </div>
                <div className=" text-[12px] text-[#94949B] font-bold col-start-3" > Account Number
                  <p className=" text-[16px] text-[#52525B] mt-3">{account.accountNumber}</p>
                </div>
                <div className="flex justify-end mt-4 col-start-4">
                  <button
                    className="justify-center rounded-md border border-[#48466D] bg-white px-6 py-2 text-sm font-medium text-[#48466D] hover:bg-[#605d91] hover:text-white transition duration-300; mr-2"
                    onClick={() => handleEdit(account)}>
                    Edit
                  </button>
                  <button
                    className=" justify-center rounded-md border bg-[#48466D] px-5 py-2 text-sm font-medium text-white hover:bg-[#605d91] transition duration-300"
                    onClick={() => handleDelete(account.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showForm && (
        <div className="fixed z-15 inset-0 overflow-y-auto ">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background Overlay */}
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            {/* Popup Container */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
                {/* Form Content */}
                <div className="text-center text-[#48466D] not-italic font-semibold text-[24px] mt-2">
                  Add /Edit Bank Account
                </div>
                <div className="sm:flex sm:items-start mx-4 mt-2">
                  <div className=" justify-items-center ">
                    <form>
                      <div className="mb-4 ">
                        <label
                          className="block  font-simibold text-[#48466D] not-italic font-bold mb-2 "
                          htmlFor="fullName"
                        >
                          Full Name
                        </label>
                        <input
                          className="border rounded-lg w-[430px] py-2 px-3 text-[#48466D] leading-tight focus:outline-none focus:shadow-outline"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          id="fullName"
                          placeholder="Full Name"
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-[#48466D] font-bold mb-2 "
                          htmlFor="accountDesc"
                        >
                          Bank Name
                        </label>
                        <select
                          className="border rounded-lg w-[200px] py-2 px-3 text-[#48466D] leading-tight focus:outline-none focus:shadow-outline"
                          value={bankname}
                          onChange={(e) => setBankname(e.target.value)}
                        >
                          <option value="">--Bank Name--</option>
                          <option value="Siam Commercial Bank">Siam Commercial Bank</option>
                          <option value="Kasikorn Bank">Kasikorn Bank</option>
                          <option value="Bangkok Bank">Bangkok Bank</option>
                          <option value="Krung Thai Bank">Krung Thai Bank</option>
                          <option value="TTB Bank">TTB Bank</option>
                        </select>
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-[#48466D] font-bold mb-2"
                          htmlFor="province"
                        >
                          Account Number
                        </label>
                        <input
                          type="number"
                          className="border rounded-lg py-2 px-3 text-[#48466D] leading-tight focus:outline-none focus:shadow-outline"
                          value={accountNumber}
                          onChange={(e) => setAccountNumber(e.target.value)}
                          id="Account Number"
                          placeholder="Account Number"
                        ></input>
                      </div>

                      {/* More form inputs... */}
                    </form>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-5 py-2 bg-[#48466D] text-base font-medium text-white hover:bg-[#605d91] transition duration-300; focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default MyBank;
