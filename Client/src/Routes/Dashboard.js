import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Components/Card";
import { config } from "../config";
import Topbar from "../Components/Topbar";
function Dashboard() {
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

  let doLogout = () => {
    localStorage.removeItem("login_credential");
    navigate("/");
  };

  return (
    <>
      <div class="container-fluid">
        <div class="row">
          <Topbar />
          <main class="col-lg-8 col-md-8 col-sm-6 mx-auto ">
            <div class="pt-3 pb-1 mb-2 border-bottom">
              <h1 class="text-center text-primary p-2  border border-primary bg-light mx-auto rounded">
                DASHBOARD
              </h1>
            </div>
            <div className="row">
              <Card info={data1} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Dashboard;