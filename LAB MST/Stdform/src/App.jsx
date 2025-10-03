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
    outer:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",fontFamily:"Arial,sans-serif"},
    container:{padding:"20px",width:"400px",textAlign:"center",border:"1px solid #ccc",borderRadius:"10px",boxShadow:"0 4px 8px rgba(0,0,0,0.1)"},
    input:{width:"100%",padding:"10px",marginBottom:"10px",borderRadius:"5px",border:"1px solid #ccc",fontSize:"1rem"},
    button:{padding:"10px 20px",border:"none",borderRadius:"5px",backgroundColor:"blue",color:"white",cursor:"pointer",fontSize:"1rem"},
    table:{width:"100%",borderCollapse:"collapse",marginTop:"20px"},
    th:{border:"1px solid #ccc",padding:"10px",backgroundColor:"#f2f2f2"},
    td:{border:"1px solid #ccc",padding:"10px",textAlign:"center"}
  };

  return (
    <div style={styles.outer}>
      <div style={styles.container}>
        <h1 style={{marginBottom:"20px"}}>Student Registration</h1>

        <form onSubmit={handleSubmit} style={{marginBottom:"20px"}}>
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
