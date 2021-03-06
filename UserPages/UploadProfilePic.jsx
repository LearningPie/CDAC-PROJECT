import axios from "axios";
import { useEffect, useState } from "react";

export default function UploadProfilePic() {
  const [selectedFile, setSelectedFile] = useState();

  const validate = () => {
    //console.log(selectedFile);
    var fileInput = document.getElementById("file");

    var filePath = fileInput.value;

    // Allowing file type
    var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

    if (!allowedExtensions.exec(filePath)) {
      alert("Invalid file type");
      fileInput.value = "";
      return false;
    }
    return true;
  };
  const upload = async () => {
    if (validate()) {
      console.log(selectedFile);
      const data = new FormData();
      data.append("userId", sessionStorage.getItem("userId"));
      data.append("profilePic", selectedFile);
      const response = await axios.post(
        `http://localhost:8080/upload-profile-pic`,
        data
      );
    }
  };
  return (
    <div>
      <form onSubmit={upload} className="mt-4 mb-4">
        <input
          type="file"
          id="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
        <button
          className="btn btn-warning"
          //onClick={(window.location = "/userProfile")}
        >
          Upload Your Picture
        </button>
      </form>
    </div>
  );
}
