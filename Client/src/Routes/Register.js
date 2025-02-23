import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { config } from "../config";
import Loading from "../Components/Loading";

function Register() {
  let navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  let formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      active: false,
      URLs: [],
    },
    validate: (values) => {
      const errors = {};
      if (!values. username) {
        errors.username = "Please enter the name";
      } else if (values.username.length > 15) {
        errors.username = "must be 15 characters or less";
      }
      if (!values.email) {
        errors.email = "Please enter the email id";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Please enter the password";
      } else if (values.password.length < 8) {
        errors.password = "must be 8 characters";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const register = await axios.post(`${config.api}/register`, values);
        alert(register.data.message);
        navigate("/");
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="container login ">
      <span className="row d-flex align-content-center justify-content-center ">
        <span className="col-lg-4 col-md-6 col-sm-9 pt-5 ">
          <div className="card o-hidden border-0 shadow-lg  mt-3  bg-transparent pt-5 d-flex align-content-center">
            <div className="card-body p-2">
              <div className="row">
                <div className="col-lg-9 mx-auto">
                  <div className="p-0">
                    <div className="  text-center pb-4">
                      <h4 className="p-2 bg-primary border-light text-light rounded">
                       Welcome to Register Page
                      </h4>
                    </div>
                    {isLoading? <Loading/>:""}
                    <form className="user" onSubmit={formik.handleSubmit}>
                      <div className="form-group pb-3">
                        <input
                          className={`form-control form-control-user ${
                            formik.touched.username && formik.errors.username
                              ? "error-box"
                              : ""
                          } ${
                            formik.touched.username && !formik.errors.username
                              ? "success-box"
                              : null
                          }`}
                          id="username"
                          type={"text"}
                          value={formik.values.username}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          name="username"
                          placeholder="Enter username"
                        />
                        {formik.touched.username && formik.errors.username ? (
                        <span style={{ color: "red" }}>
                          {formik.errors.username}
                        </span>
                      ) : null}
                      </div>
                      <div className="form-group pb-3">
                        <input
                          type="email"
                          className={`form-control form-control-user ${
                            formik.touched.email && formik.errors.email
                              ? "error-box"
                              : ""
                          } ${
                            formik.touched.email && !formik.errors.email
                              ? "success-box"
                              : null
                          }`}
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          name="email"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email}
                          placeholder="Enter Your Email..."
                        />
                        <div id="emailHelp" class="form-text">
                          We'll never share your email with anyone else.
                        </div>
                        {formik.touched.email && formik.errors.email ? (
                      <span style={{ color: "red" }}>
                        {formik.errors.email}
                      </span>
                    ) : null}
                      </div>
                      <div className="form-group pb-4">
                        <input
                           className={`form-control form-control-user ${
                            formik.touched.password && formik.errors.password
                              ? "error-box"
                              : ""
                          } ${
                            formik.touched.password && !formik.errors.password
                              ? "success-box"
                              : null
                          }`}
                          id="exampleInputPassword"
                          type={"password"}
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="Password"
                          name="password"
                        />
                         {formik.touched.password && formik.errors.password ? (
                        <span style={{ color: "red" }}>
                          {formik.errors.password}
                        </span>
                      ) : null}
                      </div>

                      <button
                        type="submit"
                        className="btn btn-outline-dark container fw-bold myname"
                      >
                        REGISTER
                      </button>
                    </form>

                    <div className="text-center fw-bold mt-2 pt-2 pb-4">
                      <p>
                        Already have an Account ?<Link to={"/"}> Login</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </span>
      </span>
    </div>
  );
}

export default Register;