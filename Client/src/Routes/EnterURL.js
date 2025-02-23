import { useNavigate } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { config } from "../config";
import axios from "axios";
import Topbar from "../Components/Topbar";

function EnterURL() {
  const [data1, setData] = useState([]);
  let getData = async () => {
    try {
      let res = await axios.get(`${config.api}/enterurl`, {
        headers: {
          Authorization: `${localStorage.getItem("login_credential")}`,
        },
      });
      setData(res.data);
      console.log(res.data);
      console.log(data1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      longURL: "",
      count: 0,
    },
    onSubmit: async (values) => {
      const data = await axios.post(`${config.api}/enterurl`, values, {
        headers: {
          Authorization: `${localStorage.getItem("login_credential")}`,
        },
      });
      alert(data.data.message);
      getData();
    },
  });
  let doLogout = () => {
    localStorage.removeItem("login_credential");
    navigate("/");
  };

  return (
    <>
      <div class="container-fluid">
        <div class="row">
          <Topbar />
          <main class="col-lg-8 col-md-6 col-sm-4 mx-auto ">
            <div class="pt-3 pb-2 mb-4 border-bottom">
              <h1 class="text-center text-primary p-1  border border-primary bg-light mx-auto rounded">
                Paste the URL to be shortened
              </h1>
            </div>
            <br/>
            <form onSubmit={formik.handleSubmit}>
              <div class="input-group mb-4">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter your Long URL"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  name="longURL"
                  onChange={formik.handleChange}
                  value={formik.values.longURL}
                />
                <button
                  class="btn btn-dark fw-bold"
                  type="submit"
                  id="button-addon2"
                >
                  CLICK ME
                </button>
              </div>
            </form>

            <div className="row ">
              {data1.map((item) => {
                return (
                  <div className="col-lg-4 col-md-6 col-sm-8">
                    <div class="card text-bg-light mb-3  m-5">
                      <div class="card-header">Click Count:{item.count}</div>
                      <div class="card-body">
                        <h5 class="card-title">
                          <a href={item.shortURL} target={"_blank"}>
                            {item.shortURL}
                          </a>
                        </h5>
                        <p class="card-text">{item.longURL}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default EnterURL;