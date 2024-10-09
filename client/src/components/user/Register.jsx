// import React from "react";
// import { useState } from "react";
// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const onChangeHandler = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };
//   const onSubmitHandler = (e) => {
//     e.preventDefault();
//     alert("Form has been submitted!");
//     console.log(formData);
//   };
//   return (
//     <>
//       <div
//         className="container my-5 p-4"
//         style={{
//           width: "600px",
//           border: "2px solid yellow",
//           borderRadius: "10px",
//         }}
//       >
//         <h1 className="text-center">User Register</h1>
//         <form className="my-3" onSubmit={onSubmitHandler}>
//           <div className="mb-3">
//             <label htmlFor="exampleInputEmail1" className="form-label">
//               Name
//             </label>
//             <input
//               type="text"
//               value={formData.name}
//               onChange={onChangeHandler}
//               className="form-control"
//               id="exampleInputName1"
//               aria-describedby="emailHelp"
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="exampleInputEmail1" className="form-label">
//               Email address
//             </label>
//             <input
//               type="email"
//               value={formData.email}
//               onChange={onChangeHandler}
//               className="form-control"
//               id="exampleInputEmail1"
//               aria-describedby="emailHelp"
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="exampleInputPassword1" className="form-label">
//               Password
//             </label>
//             <input
//               type="password"
//               value={formData.password}
//               onChange={onChangeHandler}
//               className="form-control"
//               id="exampleInputPassword1"
//             />
//           </div>
//           <div className="mb-3 form-check">
//             <input
//               type="checkbox"
//               className="form-check-input"
//               id="exampleCheck1"
//             />
//           </div>
//           <div className="d-grid col-6 mx-auto my-3">
//             <button type="submit" className="btn btn-primary">
//               Register
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Register;
import React, { useContext } from "react";
import { useState } from "react";
import AppContext from "../../context/AppContext";
// import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useContext(AppContext);
  // const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChangerHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const { name, email, password } = formData;
  const submitHandler = async (e) => {
    e.preventDefault();
    alert("Your form has been submited");

    await register(name, email, password);

    //  if(result.success){
    //   navigate('/login')
    //  }

    console.log(formData);
  };
  return (
    <>
      <div
        className="container my-5 p-4"
        style={{
          width: "600px",
          border: "2px solid yellow",
          borderRadius: "10px",
        }}
      >
        <h1 className="text-center">User Register</h1>
        <form onSubmit={submitHandler} className="my-3">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={onChangerHandler}
              type="text"
              className="form-control"
              id="exampleInputEmail13"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={onChangerHandler}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              name="password"
              value={formData.password}
              onChange={onChangerHandler}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="d-grid col-6 mx-auto my-3">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
