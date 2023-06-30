import * as pdfjsLib from 'pdfjs-dist';
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
const MyPdfReader = () => {
  const [files, setFile] = useState("");
  const [avatar, setAvatar] = useState("");
  const [errors, setErrors] = useState("");
  const [toggle, setToggle] = useState(false);
  
  
  const handleFileChange = async (e) => {
    console.log(pdfjsLib.version)
    let file = e.target.files;
    let reader = new FileReader();
    reader.onload = async (e) => {
      setAvatar(e.target.result);
      const arrayBuffer = e.target.result;
      console.log(arrayBuffer);
      // const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      setFile(file[0]);
      // console.log(pdf);
};
    console.log(avatar);
    console.log(file);
    reader.readAsDataURL(file[0]);

    
  };
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};
export default MyPdfReader;