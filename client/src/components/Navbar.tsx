import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();

  return (
    <div className='flex justify-center '>
    <div className='fixed top-20  bg-slate-800 text-white w-[500px] rounded-xl  shadow-md z-50 h-[75px] flex justify-around items-center'> 

    <h1 className='text-xl  cursor-pointer font-black' onClick={()=>{navigate('/')}}>Profile</h1>
    <h1 className='text-xl cursor-pointer font-black' onClick={()=>{navigate('/webhook')}}>Create Webhook</h1>
    <h1 className='text-xl  cursor-pointer font-black' onClick={()=>{navigate('/ci-cd')}}>CI/CD</h1>
    
    </div>
    </div>
  )
}
