'use client'

import Link from "next/link";
import { useState, useEffect } from "react";

function Page() {
  const [transition_Detail, setTransition_Detail] = useState([]);
  const [close, setClose] = useState(true);
  const [TransitionId, setTransitionId] = useState('');
  const [data, setData] = useState({ date: "", description: "", debt: "", credit: "", userId: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // Fetch all transition details
  const handelgetTransion = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/transitions`, {
        method: 'GET',
        credentials: 'include'
      });
      const result = await res.json();
      if (result.success) {
        setTransition_Detail(result.data);
       } else {
        console.error("Error fetching transition data");
      }
    } catch (error) {
      console.log("Failed to fetch data", error);
    }
  };

  // Edit transition detail
  const handelEdit = async () => {
     try {
       const res = await fetch(`http://localhost:3000/api/edit-transition/${TransitionId}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      let result = await res.json();
      if (result.success) {
        handelgetTransion();
        setClose(true);
       } else {
        console.log('Failed to update transition');
      }
    } catch (err) {
      console.log('Error occurred:', err.message);
    }
  };

  // Fetch individual transition details for editing
  const handelgetTransionDetail = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/transitions/${id}`, {
        method: 'GET',
        credentials: 'include'
      });
      const result = await res.json();
      if (result.success) {
        setData(result.data);
        console.log('object',result.data)
      } else {
        console.log('Failed to fetch transition details');
      }
    } catch (error) {
      console.log("Error fetching transition detail", error);
    }
  };


// delete transition
 const handelDeleteTransition=async(id)=>{
  try {
    const res = await fetch(`http://localhost:3000/api/transitions/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    const result = await res.json();
    if (result.success) {
      handelgetTransion();
     } else {
      console.log('Failed to fetch FAILD DELETE');
    }
  } catch (error) {
    console.log("Error fetching transition detail", error);
  }
}

let newArray_transition = [];

// Category-wise dataset
const handelCataory = (catagory) => {
  if (catagory === 'credit' && transition_Detail && Array.isArray(transition_Detail)) {
    // Check if the array is empty
    if (transition_Detail.length === 0) {
      console.log('transition_Detail is empty.');
      return;
    }

    // Create a new array to avoid modifying the original array
    newArray_transition = [...transition_Detail]; // Copy of the original array

    // Sort the copied array by credit amount in descending order (largest first)
    newArray_transition.sort((a, b) => {
      const creditA = parseFloat(a.credit);  
      const creditB = parseFloat(b.credit);  

      // Check for invalid credit values (e.g., NaN)
      if (isNaN(creditA) || isNaN(creditB)) {
        console.error('Invalid credit value found.');
        return 0; // Skip invalid entries
      }

      return creditB - creditA; // Sorting by credit amount in descending order
    });
  } else {
    console.error('Invalid category or transition_Detail is not a valid array.');
  }
};

console.log("Sorted by Credit Amount:", newArray_transition);


  useEffect(() => {
    handelgetTransion();
  }, []);

  return (
    <>
      {close ? (
         <div className="flex w-[95vw] flex-col">
          <div className="flex items-center justify-around pb-[4vh]">
            <a className="text-[4vw] text-shadow-blue-500 font-semibold pb-2">Transition History</a>
             <Link href={'/transition/add-Transition'} className="px-[28px] py-[10px] rounded-lg bg-blue-600 text-white font-semibold">Add Transition</Link>
 
          </div>
          

          {/* Table */}
          <div className="overflow-x-auto self-center">
            <table className="min-w-[80vw] divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sl</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Debt</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Update</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transition_Detail?.map((val, i) => (
                  <tr key={val._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{i}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{val.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{val.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{val.debt}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{val.credit}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      <div className="flex items-center flex-col">
                        <button
                          className="px-3 py-1 rounded-xl bg-blue-600 text-white text-[.7vw] my-[.5vh]"
                          onClick={() => { setClose(false);handelgetTransionDetail(val._id);setTransitionId(val._id)}}
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-1 rounded-xl bg-red-600 text-white text-[.7vw]"
                          onClick={() => { handelDeleteTransition(val._id)   }}
                          >
                          Delete
                           </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
  
        <div className="flex items-center flex-col mt-3">
          <span className="text-[3vw] text-blue-700 font-semibold">Edit Transition Detail</span>
          <div className="border-1px p-2 shadow-xl mt-2"> 
          <div className="py-2 flex justify-between w-[100%] px-2 rounded-[0.5vw]">
            <a></a>
  <span className="  text-[2.5rem] mb-2 self-end " onClick={()=>setClose(true)}>×</span>
</div>
          <form
            className="flex flex-col items-center justify-center w-[56vw]  gap-4 p-2  "
            onSubmit={handelEdit}
          >
            <input
              type="date"
              className="px-1 py-0.5 rounded-[0.3vw] border border-gray-400 w-full"
              placeholder="Enter date"
              value={data?.date}
              name="date" required
              onChange={handleChange}
            />
            <input
              type="text"
              className="px-1 py-0.5 rounded-[0.3vw] border border-gray-400 w-full"
              placeholder="description"
              value={data?.description} required
              name="description"
              onChange={handleChange}
            />
            <input
              type="number"
              className="px-1 py-0.5 rounded-[0.3vw] border border-gray-400 w-full"
              placeholder="Enter debt amount"
              value={data?.debt} required
              name="debt"
              onChange={handleChange}
            />
            <input
              type="number"
              className="px-1 py-0.5 rounded-[0.3vw] border border-gray-400 w-full"
              placeholder="Enter credit amount"
              value={data?.credit} required
              name="credit"
              onChange={handleChange}
            />
            <button
              type="submit"
              className="px-4 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
          </div>
        </div>
       )}
    </>
  );
}

export default Page;
