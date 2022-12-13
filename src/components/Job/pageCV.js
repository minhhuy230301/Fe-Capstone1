import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Error from "../Authen/Error";
import Hearder from "../Header/Header";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { json } from "react-router-dom";

function PageCV() {
  const [next, setNext] = useState(false);
  const [next2, setNext2] = useState(false);
  const [inputs, setInputs] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  let back = false;
  const handleInput = (e) => {
    let nameInput = e.target.name;
    let value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  };

  const renderNav = () => {
    let code;
    next ? (code = renderFile()) : (code = renderProfile());
    return <>{code}</>;
  };
  useEffect(() => {
    var dataUser = localStorage.getItem("user");
    dataUser = JSON.parse(dataUser);
    console.log(dataUser);
    setInputs(dataUser);
  }, []);
  const handleToggleClick = () => {
    setNext(next ? false : true);
  };
  const handleSubmit1 = (e) => {
    e.preventDefault();
    let errorSubmit = {};
    let flag = true;
    if (inputs.numberphone == "") {
      flag = false;
      errorSubmit.numberphone = "Empty phone number";
    }
    if (inputs.numberphone == undefined) {
      flag = false;
      errorSubmit.numberphone = "Empty phone number";
    }
    if (inputs.fullname == "") {
      flag = false;
      errorSubmit.fullname = "Empty fullname";
    }
    if (inputs.fullname == undefined) {
      flag = false;
      errorSubmit.fullname = "Empty fullname";
    }

    if (inputs.cvName == "") {
      flag = false;
      errorSubmit.cvName = "Empty CV name";
    }
    if (inputs.cvName == undefined) {
      flag = false;
      errorSubmit.cvName = "Empty Cv name";
    }
    if (inputs.address == "") {
      flag = false;
      errorSubmit.address = "Empty address";
    }
    if (inputs.address == undefined) {
      flag = false;
      errorSubmit.address = "Empty address";
    }
    if (inputs.dateBirth == "") {
      flag = false;
      errorSubmit.dateBirth = "Empty Date of Birth";
    }
    if (inputs.dateBirth == undefined) {
      flag = false;
      errorSubmit.dateBirth = "Empty Date of Birth";
    }
    if (inputs.gender == "") {
      flag = false;
      errorSubmit.gender = "Empty Gender";
    }
    if (inputs.gender == undefined) {
      flag = false;
      errorSubmit.gender = "Empty Gender";
    }

    if (!flag) {
      console.log(flag);
      setErrors(errorSubmit);
      console.log("er", errorSubmit);
      setNext(false);
      // setNext(true);
    } else {
      setErrors({});
      // setNext(true);
    }
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    let flag = true;
    let errorSubmit = {};

    if (inputs.academic == "") {
      flag = false;
      errorSubmit.academic = "Empty Academic";
    }
    if (inputs.academic == undefined) {
      flag = false;
      errorSubmit.academic = "Empty Academic";
    }
    if (inputs.certificate == "") {
      flag = false;
      errorSubmit.certificate = "Empty Certificate";
    }
    if (inputs.certificate == undefined) {
      flag = false;
      errorSubmit.certificate = "Empty Certificate";
    }
    if (inputs.experience == "") {
      flag = false;
      errorSubmit.experience = "Empty Experience";
    }
    if (inputs.experience == undefined) {
      flag = false;
      errorSubmit.experience = "Empty Experience";
    }
    if (inputs.career == "") {
      flag = false;
      errorSubmit.career = "Empty Career";
    }
    if (inputs.career == undefined) {
      flag = false;
      errorSubmit.career = "Empty Career";
    }
    if (!flag) {
      setErrors(errorSubmit);
      console.log(errorSubmit);
    } else {
      setErrors({});
      console.log(errors);
      // console.log(roleId);
      const data = {
        seeker_id: inputs.id,
        cv_name: inputs.cvName,
        address: inputs.address,
        birthday: inputs.dateBirth,
        gender: inputs.gender,
        education: inputs.academic,
        certication: inputs.certificate,
        experience: inputs.experience,
        skills: inputs.skills,
        career: inputs.career,
      };
      console.log(data);
      let url = "http://localhost:8085/api/save-cv-seeker";
      axios
        .post(url, data)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  // const handleToggleClick1 = (e) => {
  //   // if (errors) {
  //   setNext(next ? false : true);
  //   // }
  // };
  // const return1 = (e) => {
  //   console.log("bien", e);
  //   if (!e) {
  //     back = true;
  //     console.log("bakc", back);
  //   }
  // };
  const renderProfile = () => {
    return (
      <form action="#" className="form-CV" onSubmit={handleSubmit1}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label className="p-0" htmlFor="inputEmail4">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              placeholder="Email"
              readOnly
              name="email"
              value={inputs.email}
            />
            <p style={{ color: "red" }}>{errors.email}</p>
          </div>

          <div className="form-group col-md-6">
            <label className="p-0" htmlFor="inputCity">
              Phone number
            </label>
            <input
              onChange={handleInput}
              type="text"
              className="form-control"
              name="numberphone"
              value={inputs.numberphone}
            />
            <p style={{ color: "red" }}>{errors.numberphone}</p>
          </div>
        </div>
        <div className="form-group">
          <label className="p-0" htmlFor="inputCvName">
            CV Name
          </label>
          <input
            onChange={handleInput}
            type="text"
            className="form-control"
            name="cvName"
            placeholder="CV Name"
            value={inputs.cvName}
          />
          <p style={{ color: "red" }}>{errors.cvName}</p>
        </div>
        <div className="form-group">
          <label className="p-0" htmlFor="inputFullName">
            Full Name
          </label>
          <input
            onChange={handleInput}
            type="text"
            className="form-control"
            name="fullName"
            placeholder="Name...."
            value={inputs.fullname}
          />
          <p style={{ color: "red" }}>{errors.fullname}</p>
        </div>
        <div className="form-group">
          <label className="p-0" htmlFor="inputAddress">
            Address
          </label>
          <input
            onChange={handleInput}
            type="text"
            className="form-control"
            name="address"
            placeholder="Address"
            value={inputs.address}
          />
          <p style={{ color: "red" }}>{errors.address}</p>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label className="p-0" htmlFor="inputCity">
              Date of birth
            </label>
            <input
              onChange={handleInput}
              type="date"
              className="form-control"
              name="dateBirth"
              value={inputs.dateBirth}
            />
            <p style={{ color: "red" }}>{errors.dateBirth}</p>
          </div>
          <div className="form-group col-md-3">
            <label className="p-0" htmlFor="inputState">
              Sex
            </label>
            <select
              onChange={handleInput}
              name="gender"
              value={inputs.gender}
              className="form-control"
            >
              <option value="">Please select your gender</option>
              <option value={1}>Male</option>
              <option value={0}>Female</option>
            </select>
            <p style={{ color: "red" }}>{errors.gender}</p>
          </div>
        </div>
        {/* <Error errors={errors} /> */}
        <button
          type="button"
          onClick={errors ? () => setNext(false) : () => setNext(true)}
          className="btn btn-primary"
        >
          Next
        </button>
      </form>
    );
  };
  const renderFile = () => {
    return (
      <form onSubmit={handleSubmit2} action="#" className="form-CV">
        <div className="form-group">
          <label className="p-0" htmlFor="inputAcademic">
            Academic level
          </label>
          <input
            onChange={handleInput}
            type="text"
            className="form-control"
            name="academic"
            placeholder="Academic level...."
            value={inputs.academic}
          />
          <p style={{ color: "red" }}>{errors.academic}</p>
        </div>
        <div className="form-group">
          <label className="p-0" htmlFor="inputCertificate">
            Certificate
          </label>
          <input
            onChange={handleInput}
            type="text"
            className="form-control"
            name="certificate"
            placeholder="Certificate..."
            value={inputs.certificate}
          />
          <p style={{ color: "red" }}>{errors.certificate}</p>
        </div>
        <div className="form-group">
          <label className="p-0" htmlFor="inputSkill">
            Skill
          </label>
          <input
            onChange={handleInput}
            type="text"
            className="form-control"
            name="skills"
            placeholder="Skill..."
            value={inputs.skills}
          />
          <p style={{ color: "red" }}>{errors.skills}</p>
        </div>
        <div className="form-group">
          <label className="p-0" htmlFor="inputExp">
            Work experience
          </label>
          <textarea
            className="form-control"
            name="experience"
            placeholder="Work experience..."
            rows={4}
            value={inputs.experience}
            onChange={handleInput}
          />
          <p style={{ color: "red" }}>{errors.experience}</p>
        </div>
        <div className="form-group">
          <label className="p-0" htmlFor="inputCareer">
            Career goals
          </label>
          <textarea
            className="form-control"
            name="career"
            placeholder="Career goals..."
            rows={4}
            value={inputs.career}
            onChange={handleInput}
          />
          <p style={{ color: "red" }}>{errors.career}</p>
        </div>
        {/* <Error errors={errors} /> */}

        <button
          type="button"
          className="btn btn-primary-prior"
          // onClick={handleToggleClick1}
          // name="prior"
          // onChange={handleInput}
          // value={false}
          onClick={() => setNext2(true)}
        >
          Prior
        </button>

        <button type="submit" className="btn btn-primary btn-primary-post">
          Submit
        </button>
      </form>
    );
  };
  const render = () => {};

  console.log("next", next);
  console.log("next2", next2);
  console.log("pri", inputs.prior);
  // console.log("inpnut", inputs.cvName);
  return (
    <>
      <div className="createCV">
        <div className="contentCV">
          <div className="title-CV">CREATE YOUR CV</div>
          <div className="container ">
            <div className="row information-one">{renderNav()}</div>
            <div className="row information-two">{renderNav()}</div>
          </div>
        </div>
      </div>
    </>
  );
}
export default PageCV;
