import { useState } from "react";
import axios from "axios";

const BulkUpload = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    

    try {
      console.log(file);
      const { data } = await axios.post("http://localhost:7000/api/v1/admin/multiple-user", formData, {
        headers: { 
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        },
      });

      if (data) {
        alert("Users uploaded successfully!");
        setFile(null);
      } else {
        alert("Error uploading file!");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to upload users");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl font-bold mb-4">Bulk Upload Users</h2>
      <form onSubmit={handleUpload} className="flex flex-col gap-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="p-2 border rounded"
          accept=".csv"
          required
        />
        <button type="submit" className="p-2 bg-green-500 text-white rounded">
          Upload File
        </button>
      </form>
    </div>
  );
};

export default BulkUpload;
