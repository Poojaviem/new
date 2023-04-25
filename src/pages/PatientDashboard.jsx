import React, {useEffect,useState} from 'react'
import patientDataService from '../Services/patientServices'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

function PatientDashboard({getPatientId}) {
  
  const[patients ,setPatients]=useState([])
  // const [deletedPatients, setDeletedPatients] = useState([]);

  const [searchDate, setSearchDate] = useState('');
const [searchMobile, setSearchMobile] = useState('');


  useEffect(()=>{
   getPatients()
  },[])
  const getPatients = async () => {
    try {
      const data = await patientDataService.getAllPatient();
      const filteredPatients = data.docs
        .map(doc => ({ ...doc.data(), id: doc.id }))
        .filter(patient => patient.date.includes(searchDate)) 
        .filter(patient => patient.phone.includes(searchMobile)) 
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      setPatients(filteredPatients);
    } catch (error) {
      console.error('Error fetching Patients:', error);
    }
  };
  const filterPatientsByStatus = async(status) => {
    try {
      const data = await patientDataService.getAllPatient();
      const filteredPatients = data.docs
        .map(doc => ({ ...doc.data(), id: doc.id }))
        .filter(book => book.status === status) 
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      setPatients(filteredPatients);
    } catch (error) {
      console.error('Error filtering Patients by status:', error);
    }
  };
  const handleFilter = async (status) => {
    if (status === 'visited') {
      filterPatientsByStatus('visited');
    } else if (status === 'not-visited') {
      filterPatientsByStatus('Not-visited');
    } else if (status === 'Requested') {
      filterPatientsByStatus('Requested');
    }
    else {
      getPatients();
    }
    setSearchDate('');
    setSearchMobile('');
  };
  

// const deleteHandler = async (id) => {
//   try {
//     const patient = patients.find(patient => patient.id === id);

//     const updatedPatients = patients.filter(patient => patient.id !== id);
//     setPatients(updatedPatients);

//     setDeletedPatients([...deletedPatients, patient]);

//     toast.error('Successfully Deleted', {
//       position: toast.POSITION.TOP_CENTER,
//     });
//   } catch (error) {
//     console.error('Error deleting patient:', error);
//   }
// };

 const handleReset=()=>{
  getPatients()
 }
  
  return (
    <>

<div className='site'>
  <h3>status</h3>
  <button className='btn1' onClick={handleReset}>All Patient</button>
  <button className="btn1" onClick={() => handleFilter('visited')}>Visited</button> 
  <button className="btn1" onClick={() => handleFilter('not-visited')}>Not-visited</button>
  <button className="btn1" onClick={() => handleFilter('Requested')}>Requested</button>
<Link to='/adminAppointment'> <button className='btn1'>Book New Appointment</button></Link>
 <input type="date" className='content'  value={searchDate} onChange={(e) => setSearchDate(e.target.value)} />
  <input type="text"className='content' placeholder="Search by Mobilem No." value={searchMobile} onChange={(e) => setSearchMobile(e.target.value)} />
 
</div>
 <div className='table table-striped-columns'>
 <table className="table">
  <thead >
    <tr>
      <th scope="col">S.No.</th>
      <th scope="col">NAME</th>
      <th scope="col">EMAIL</th>
      <th scope="col">ADDRESS</th>
      <th scope="col">AGE</th>
      <th scope="col">GENDER</th>
      <th scope="col">SLOT</th>
      <th scope="col">DATE</th>
      <th scope="col">SERVICE</th>
      <th scope="col">MOBILE NO.</th>
      <th scope="col">STATUS</th>
      <th scope="col">ACTION</th>
    </tr>
  </thead>
  <tbody>
  {patients.map((doc , index)=>{
            return(
              <tr key ={doc.id}>
              <td>{index+1}</td>
          <td>{doc.name}</td>
          <td>{doc.email}</td>
          <td>{doc.address}</td>
          <td>{doc.age}</td>
          <td>{doc.gender}</td>
          <td>{doc.slot}</td>
          <td>{doc.date}</td>
          <td>{doc.services}</td>
          <td>{doc.phone}</td>
          <td>{doc.status}</td>

          <td className="btn2">
          <Link className='link ' to='/edit'><button className="btn btn-success" onClick={(e)  =>getPatientId (doc.id)}>Edit</button></Link>
            {/* <button className="btn btn-danger"  onClick={(e)=>deleteHandler(doc.id)}>Cancel</button> */}
           
          </td>
          </tr>

          )
           })} 
  </tbody>
</table>
 </div>
 
 
 </>
  
)
  }


export default PatientDashboard