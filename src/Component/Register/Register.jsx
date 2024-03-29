import { useRef, useState } from 'react';
import Axios from 'axios';
import {useNavigate} from "react-router-dom"
const headers = {
  'app-id': '64fc4a747b1786417e354f31',
  'Content-Type': 'application/json',
};
export default function Register() {
  const inputRef = useRef(null);
  let navigate = useNavigate()
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    picture: null,
  });
  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setUser((prevUser) => ({
      ...prevUser,
      picture: URL.createObjectURL(file),
    }));
  };

  async function sendDataToApi() {
    try {
      const { data } = await Axios.post('https://dummyapi.io/data/v1/user/create', JSON.stringify(user), {
        headers: headers,
      });
     
        navigate('/home')
      
      console.log(data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }
  const submitRegister = (e) => {
    e.preventDefault();
    sendDataToApi();
  };

  const getDataUser = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <>
      <header className='vh-100 d-flex justify-content-center align-items-center'>
        <div className="container bg-white">
          <div className="row">
            <div className="col-md-12">
              <div className='my-4'>
                <form onSubmit={submitRegister}>
                  <div onClick={handleImageClick}>
                    {user.picture ? <img className='img-register' src={user.picture} alt="" /> : <img className='img-register' src="./images.png" alt="" />}
                    <input onChange={handleImageChange} className='d-none' type="file" ref={inputRef} />
                  </div>

                  <h5 className='my-4'>Upload Photo</h5>
                  <div className="row">
                    <div className="col-md-6 my-4">
                      <input onChange={getDataUser} className='form-control' type="text" name='firstName' placeholder='First Name' />
                    </div>
                    <div className="col-md-6 my-4">
                      <input onChange={getDataUser} className='form-control' type="text" name='lastName' placeholder='Last Name' />
                    </div>
                    <div className="col-md-6 my-4">
                      <input onChange={getDataUser} className='form-control' type="text" name='phoneNumber' placeholder='Phone Number' />
                    </div>
                    <div className="col-md-6 my-4">
                      <input onChange={getDataUser} className='form-control' type="text" name='email' placeholder='Email' />
                    </div>
                    <div className="col-md-2 my-3 rounded-circle ">
                      <button className='btn btn-cancel px-5' type="button"> Cancel </button>
                    </div>
                    <div className="col-md-2 offset-md-8 my-3 rounded-pill">
                      <button className='btn btn-save px-5' type="submit"> Save </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}