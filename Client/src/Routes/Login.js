import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";
import { config } from "../config";

function Login() {
  let navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  let formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values. username) {
        errors.username = "Please enter the name";
      }
      if (!values.password) {
        errors.password = "Please enter the password";
      } 
      return errors;
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const user = await axios.post(`${config.api}`, values);
        localStorage.setItem("login_credential", user.data.token);
        alert(user.data.message);

        if (user.data.message === "Successfully Logged In!!") {
          if (user.data.active === true) {
            navigate("/dashboard");
          } else {
            alert(
              "Your account is not activated. Please Activate your account"
            );
          }
        } else {
          alert("User not found");
        }
        setLoading(true);
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="container login ">
      <h1 className="text-center mt-4">Welcome to URL Shortener</h1>
      <span className="row d-flex align-content-center justify-content-center ">
        <span className="col-lg-4 col-md-6 col-sm-9  ">
          <div className="card o-hidden border-0 shadow-lg  mt-3  bg-transparent pt-5 d-flex align-content-center">
            <div className="card-body p-2">
              <div className="row">
                <div className="col-lg-9 mx-auto">
                  <div className="p-0">
                    <div className="  text-center pb-3">
                      <h4 className="p-2 bg-primary border-light text-light rounded">
                        Welcome To Login Page!
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
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="username"
                          placeholder="Enter username"
                        />
                        {formik.touched.username && formik.errors.username ? (
                        <span style={{ color: "red" }}>
                          {formik.errors.username}
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
                      <p className="form-label">
                        <Link to="/resetpassword" className="text">
                          {" "}
                          Forget Password?
                        </Link>
                      </p>

                      <button
                        type="submit"
                        className="btn btn-outline-dark container fw-bold myname"
                      >
                        LOGIN
                      </button>
                    </form>

                    <div className="text-center fw-bold mt-2 pt-2 pb-1">
                      <p>
                        Don't have an Account ?
                        <Link to={"/register"} className="text">
                          {" "}
                          Register
                        </Link>
                      </p>
                    </div>
                    <div className="p-2 bg-secondary border-light text-light rounded">
                   <h4 className="text-center">User_Credential</h4>
                   <hr/>
                  <h5 className="text-center">Username: user</h5>
                  <h5 className="text-center">Password: user1234</h5>
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

export default Login;