// import React, { useContext } from "react";
// import AppContext from "../../context/AppContext";
// import { Link } from "react-router-dom";
// const ShowProduct = () => {
//   const { products, filteredData, addToCart } = useContext(AppContext);
//   return (
//     <>
//       <div className="container flex justify-content-center align-items-center">
//         <div className="row  container d-flex justify-content-center align-items-center my-5">
//           {filteredData.map((product) => (
//             <div
//               key={product._id}
//               className=" my-3 col-md-4 d-flex justify-content-center align-items-center"
//             >
//               <div
//                 className="card bg-dark text-light text-center"
//                 style={{ width: "18rem" }}
//               >
//                 <Link
//                   to={`/product/${product._id}`}
//                   className="d-flex justify-content-center align-items-center p-3"
//                 >
//                   <img
//                     src={product.imgSrc}
//                     className="card-img-top"
//                     alt="..."
//                     style={{
//                       width: "200px",
//                       height: "200px",
//                       borderRadius: "10px",
//                       border: "2px solid yellow",
//                     }}
//                   />
//                 </Link>

//                 <div className="card-body">
//                   <h5 className="card-title">{product.title}</h5>
//                   <div className="my-3 d-flex">
//                     <button href="#" className="btn btn-primary mx-2">
//                       Rs. {product.price}
//                     </button>
//                     <button
//                       href="#"
//                       className="btn btn-warning mx-2"
//                       onClick={() =>
//                         addToCart(
//                           product._id,
//                           product.title,
//                           product.price,
//                           1,
//                           product.imgSrc
//                         )
//                       }
//                     >
//                       Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ShowProduct;
import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";

const ShowProduct = () => {
  const { products, filteredData, addToCart } = useContext(AppContext);

  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center">
          {filteredData.map((product) => (
            <div
              key={product._id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 my-3 d-flex justify-content-center"
            >
              <div
                className="card bg-dark text-light text-center"
                style={{ width: "18rem" }}
              >
                {/* Product Link */}
                <Link
                  to={`/product/${product._id}`}
                  className="d-flex justify-content-center align-items-center p-3"
                >
                  <img
                    src={product.imgSrc}
                    className="card-img-top"
                    alt={product.title}
                    style={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "10px",
                      border: "2px solid yellow",
                    }}
                  />
                </Link>

                {/* Card Body */}
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <div className="my-3 d-flex justify-content-around">
                    <button className="btn btn-primary">
                      Rs. {product.price}
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() =>
                        addToCart(
                          product._id,
                          product.title,
                          product.price,
                          1,
                          product.imgSrc
                        )
                      }
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShowProduct;
