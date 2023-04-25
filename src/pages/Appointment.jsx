import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import patientDataService from '../Services/patientServices';
import { toast } from 'react-toastify';

function Appointment() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [date, setDate] = useState();
  const [slot, setSlot] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState();

  const [status,setStatus] = useState("Requested");



  const [address, setAddress] = useState();
  const [services, setServices] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedDate = new Date(date);
    const isWeekend = selectedDate.getDay() === 6 || selectedDate.getDay() === 0;
    const isPastDate = selectedDate < new Date();
    if (isWeekend || isPastDate) {
      toast.error('If you need book appointment to today and weekend days please contact Abhinav Nurshing home--: 94066 29851 ', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    const newPatient = {
      name,
      age,
      address,
      slot,
      date,
      phone,
      services,
      gender,
    status,
      email,
    };

    try {
      await patientDataService.addPatients(newPatient);
      toast.success('Successfully booked appointment', {
        position: toast.POSITION.TOP_CENTER,
      });

      navigate('/slot');
    } catch (error) {
      toast.error('Please fill in all the fields', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <>
    <div className='box'>     
      <form className='form' onSubmit={handleSubmit}>
        <label>Name</label>
        <input type='name' placeholder='Name' onChange={(e) => setName(e.target.value)} required />
        <label>Email</label>
        <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} required />
        <label>Mobile Number</label>
        <input type='phone' placeholder='Mobile no.' onChange={(e) => setPhone(e.target.value)} required />
        <label>Date</label>
        <input
          type='date'
          placeholder='Date'
          onChange={(e) => setDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          required
        />

        <div className='select'>
        <label >Gender </label>
        <select  type="gender" onChange={(e) => setGender(e.target.value)} required >
           <option value="female">Female </option>
           <option value="male">Male</option>
           <option value="other">Other</option>
        </select>

        <div className='status'>
        <label >Status </label>
        <select onChange={(e) => setStatus(e.target.value)} required >
           <option value="visited">Visited</option>
           <option value="not-vissited">Not-visited</option>        
        </select>
        </div>
        <label >Slot </label>
        <select  type='slot' onChange={(e) => setSlot(e.target.value)} required>
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

        <input type='number' id='select' placeholder='Age' onChange={(e) => setAge(e.target.value)} required/>
        <label>Address</label>

        <input type='address' placeholder='Address' onChange={(e) => setAddress(e.target.value)} required/>
        
        <button className='button'>Submit</button>
      </form>
    </div>
    
    </>
  
  );
}

export default Appointment;
