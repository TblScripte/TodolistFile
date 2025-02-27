import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Switcher from './swicher/swicher';

const api = "https://to-dos-api.softclub.tj/api/to-dos";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [name1, setName1] = useState("");
  const [desc1, setDesc1] = useState("");
  const [file, setFile] = useState(null);
  const [dialog, setDialog] = useState(false);
  const [dialog2, setDialog2] = useState(false);
  const [dialog1, setDialog1] = useState(false);
  const [img1, setImg1] = useState(null);
  const [id, setId] = useState(null);
  const [id1,setId1] = useState(null)
  const [date,setDate] = useState({})

  async function Get() {
    try {
      const response = await axios.get(api);
      setTodos(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  

  async function DelImg(id) {
    try {
      await axios.delete(`${api}/images/${id}`);
      Get();
    } catch (error) {
      console.error(error);
    }
  }

  async function Add() {
    let formData = new FormData();
    formData.append("Name", name);
    formData.append("Description", desc);
    for (let i = 0; i < file.length; i++) {
      formData.append("Images", file[i]);
    }
    try {
      await axios.post(api, formData);
      Get();
    } catch (error) {
      console.error(error);
    }
  }

  async function Edit() {
    try {
      await axios.put(api, { name: name1, description: desc1, id });
      Get();
      setDesc1("");
      setName1("");
      setDialog(false);
    } catch (error) {
      console.error(error);
    }
  }

  function EditModal(el) {
    setDesc1(el.description);
    setName1(el.name);
    setId(el.id);
    setDialog(true);
  }

  async function Del(id) {
    try {
      await axios.delete(`${api}?id=${id}`);
      Get();
    } catch (error) {
      console.error(error);
    }
  }

  function Dl(el) {
    setDialog1(true);
    setId(el.id);
  }

  async function Add1() {
    let formData = new FormData();
    for (let i = 0; i < img1.length; i++) {
      formData.append("Images", img1[i]);
    }
    try {
      await axios.post(`${api}/${id}/images/`, formData);
      Get();
      setDialog1(false)
    } catch (error) {
      console.error(error);
    }
  }

  function Dl1(el){
    setDialog2(true)
    getById(el.id)
  }

  async function getById(id){
    try {
      const {data} = await axios.get(api+"/"+id)
      setDate(data.data)
    } catch (error) {
      console.error(error);
    }
  }

  async function EditCheled(id,i1){
    try {
       await axios.put(`https://to-dos-api.softclub.tj/completed?id=${id}`,{ i1 })
      Get()
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    Get();
  }, []);

  return (
    <div className="container mx-auto p-4 dark:bg-[black]">
      <Switcher/>
      <div className="flex flex-col gap-4 max-w-md mx-auto">
        <input className="border p-2 rounded" type="text" value={name} onChange={(el) => setName(el.target.value)} placeholder="Name" />
        <input className="border p-2 rounded" type="text" value={desc} onChange={(el) => setDesc(el.target.value)} placeholder="Description" />
        <input className="border p-2 rounded" type="file" multiple onChange={(el) => setFile(el.target.files)} />
        <button className="bg-blue-500 text-white p-2 rounded" onClick={Add}>Add</button>
      </div>
      <div className="mt-8 gap-4 flex  flex-wrap justify-between">
        {todos?.map((el) => (
          <div key={el.id} className="border w-[320px] p-4 rounded">
            <h1 className="text-xl font-bold">{el.id}</h1>
            {
              el.isCompleted ?
              <h1 className="text-xl line-through font-bold">{el.name}</h1>: <h1 className="text-xl font-bold">{el.name}</h1>
            }
            <p className="text-gray-600">{el.description}</p>
            <div className="flex gap-2 mt-2">
              {el.images?.map((img) => (
                <div key={img.id} className="relative">
                  <img className="w-32 h-32 object-cover rounded" src={`https://to-dos-api.softclub.tj/images/${img.imageName}`} alt="" />
                  <button className="absolute top-0 right-0 bg-red-500 text-white p-1 text-xs rounded" onClick={() => DelImg(img.id)}>Delete</button>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2">
              <button className="bg-yellow-500 text-white p-2 rounded" onClick={() => EditModal(el)}>Edit</button>
              <button className="bg-red-500 text-white p-2 rounded" onClick={() => Del(el.id)}>Delete</button>
              <button className="bg-green-500 text-white p-2 rounded" onClick={() => Dl(el)}>Add Files</button>
              <button className='bg-blue-400 text-white p-2 rounded' onClick={()=>Dl1(el)}>ℹ️</button>
              <input type="checkbox" checked={el.isCompleted} onChange={()=>EditCheled(el.id,!el.isCompleted)} />
            </div>
          </div>
        ))}
      </div>
      {dialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded">
            <input className="border p-2 rounded" type="text" placeholder="Name" onChange={(e) => setName1(e.target.value)} value={name1} />
            <input className="border p-2 rounded ml-[10px] mr-[10px]" type="text" placeholder="Description" onChange={(e) => setDesc1(e.target.value)} value={desc1} />
            <button className="bg-blue-500 text-white p-2 rounded ml-[10px] mr-[10px]" onClick={Edit}>Save</button>
            <button className='p-2 rounded bg-[red] text-white mt[10px]' onClick={()=>setDialog(false)}>Close</button>
          </div>
        </div>
      )}
      {dialog1 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded">
            <input className="border p-2 rounded" type="file" onChange={(e) => setImg1(e.target.files)} />
            <button className="bg-green-500 text-white p-2 rounded ml-[10px] mr-[10px]" onClick={Add1}>Upload</button>
            <button className='p-2 rounded bg-[red] text-white mt[10px]' onClick={()=>setDialog1(false)}>Close</button>
          </div>
        </div>
      )}
      {dialog2 && (
        <div className=" w-[30%] dark:bg-[black] dark:shadow-[white] absolute h-[100vh] fixed right-0 bg-[white] shadow-md bottom-0">
          <div className="bg-white p-4  rounded dark:bg-[black]">
            <div className='w-[100px] flex items-center flex-wrap'>
            {
              date.images?.map((el)=>{
                return <div key={el.id} className='w-[100%] flex '>
                  <img className='w-[100%]'  src={"https://to-dos-api.softclub.tj/images/"+el.imageName} alt="" />
                </div>
              })
            }
            </div>
            <h1 className='text-[red] text-[1.3rem] mt-[30px]'> ID : {date.id}</h1>
            <h1 className='text-[red] text-[2rem]'>Name : {date.name}</h1>
            <button className='p-2 rounded bg-[red] text-white mt[10px]' onClick={()=>setDialog2(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;