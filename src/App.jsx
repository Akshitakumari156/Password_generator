import { useState ,useCallback,useEffect,useRef} from 'react'
import './App.css'

function App() {
  const[length,setLength]=useState(8);
  const[number,setNumber]=useState(false);
  const[char,setChar]=useState(false);
  const[password,setPassword]=useState("");
  
  const passref=useRef(null)
  const passgen=useCallback(()=>{
     let pass=""
     let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
     if(number) str+="0123456789"
     if(char) str+="-*/+#@$%!^^&*()=~.,"
     for (let i = 1; i <=length; i++) {
      let char=Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(char)
     }
     setPassword(pass)
  },[number,length,char,setPassword]);
  useEffect(()=>{passgen()},[length,char,number,passgen]);

  const copytoclipboard=useCallback(()=>{
    passref.current?.select()
    passref.current?.setSelectionRange(0,999)
    window.navigator.clipboard.writeText(password);
  },[password]);
  return (
    <>
      <div className='w-full max-w-md rounded-lg mx-auto shadow-md px-4 my-8 text-orange-600 bg-gray-600'>
      <div className='mb-2 text-white text-2xl font-medium - 500'>PASSWORD GENERATOR</div>
       <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text" value={password} placeholder='Password' className='outline-none w-full py-1 px-3' readOnly ref={passref} />
        <button className='bg-blue-600 text-white shrink-0 px-2 py-1 outline-none' onClick={copytoclipboard}>Copy</button>
       </div>
       <div className='flex text-small gap-x-3'>
          <input type="range" value={length} min={6} max={100} className='cursor-pointer' onChange={(e)=>setLength(e.target.value)}/>
          <label className='text-black font-bold'>Length:{length}</label>
          <input type="checkbox" Checked={number} id="default number" onChange={()=>setNumber((prev)=>!prev)}/>
          <label className='text-black font-bold'>Number</label>
          <input type="checkbox" Checked={char} id="default number" onChange={()=>setChar((prev)=>!prev)}/>
          <label className='text-black font-bold'>Character</label>
       </div>
      </div>
    </>
  )
}

export default App
