import { useState } from "react";

export default function StudentForm() {
  const [formData,setFormData]=useState({name:"",email:"",course:""});
  const [students,setStudents]=useState([]);

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    setStudents([...students,formData]);
    setFormData({name:"",email:"",course:""});
  };

  const styles={
    outer:{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      height:"100vh",
      width:"100vw",
      fontFamily:"Arial, sans-serif",
      backgroundColor:"#222"
    },
    container:{
      padding:"30px",
      width:"400px",
      maxWidth:"90%",
      textAlign:"center",
      border:"1px solid #ccc",
      borderRadius:"12px",
      boxShadow:"0 6px 12px rgba(0,0,0,0.2)",
      backgroundColor:"#333",
      boxSizing:"border-box"
    },
    form:{
      display:"flex",
      flexDirection:"column",
      gap:"12px"
    },
    input:{
      width:"100%",
      padding:"12px",
      borderRadius:"6px",
      border:"1px solid #aaa",
      fontSize:"1rem",
      boxSizing:"border-box",
      backgroundColor:"#444",
      color:"white"
    },
    button:{
      padding:"12px 20px",
      border:"none",
      borderRadius:"6px",
      backgroundColor:"blue",
      color:"white",
      cursor:"pointer",
      fontSize:"1rem",
      transition:"0.3s"
    },
    table:{
      width:"100%",
      borderCollapse:"collapse",
      marginTop:"20px",
      backgroundColor:"white"
    },
    th:{
      border:"1px solid #ccc",
      padding:"10px",
      backgroundColor:"#080808ff",
      wordBreak:"break-word",
      maxWidth:"120px"
    },
    td:{
      border:"1px solid #ccc",
      backgroundColor:"#080808ff",
      padding:"10px",
      textAlign:"center",
      wordBreak:"break-word",
      maxWidth:"120px"
    }
  };

  return (
    <div style={styles.outer}>
      <div style={styles.container}>
        <h1 style={{marginBottom:"20px",color:"white"}}>Student Registration</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange} required style={styles.input}/>
          <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} required style={styles.input}/>
          <input type="text" name="course" placeholder="Enter Course" value={formData.course} onChange={handleChange} required style={styles.input}/>
          <button type="submit" style={styles.button}>Add Student</button>
        </form>
        {students.length>0 && (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Course</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s,index)=>(
                <tr key={index}>
                  <td style={styles.td}>{s.name}</td>
                  <td style={styles.td}>{s.email}</td>
                  <td style={styles.td}>{s.course}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
