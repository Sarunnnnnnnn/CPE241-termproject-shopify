import { useState,useEffect } from "react";
import axios from 'axios';

interface Account {
  id: number;
  fullName: string;
  bankname: string;
  accountNumber: string;
}



const MyBank = () => {
  const [showForm, setShowForm] = useState(false);
  const [fullName, setFullName] = useState("");
  const [bankname, setBankname] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [addresses, setAddresses] = useState<Account[]>([]);

  const handleAddAddress = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setFullName("");
    setBankname("");
    setAccountNumber("");
    setEditingId(null);
  };

  const handleSave = async () => {
    if (!fullName || !bankname || !accountNumber ) {
      alert("Please fill these information. ");
      return;
    }
    try {
      const addressData = {
        fullName,
        bankname,
        accountNumber,
      
      };

      const headers = {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Access-Control-Allow-Origin': '*',
      };

      if (editingId === null) {
        const response = await axios.post('http://localhost:3001/addBank', addressData, { headers });
        const newAddress: Account = response.data; // Assuming the API returns the newly added address
        setAddresses([...addresses, newAddress]);
        alert('Account added successfully.');

      } 
      window.location.reload();
    
      handleCancel();
    } catch (error) {
      console.error(error);
      alert('An error occurred while saving the address.');
    }
  };

  const [bankData, setbankData] = useState([] as any[]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3001/get_Bank', null, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            "Access-Control-Allow-Origin":"*"
          },
        });
        setbankData(response.data); 
        console.log(response.data); 
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchData();
  }, [localStorage.getItem('access_token')]);


  const handleEdit = (account: Account) => {
    setShowForm(true);
  
  };

  const handleDelete = async (account: Account) => {
    try {
      const { fullName, bankname, accountNumber } = account;
  
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Access-Control-Allow-Origin': '*',
      };
  
      await axios.post('http://localhost:3001/deleteBank', { fullName, bankname, accountNumber }, { headers });
  
      alert('Account deleted successfully.');
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('An error occurred while deleting the account.');
    }
  };

  return (
    <div className="container py-4 ml-[60px] mt-[100px]">
      <div className="text-[24px] font-simibold text-[#48466D] not-italic font-medium md:font-medium mb-4 ">
        Bank Account
      </div>
      {(!bankData || bankData.length === 0 || bankData.some((data) => data.bankname === '')) && (
        <div className="max-w-screen-lg">
          <button
            className=" justify-center rounded-md border bg-[#48466D] px-5 py-2 text-sm font-medium text-white hover:bg-[#605d91] transition duration-300; ml-[900px]"
            onClick={handleAddAddress}
          >
            Add Address
          </button>
          <div className="border-b border-gray-200 mt-4  "> </div>
        </div>
       ) }
        <div>
  {bankData && (
    <>
      {bankData.map((account) =>
        account.name_bank !== '' && account.bankname !== '' && account.owner_earning_account_no !== '' ? (
          <div key={account.shipping_address_id}>
            <div className="border max-w-screen-xl p-4 my-2">
              <div className="mx-3 text-[16px] text-[#52525B] flex gap-x-36">
                <div className="text-[12px] text-[#94949B] font-bold">Name
                <p className="font-bold text-[16px] text-[#52525B] mt-3">{account.name_bank}</p>
                </div>
                <div className="text-[12px] text-[#94949B] font-bold">Bank Name
                <p className="text-[16px] text-[#52525B] mt-3">{account.bankname}</p>
                </div>
                <div className="text-[12px] text-[#94949B] font-bold">Account Number
                <p className="text-[16px] text-[#52525B] mt-3">*************{account.owner_earning_account_no.slice(-3)}</p>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className="justify-center rounded-md border border-[#48466D] bg-white px-6 py-2 text-sm font-medium text-[#48466D] hover:bg-[#605d91] hover:text-white transition duration-300; mr-2"
                  onClick={() => handleEdit(account)}
                >
                  Edit
                </button>
                <button
                  className="justify-center rounded-md border bg-[#48466D] px-5 py-[7.5px] text-sm font-medium text-white hover:bg-[#605d91] transition duration-300"
                  onClick={() => handleDelete(account)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ) : null
      )}
    </>
  )}
</div>
  
      {showForm && (
        <div className="fixed z-15 inset-0 overflow-y-auto mt-[60px]">
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
                  Add /Edit Address
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
                          htmlFor="addressDesc"
                        >
                          Bank Name
                        </label>
                        <select
                          className="border rounded-lg w-[200px] py-2 px-3 text-[#48466D] leading-tight focus:outline-none focus:shadow-outline"
                          value={bankname}
                          onChange={(e) => setBankname(e.target.value)}
                        >
                          <option value="">--Bank Name--</option>
                          <option value="SCB">SCB</option>
                          <option value="Kasikornbank">Kasikornbank</option>
                          <option value="Bangkok Bank">Bangkok Bank</option>
                          <option value="Krung Thai Bank">
                            Krung Thai Bank
                          </option>
                          <option value="TMB Bank">TMB Bank</option>
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
                          onChange={(e) => {
                            if (e.target.value.length <= 16) {
                              setAccountNumber(e.target.value);
                            }
                          }}
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
