import React, { useState, useEffect } from 'react';
import patientDataService from '../Services/patientServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

function Edit({ id, setPatientId }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');
  const [age, setAge] = useState('');
  const [status ,setStatus] =useState("");
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [services, setServices] = useState('');
  const navigate =useNavigate()

 
  const editHandler = async () => {
    try {
      const docSnap = await patientDataService.getPatient(id);
      setName(docSnap.data().name);
      setEmail(docSnap.data().email);
      setSlot(docSnap.data().slot);
      setDate(docSnap.data().date);
      setAddress(docSnap.data().address);
      setServices(docSnap.data().services);
      setPhone(docSnap.data().phone);
      setStatus(docSnap.data().status);
      setGender(docSnap.data().gender);


      setAge(docSnap.data().age);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id !== undefined && id !== '') {
      editHandler();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    // const selectedDate = new Date(date);
    // const isWeekend = selectedDate.getDay() === 6 || selectedDate.getDay() === 0;
    // const isPastDate = selectedDate < new Date();
    // if (isWeekend || isPastDate) {
    //   toast.error('Please Select Date Between Monday to Friday', {
    //     position: toast.POSITION.TOP_CENTER,
    //   });
    //   return;
    // }

    try {
      const patientData = {
        name,
        email,
        phone,
        date,
        slot,
        age,
        gender,
        status,
        address,
        services,
      };

      try {
        if (id !== undefined && id !== '') {
          await patientDataService.updatePatients(id ,patientData);
        toast.success(' updated Successfully', {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate('/patientDashboard');
        }else{
          toast.error('something went wrong', {
            position: toast.POSITION.TOP_CENTER,
          }); 
        }
      }  catch (error) {
        toast.error('Please fill in all the fields', {
          position: toast.POSITION.TOP_CENTER,
        });
      }

      if (id !== undefined && id !== '') {
        await patientDataService.updatePatients(id, patientData);
        setPatientId('');
      }
    } catch (error) {
      console.log(error);
    }
  
  };
  const handleclick=()=>{
    setPatientId(id)
  }

  return (
    <div className='box'>
      <form className='form' onSubmit={handleSubmit}>
      <label>Name</label>

        <input
          type='name'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
                <label>Email</label>

        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
                <label>Mobile Number</label>

        <input
          type='phone'
          placeholder='Mobile no.'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
                <label>Date</label>

        <input
          type='date'
          placeholder='Date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          // min={new Date().toISOString().split('T')[0]}
          required
        />
       <div className='select'>
        <label >Gender </label>
        <select type="gender" value={gender} onChange={(e) => setGender(e.target.value)}  required>
           <option value="female">Female </option>
           <option value="male">Male</option>
           <option value="other">Other</option>
        </select>
        <label >Status </label>
        <select  type='status' value={status} onChange={(e) =>setStatus(e.target.value)} required>
           <option value="visited">Visited</option>
           <option value="Not-visited">Not-visited</option>        
        </select>
        <label >Slot </label>
        <select type="slot" value={slot} onChange={(e) => setSlot(e.target.value)} required>
           <option value="morning">Morning </option>
           <option value="evening">Evening</option>
        </select>
        <label >Services </label>
        <select  type='services' onChange={(e) => setServices(e.target.value)} required>
           <option value="Diabetes">Diabetes</option>
           <option value="Blood Pressure">Blood Pressure</option>
           <option value="Gynaceology">Gynaceology</option>
           <option value="Routine check ups">Routine check ups</option>
           <option value="Drug De-addiction">Drug De-addiction</option>
           <option value="Other">Other</option>
        </select>
        </div>
        <label>Age</label>

        <input
          type='number'
          id='select'
          placeholder='Age'
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
                <label>Address</label>

        <input
          type='address'
          placeholder='Address'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      
        
          
          <button className='button' onClick={(e)=>handleclick()} >Edit</button>
          {/* <Link to='/patientDashboard'><button className='button'>Return</button></Link> */}
         
      
        </form>
        </div>
        );
}

export default Edit;
