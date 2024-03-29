import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export default function Home() {
  const headers = {
    'app-id': '64fc4a747b1786417e354f31',
    'Content-Type': 'application/json',
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getDataUserFromApi();
  }, []); // Fetch data only once when the component mounts

  async function getDataUserFromApi() {
    try {
      let response = await Axios.get('https://dummyapi.io/data/v1/user', { headers: headers });
      setSearchResults(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function searchByName() {
    return searchResults.filter(user =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <header className='vh-100 d-flex justify-content-center align-items-center text-white'>
        <div className="container mx-2 bg-transparent">
          <div className="row">
            <div className="col-md-10 m-auto offset-2">
              <input className='form-control my-3' placeholder='Search By name' type="text" value={searchQuery} onChange={handleInputChange} />
            </div>
            <div className='text-end'>
              <button className='btn btn-info my-3 me-4 rounded-4 '> <i className="fa-solid fa-plus"></i> Add New Contact </button>
            </div>
            {searchByName().map(user => (
              <div key={user.id} className="col-md-4 d-flex justify-content-center align-items-center my-3 ">
                <img className='mx-4' src={user.picture}  />
                <div className='mt-3'>
                  <p>{user.firstName} {user.lastName}</p>
                  <p className=' bg-red'>{user.phoneNumber}</p>
                </div>
              </div>
            ))}
            <div className="line my-4 col-9 m-auto "></div>
          </div>
        </div>
      </header>
    </div>
  )
}



    
//     <div>
//       <header className=' vh-100 d-flex justify-content-center align-items-center text-white' >
//         <div className="container mx-2 bg-transparent">
//           <div className="row">
//             <div className="col-md-10 m-auto offset-2">
//               <input onChange={handleInputChange}  className=' form-control my-3 ' placeholder=' Search By name' type="text" value={searchQuery} />
//             </div>
//             <div className=' text-end'>
//               <button className=' btn btn-info my-3 me-4 rounded-4 '> <i className="fa-solid fa-plus"></i> Add New Contact </button>
//             </div>
//             <div className="col-md-4 d-flex justify-content-center align-items-center my-3 ">
//               <img className=' mx-4' src={} alt="" />
//               <div className=' mt-3'>
//                 <p>amira</p>
//                 <p>015678987654</p>
//               </div>
//             </div>
//             <div className="col-md-4  offset-md-4  my-3 d-flex justify-content-evenly  align-items-center">
//               <div className='edit_icon'>
//                 <i className="fa-solid fa-pen-to-square mx-3"></i>
//               </div>
//               <div className='delete_icon'>
//                 <i className="fa-regular fa-trash-can mx-3"></i>
//               </div>
//             </div>
//             <div className="line my-4 col-9 m-auto "></div>

//           </div>
//         </div>
//       </header>
//     </div>
//   )
// }

