import { useState , useEffect} from "react";
import axios from "axios";

interface Profile {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    gender: string;
    dateOfBirth: string;
}


const MyProfile = () => {
    const [showForm, setShowForm] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [profiles, setAccounts] = useState<Profile[]>([]);

    const [profile, setCustomerData] = useState({
        customer_firstname: "",
        customer_lastname: "",
        customer_email: "",
        customer_id: "",
        customer_gender:"",

      });
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.post(
              "http://localhost:3001/get_user_customer",
              null,
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("access_token"),
                  "Access-Control-Allow-Origin": "*",
                },
              }
            );
            setCustomerData(response.data);
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, [localStorage.getItem("access_token")]);
    




    const handleEditProfile = () => {
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
        setGender("");
        setDateOfBirth("");
    };

    const handleSave = async () => {
        if (!firstName || !lastName || !email || !phoneNumber || !gender || !dateOfBirth) {
          alert("Please fill in all the information.");
          return;
        }
      
        try {
          const accountData = {
            firstName,
            lastName,
            email,
            phoneNumber,
            gender,
            dateOfBirth,
          };
      
          const headers = {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            'Access-Control-Allow-Origin': '*',
          };
      
          const response = await axios.post('http://localhost:3001/editProfile', accountData, { headers });
          const newAccount = response.data; // Assuming the API returns the newly added account
          setAccounts(prevAccounts => [...prevAccounts, newAccount]);
          alert('Account added successfully.');
      
          window.location.reload();
          handleCancel();
        } catch (error) {
          console.error(error);
          alert('An error occurred while saving the account.');
        }
      };



    const handleEdit = (profile: Profile) => {
        setShowForm(true);
        setFirstName(profile.firstName);
        setLastName(profile.lastName);
        setEmail(profile.email);
        setPhoneNumber(profile.phoneNumber);
        setGender(profile.gender)
        setDateOfBirth(profile.dateOfBirth);

    };

    const handleDelete = (id: number) => {
        const filteredaccounts = profiles.filter((account) => account.id !== id);
        setAccounts(filteredaccounts);
    };

    return (
        <div className="container py-4 ml-[80px] mt-[90px]">
            {" "}
            <div className="text-[24px] font-simibold text-[#48466D] not-italic font-medium md:font-medium mb-4 font-poppins ">
                {" "}
                Profile
            </div>
                <div>
                    {profile.customer_id && (
                            <div key={profile.customer_id}>
                                <div className="border max-w-screen-xl p-4 my-2">
                                    <div className="mx-3 text-[16px] text-[#52525B] grid grid-cols-2 ">
                                        <div className="col-start-1 col-end-2 flex flex-col gap-6 items-end mr-10 font-poppins">
                                            <div className=" text-[16px] text-[#94949B] font-bold "> First Name</div>
                                            <div className=" text-[16px] text-[#94949B] font-bold"> Last Name</div>
                                            <div className=" text-[16px] text-[#94949B] font-bold"> Email</div>
                                            <div className=" text-[16px] text-[#94949B] font-bold"> Gender</div>
                                           
                                        </div>
                                        <div className="col-start-2 col-end-3 flex flex-col gap-6 font-poppins">
                                            <p className=" text-[16px] text-[#52525B]"> {profile.customer_firstname} </p>
                                            <p className=" text-[16px] text-[#52525B]">{profile.customer_lastname}</p>
                                            <p className=" text-[16px] text-[#52525B]">{profile.customer_email}</p>
                                            <p className=" text-[16px] text-[#52525B]">{profile.customer_gender}</p>
                                     
                                        </div>
                                    </div>
                                    <div className="flex justify-center mt-4">
                                        <button
                                            className=" justify-center rounded-md border bg-[#48466D] px-5 py-[7.5px] text-sm font-medium text-white hover:bg-[#605d91] transition duration-300"
                                            onClick={() =>
                                                handleEdit({
                                                  id: 0, // Set the appropriate ID value here
                                                  firstName: profile.customer_firstname,
                                                  lastName: profile.customer_lastname,
                                                  email: profile.customer_email,
                                                  phoneNumber: "", // Set the appropriate phone number value here
                                                  gender: profile.customer_gender,
                                                  dateOfBirth: '',
                                                })
                                              }
                                        >
                                            Edit
                                        </button>
                                    </div>

                                </div>
                            </div>
                        )}
                </div>
            
            {showForm && (
                <div className="fixed z-15 inset-0  mt-[50px] ">
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
                                    Edit Profile
                                </div>
                                <div className="sm:flex sm:items-start mx-4 mt-2">
                                    <div className=" justify-items-center ">
                                        <form>
                                            <div className="mb-4 ">
                                                <label
                                                    className="block  font-simibold text-[#48466D] not-italic font-bold mb-2 "
                                                    htmlFor="firstName"
                                                >
                                                    First Name
                                                </label>
                                                <input
                                                    className="border rounded-lg w-[430px] py-2 px-3 text-[#48466D] leading-tight focus:outline-none focus:shadow-outline"
                                                    type="text"
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    id="firstName"
                                                    placeholder="firstName"
                                                />
                                            </div>
                                            <div className="mb-4 ">
                                                <label
                                                    className="block  font-simibold text-[#48466D] not-italic font-bold mb-2 "
                                                    htmlFor="lastName"
                                                >
                                                    Last Name
                                                </label>
                                                <input
                                                    className="border rounded-lg w-[430px] py-2 px-3 text-[#48466D] leading-tight focus:outline-none focus:shadow-outline"
                                                    type="text"
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    id="lastName"
                                                    placeholder="lastName"
                                                />
                                            </div>
                                            <div className="mb-4 ">
                                                <label
                                                    className="block  font-simibold text-[#48466D] not-italic font-bold mb-2 "
                                                    htmlFor="email"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    className="border rounded-lg w-[430px] py-2 px-3 text-[#48466D] leading-tight focus:outline-none focus:shadow-outline"
                                                    type="text"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    id="email"
                                                    placeholder="email"
                                                />
                                            </div>
                                            <div className="mb-4 ">
                                                <label
                                                    className="block  font-simibold text-[#48466D] not-italic font-bold mb-2 "
                                                    htmlFor="phoneNumber"
                                                >
                                                    Phone Number
                                                </label>
                                                <input
                                                    className="border rounded-lg w-[430px] py-2 px-3 text-[#48466D] leading-tight focus:outline-none focus:shadow-outline"
                                                    type="text"
                                                    value={phoneNumber}
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                    maxLength={10}
                                                    id="phoneNumber"
                        
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label
                                                    className="block text-[#48466D] font-bold mb-2 "
                                                    htmlFor="gender"
                                                >
                                                    Gender
                                                </label>
                                                <select
                                                    className="border rounded-lg w-[200px] py-2 px-3 text-[#48466D] leading-tight focus:outline-none focus:shadow-outline"
                                                    value={gender}
                                                    onChange={(e) => setGender(e.target.value)}
                                                >
                                                    <option value="">--Gender--</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Non-binary">Non-binary</option>
                                                </select>
                                            </div>
                                            <div className="mb-4">
                                                <label
                                                    className="block text-[#48466D] font-bold mb-2"
                                                    htmlFor="dateOfBirth"
                                                >
                                                    Date of Birth
                                                </label>
                                                <input
                                                    type="date"
                                                    className="border rounded-lg py-2 px-3 text-[#48466D] leading-tight focus:outline-none focus:shadow-outline"
                                                    value={dateOfBirth}
                                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                                    id="dateOfBirth"
                                                    placeholder="date"
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
export default MyProfile;
