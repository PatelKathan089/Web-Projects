import React, { useRef, useState, useEffect } from 'react'
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import "./main.css"

function Main() {
    const pass_ref = useRef();
    const pass_img_ref = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    const { register, handleSubmit, formState: { errors } } = useForm();

    // Data Retriving:- 
    useEffect(() => {
        const getPasswords = async () => {
            let res = await fetch("http://localhost:3000/", {
                method: 'GET', headers: {
                    "x-api-key": "mysecureapikey123",
                    "Content-Type": "application/json"
                }
            })
            let passwords = await res.json()
            setpasswordArray(passwords)
        }
        getPasswords()
    }, [])

    const showPassword = () => {
        if (pass_img_ref.current.src.includes('imgs/eye.svg') && pass_ref.current.type === 'password') {
            pass_img_ref.current.src = 'imgs/closeeye.svg'
            pass_ref.current.type = 'text'
        } else {
            pass_img_ref.current.src = 'imgs/eye.svg'
            pass_ref.current.type = 'password'
        }
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const savePassword = async (e) => {
        e.preventDefault(); // Prevents page refresh

        if (form.id) {
            // Update existing password
            await fetch("http://localhost:3000/", {
                method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
                    id: form.id, site: form.site, username: form.username, password: form.password,
                }),
            });
            setpasswordArray(passwordArray.map(item =>
                item._id === form.id
                    ? { ...item, site: form.site, username: form.username, password: form.password }
                    : item
            ));
            toast.success('Password updated!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });

        } else {
            // Save New Password:-
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form }) })

            setpasswordArray([...passwordArray, { ...form }])
            setform({ site: "", username: "", password: "" })
            toast.success('Password saved!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide
            })
        }
        // Refresh the data from the server
        getPasswords();
        // Reset the form
        setform({ site: "", username: "", password: "" });
    }

    const copyText = (text) => {
        navigator.clipboard.writeText(text)
        toast.success('Copied to clipboard!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide
        })
    }

    const editText = (id) => {
        const passwordToEdit = passwordArray.find(item => item._id === id);
        setform({ ...passwordToEdit, id })
        setpasswordArray(passwordArray.filter(item => item._id !== id))
    }

    const deleteText = async (id) => {
        setpasswordArray(passwordArray.filter(item => item._id !== id))

        await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

        toast.success('Password deleted!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide
        })
    }

    return (
        <>
            <ToastContainer />

            <div className='mainbar w-full'>
                <div className="absolute inset-0 -z-10 h-full w-full bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>
                <div className="head flex flex-col items-center justify-center mt-8">
                    <div className="logo font-bold text-2xl">
                        <span className='text-green-600'>&lt;</span>
                        <span>Pass</span>
                        <span className='text-green-600'>OP/&gt;</span>
                    </div>
                    <div className="title">
                        <h2>Your own Password Manager</h2>
                    </div>
                </div>
                <div className="editWindow mt-4">
                    <form action="" className='p-3 flex flex-col items-center justify-center gap-4'>
                        <div className="url w-[80%]">
                            <input name='site' value={form.site} onChange={handleChange} type="text" placeholder='Enter Website URL' className='w-full p-1 rounded-full pl-4 border border-green-400 outline-2 outline-green-600' />
                        </div>
                        <div className="user flex gap-2 w-[80%]">
                            <input name='username' value={form.username} onChange={handleChange} type="text" placeholder='Enter Username' className='w-full p-1 rounded-full pl-4 border border-green-400 outline-2 outline-green-600' />
                            <div className='relative pass-box'>
                                <input ref={pass_ref} value={form.password} onChange={handleChange} type="password" placeholder='Enter Password' name="password" className='p-1 rounded-full pl-4 border border-green-400 outline-2 outline-green-600' />
                                <span onClick={showPassword}>
                                    <img ref={pass_img_ref} src="imgs/eye.svg" className='absolute right-[8px] bottom-[8px] cursor-pointer' alt="view" />
                                </span>
                            </div>
                        </div>
                        <div className="submit">
                            <button onClick={savePassword} className='flex items-center gap-1 bg-green-400 p-2 px-4 rounded-full hover:bg-green-500'>
                                <img src="imgs/save_btn.svg" alt="save_ico" className='invert' />
                                <span>Save</span>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="password_window flex flex-col justify-center items-center p-3">
                    <h2 className='font-bold text-lg w-[80%]'>Your Passwords</h2>
                    {passwordArray.length === 0 ? <div>No Passwords to show</div> : <table className="table-auto w-[80%] rounded-md overflow-hidden mt-1">
                        <thead className='bg-green-700 text-white font-bold'>
                            <tr>
                                <th className='py-1'>Site</th>
                                <th className='py-1'>Username</th>
                                <th className='py-1'>Password</th>
                                <th className='py-1'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-200'>
                            {passwordArray.map((item) => {
                                return (<tr key={item._id}>
                                    <td className='py-1 text-center border-b-2 w-[50%]'>
                                        <div className='flex justify-center items-center gap-1'>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <img src="imgs/copy.svg" onClick={() => { copyText(item.site) }} className='cursor-pointer' alt="copy" />
                                        </div>
                                    </td>
                                    <td className='py-1 text-center border-b-2 w-[10%]'>
                                        <div className='flex justify-center items-center gap-1'>
                                            <span>{item.username}</span>
                                            <img src="imgs/copy.svg" onClick={() => { copyText(item.username) }} className='cursor-pointer' alt="copy" />
                                        </div>
                                    </td>
                                    <td className='py-1 text-center border-b-2 w-[10%]'>
                                        <div className='flex justify-center items-center gap-1'>
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <img src="imgs/copy.svg" onClick={() => { copyText(item.password) }} className='cursor-pointer' alt="copy" />
                                        </div>
                                    </td>
                                    <td className='py-1 text-center border-b-2 w-[10%]'>
                                        <div className='flex justify-center items-center gap-2'>
                                            <img onClick={() => { editText(item._id) }} src="imgs/edit.svg" className='cursor-pointer' alt="edit" />
                                            <img onClick={() => { deleteText(item._id) }} src="imgs/delete.svg" className='cursor-pointer' alt="delete" />
                                        </div>
                                    </td>
                                </tr>)
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Main
