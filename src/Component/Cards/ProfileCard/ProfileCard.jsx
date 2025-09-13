import { FaBell } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa6";
import { CiBellOn } from "react-icons/ci";

const ProfileCard = ({ img, name, engaged, quote }) => {
  console.log("ProfileCard props:", name);
  return (
    <div
      className="profile-card d-flex flex-column flex-md-row justify-content-between p-3 p-md-3"
      style={{
        boxShadow: "0px 0px 10px #cacacaff",
        borderRadius: "8px",
        gap: "10px", // Mobile gap smaller
        cursor: "pointer",
      }}
    >
      {/* Left side User image & Data showing */}
      <div className="d-flex gap-3 align-items-center flex-md-row flex-column">
        <img
          style={{
            height: "100px",
            width: "100px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
          src="https://img.onmanorama.com/content/dam/mm/en/entertainment/entertainment-news/images/2021/8/26/money-heist-professor.jpg?w=1120&h=583"
        />
        <div className="d-flex flex-column gap-2 justify-content-center mt-2 mt-md-0 text-center text-md-start">
          <div
            className="inter-font"
            style={{ fontWeight: "bold", fontSize: "20px" }}
          >
            Name: {name}
          </div>
          <div className="inter-font" style={{ fontSize: "15px" }}>
            213 Engaged
          </div>
        </div>
      </div>

      {/* Middle quote */}
      <div
        className="merriweather-font text-center flex-fill"
        style={{
          fontStyle: "italic",
          color: "#7e7e7eff",
          alignSelf: "center",
          padding: "5px 0", // Mobile vertical padding smaller
        }}
      >
        "Words are the threads that weave the world we imagine"
      </div>

      {/* Right side Engage Button showing */}
      <div className="d-flex justify-content-center justify-content-md-end mt-2 mt-md-0">
        <div
          className="mt-auto mb-auto inter-font d-flex gap-2 align-items-center"
          style={{
            background: "#252525ff",
            padding: "10px 20px",
            color: "white",
            fontWeight: "600",
            fontSize: "14px",
            borderRadius: "25px",
            boxShadow: "0px 0px 3px #252525ff",
          }}
        >
          Engage <FaRegBell />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
