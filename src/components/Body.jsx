import { IoMdAddCircle } from "react-icons/io";
import { FaCircleMinus } from "react-icons/fa6";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { CiShoppingTag } from "react-icons/ci";
import { HiWallet } from "react-icons/hi2";
import { FaArrowRight } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import { IoIosWallet } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { MdAccountBalanceWallet } from "react-icons/md";

function Body() {
  const [tabs, setTabs] = useState("expense");
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState("");
  const [date, setDate] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [salary, setSalary] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const handleChangeTab = (tabsNmame) => {
    setTabs(tabsName);
  };

  const addExpense = async () => {
    const expenseTrack = {
      expenseName: title,
      amount: Number(cost),
      date: date,
    };

    try {
      const res = await fetch("http://localhost:4000/tracker/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseTrack),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log("Error:", data);
        return;
      }

      console.log("Created expense:", data);

      // setExpenses((prev) => [...prev, data]);
      await getExpenses();

      setTitle("");
      setCost("");
      setDate("");
    } catch (error) {
      console.log("Expense add error:", error);
    }
  };
  const getExpenses = async () => {
    try {
      const res = await fetch("http://localhost:4000/expense/get");

      const data = await res.json();

      console.log(data);

      setExpenses(data);
    } catch (error) {
      console.log("Expense get error:", error);
    }
  };
  useEffect(() => {
    getExpenses();
  }, []);

  const addSalary = async () => {
    const salaryTrack = {
      salaryAmount: Number(cost),
      date: date,
    };
    try {
      const res = await fetch("http://localhost:4000/salary/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(salaryTrack),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log("Error:", data);
        return;
      }

      console.log("Created salary:", data);

      // setSalary((prev) => [...prev, data]);
      await getSalary();

      setTitle("");
      setCost("");
      setDate("");
    } catch (error) {
      console.log("salary add error:", error);
    }
  };
  const getSalary = async () => {
    const res = await fetch("http://localhost:4000/salary/get");

    const data = await res.json();

    console.log(data);

    setSalary(data);
  };
  useEffect(() => {
    getSalary();
  }, []);

  const deleteExpense = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/expense/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        console.log("Delete error:", data);
        return;
      }
      console.log("Delete:", data);
      await getExpenses();
    } catch (error) {
      console.log("Expense delete error:", error);
    }
  };

  const totalSalary = salary.reduce(
    (total, item) => total + Number(item.salaryAmount || 0),
    0,
  );

  const totalExpense = expenses.reduce(
    (total, item) => total + Number(item.amount || 0),
    0,
  );

  const remainingBalance = totalSalary - totalExpense;

  const displayedExpenses = showAll ? expenses : expenses.slice(0, 3);
  // const transactions = [
  //   {
  //     id: 1,
  //     name: "Salary",
  //     category: "Income",
  //     date: "10 Oct 2025",
  //     amount: 50000,
  //     type: "income",
  //     bin: <RiDeleteBin6Line />,
  //   },
  //   {
  //     id: 2,
  //     name: "Grouceries",
  //     category: "Food",
  //     date: "09 Oct 2025",
  //     amount: 3500,
  //     type: "expense",
  //     bin: <RiDeleteBin6Line />,
  //   },
  //   {
  //     id: 3,
  //     name: "Electricity Bill",
  //     category: "Utilities",
  //     date: "07 Oct 2025",
  //     amount: 2000,
  //     type: "expense",
  //     bin: <RiDeleteBin6Line />,
  //   },
  //   {
  //     id: 4,
  //     name: "Travel",
  //     category: "Transport",
  //     date: "05 Oct 2025",
  //     amount: 2500,
  //     type: "expense",
  //     bin: <RiDeleteBin6Line />,
  //   },
  // ];
  // };

  return (
    <div className="bg-gray-100 py-5">
      <div className="text-2xl ml-20 mt-10 font-bold gap-2 flex">
        <IoIosWallet className="text-green-600" />
        <h1 className="">
          Expense <span className="text-green-600">Tracker</span>{" "}
        </h1>
      </div>
      <p className="text-l text-gray-500 ml-25">
        Track your money, Built your future.
      </p>
      <CiSettings className="absolute top-10 right-22 text-2xl font-bold" />
      <div className="flex gap-20 mt-8 justify-center">
        <div className="flex gap-2 text-green-600 border-0 rounded-xl w-100 h-30 items-center pl-8 bg-green-300">
          <FaArrowAltCircleDown className="text-4xl " />
          <div className="">
            <h2>Total Salary</h2>

            <h1 className="text-xl font-bold">₹{totalSalary}</h1>
          </div>
        </div>
        <div className="flex gap-2 text-red-600 border-0 rounded-xl w-100 h-30 items-center pl-8 bg-red-300">
          <FaMinusCircle className="text-4xl " />
          <div>
            <h2>Total Expenses</h2>
            <h1 className="text-xl font-bold">₹{totalExpense}</h1>
          </div>
        </div>
        <div className="flex gap-2  border-0 rounded-xl w-100 h-30 items-center pl-8 bg-blue-300">
          <MdAccountBalanceWallet className="text-4xl text-blue-600" />
          <div className="text-black">
            <h2>Remaining Balance</h2>
            <h1 className="text-xl font-bold">₹{remainingBalance}</h1>
          </div>
        </div>
      </div>

      <div className="flex m-10 gap-5 justify-center  ">
        <button
          onClick={() => handleChangeTab("salary")}
          className={`flex text-2xl items-center justify-center border border-gray-300 rounded-xl  h-15 w-170 ${tabs == "salary" ? "bg-green-600 text-white" : "bg-white text-black"}   `}
        >
          <IoMdAddCircle /> Add Salary
        </button>
        <button
          onClick={() => handleChangeTab("expense")}
          className={`flex text-2xl items-center justify-center border border-gray-300 rounded-xl  h-15 w-170  ${tabs == "expense" ? "bg-red-300 text-red-600" : "bg-white text-black"}`}
        >
          <FaCircleMinus /> Add Expense
        </button>
      </div>

      <div>
        {tabs == "salary" ? (
          <div className="border-2 p-5 rounded-2xl border-gray-200 mx-20 ">
            <div className="flex gap-5 justify-center">
              <div>
                <label className="font-semibold text-gray-700">
                  Salary Amount
                </label>
                <div className="flex border items-center gap-4 border-gray-300 rounded-xl bg-white py-4 px-4 w-150">
                  <span className="text-2xl font-semibold text-gray-700">
                    ₹
                  </span>
                  <input
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    type="number"
                    placeholder="Enter salary amount"
                    className="w-full outline-none bg-transparent text-lg text-gray-700 placeholder:text-gray-400"
                  />
                </div>
              </div>
              <div>
                <label className="font-semibold text-gray-700">Date</label>
                <div className="flex border items-center gap-4 rounded-xl border-gray-300 bg-white py-4 px-4 w-150">
                  <span className="text-2xl font-semibold text-gray-700">
                    <SlCalender />
                  </span>
                  <input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    type="date"
                    placeholder="Select Date"
                    className="w-full outline-none bg-transparent text-lg text-gray-700 placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={addSalary}
              className="flex text-2xl items-center justify-center border-0 rounded-xl mt-5 ml-18 text-white h-15 w-300 bg-green-600"
            >
              <IoMdAddCircle /> Add Salary
            </button>
          </div>
        ) : (
          <div className="border-2 p-5 rounded-2xl border-gray-200 mx-20">
            <div className="flex gap-5 justify-center">
              <div>
                <label className="font-semibold text-gray-700">
                  Expense Name
                </label>
                <div className="flex border items-center gap-4 border-gray-300 rounded-xl bg-white py-4 px-4 w-100">
                  <span className="text-2xl font-semibold text-gray-700">
                    <CiShoppingTag />
                  </span>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Food, Travel, Rent"
                    className="w-full outline-none bg-transparent text-lg text-gray-700 placeholder:text-gray-400"
                  />
                </div>
              </div>
              <div>
                <label className="font-semibold text-gray-700">Amount</label>
                <div className="flex border items-center gap-4 border-gray-300 rounded-xl bg-white py-4 px-4 w-100">
                  <span className="text-2xl font-semibold text-gray-700">
                    ₹
                  </span>
                  <input
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    type="number"
                    placeholder="Enter amount"
                    className="w-full outline-none bg-transparent text-lg text-gray-700 placeholder:text-gray-400"
                  />
                </div>
              </div>
              <div>
                <label className="font-semibold text-gray-700">Date</label>
                <div className="flex border items-center gap-4 border-gray-300 rounded-xl bg-white py-4 px-4 w-100">
                  <span className="text-2xl font-semibold text-gray-700">
                    <SlCalender />
                  </span>
                  <input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    type="date"
                    placeholder="Select date "
                    className="w-full outline-none bg-transparent text-lg text-gray-700 placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <div>
                <label className="font-semibold text-gray-700">
                  {/* Category (optional) */}
                </label>
                {/* <div className="flex border items-center gap-4 border-gray-300 rounded-xl bg-white py-4 px-4 w-145">
                  <span className="text-2xl font-semibold text-gray-700">
                    <SlCalender />
                  </span>
                  <input
                    type="number"
                    placeholder="Select date"
                    className="w-full outline-none bg-transparent text-lg text-gray-700 placeholder:text-gray-400"
                  />
                </div> */}
              </div>
              <button
                onClick={addExpense}
                className="flex text-2xl gap-4 items-center justify-center border-0 rounded-xl mt-5  text-white h-15 w-300 bg-red-600"
              >
                <HiWallet />
                Add Expense
              </button>
            </div>
          </div>
        )}
      </div>
      <div>
        <div>
          <div className="flex justify-between items-center mx-10 mb-5">
            <h2 className="text-2xl font-bold">Recent Transactions</h2>

            {expenses.length > 3 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="flex items-center gap-2 text-gray-600 hover:text-black cursor-pointer"
              >
                {showAll ? "Show Less" : "View All"}

                <FaArrowRight
                  className={`transition-transform ${
                    showAll ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}
          </div>

          {expenses.length === 0 ? (
            <p className="text-center text-gray-500 py-5">
              No expenses added yet
            </p>
          ) : (
            <div>
              {displayedExpenses.map((item) => (
                <div key={item._id}>
                  <div className="flex py-3 px-5 bg-white mx-10 items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold">{item.expenseName}</h3>

                      <p className="text-gray-500">Expense</p>
                    </div>

                    <p className="text-gray-500">{item.date}</p>

                    <p className="text-lg font-bold text-red-500">
                      - ₹{item.amount}
                    </p>

                    <button
                      onClick={() => deleteExpense(item._id)}
                      className="text-red-500 text-xl hover:text-red-700 cursor-pointer"
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* {expenses.length === 0 ? (
      <p className="text-center text-gray-500">
        No expenses added yet
      </p>
    ) : ( */}

        {/* {salary.map((item) => (
          <div key={item._id}>
            <div className="flex border-0 py-3 px-5 bg-white mx-10 gap-50 items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">Salary</h3>

                <p className="text-gray-500">Income</p>
              </div>

              <p className="text-gray-500">{item.date}</p>

              <p className="text-lg font-bold text-green-600">
                + ₹{item.salaryAmount}
              </p>

              <p>
                <RiDeleteBin6Line />
              </p>
            </div>
          </div>
        ))} */}

        {/* <div className="">
          {displayedExpenses.map((item) => (
            <div className="" key={item._id}>
              <div className="flex border-0 py-3 px-5 bg-white mx-10 gap-50 items-center justify-between ">
                <div>
                  <h3 className="text-lg font-bold">{item.expenseName}</h3>
                  <p className="text-gray-500">Expense</p>
                </div>
                <p className="text-gray-500">{item.date}</p>
                <p className="text-lg font-bold text-blue-400">
                  ₹{item.amount}
                </p>
                <button
                  onClick={() => deleteExpense(item._id)}
                  className="text-red-500 text-xl hover:text-red-700 cursor-pointer"
                >
                  {" "}
                  <RiDeleteBin6Line />
                </button>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}

export default Body;
