import React, { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])

    const copyText = async (text) => {
        try {
            await navigator.clipboard.writeText(text)
            toast('Copied to clipboard!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        } catch (e) {
            toast.error('Failed to copy!')
        }
    }

    const showPassword = () => {
        if (!passwordRef.current || !ref.current) return

        if (passwordRef.current.type === "password") {
            passwordRef.current.type = "text"
            ref.current.src = "icons/eye.png"
        } else {
            passwordRef.current.type = "password"
            ref.current.src = "icons/eyecross.png"
        }
    }

    const savePassword = () => {
        toast('Password Saved.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
    }

    const deletePassword = (id) => {
        toast('Password Deleted.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        let c = confirm("Do you want To delete the password ?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
        }
    }

    const editPassword = (id) => {
        setform(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        savePassword()
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />

            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[260px] w-[260px] sm:h-[310px] sm:w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[90px] sm:blur-[100px]">
                </div>
            </div>

            <div className="mycontainer max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
                <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-center'>
                    <span className='text-green-700'> &lt;</span>
                    Pass
                    <span className='text-green-700'>OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-sm sm:text-base md:text-lg text-center mt-1'>
                    Your own Password Manager
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col p-3 sm:p-4 text-black gap-3 sm:gap-4 items-center w-full max-w-3xl mx-auto mt-4"
                >
                    <input
                        value={form.site}
                        onChange={handleChange}
                        placeholder='Enter Website URL'
                        className='bg-white rounded-full border border-green-500 w-full p-2 sm:p-3'
                        type="text"
                        name="site"
                        id=""
                    />

                    <div className="flex flex-col md:flex-row w-full gap-3 md:gap-6">
                        <input
                            value={form.username}
                            onChange={handleChange}
                            placeholder='Enter User Name'
                            className='bg-white rounded-full border border-green-500 w-full p-2 sm:p-3'
                            type="text"
                            name="username"
                        />

                        <div className="relative w-full">
                            <input
                                ref={passwordRef}
                                value={form.password}
                                onChange={handleChange}
                                placeholder='Enter Password'
                                className='bg-white rounded-full border border-green-500 w-full p-2 sm:p-3 pr-10'
                                type="password"
                                name="password"
                            />
                            <span
                                className='absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer'
                                onClick={showPassword}
                            >
                                <img ref={ref} className='p-1' width={30} src="icons/eye.png" alt="" />
                            </span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className='flex justify-center items-center gap-1 bg-green-600 rounded-full px-6 sm:px-8 py-2 sm:py-2.5 w-fit hover:bg-green-500 cursor-pointer text-sm sm:text-base mt-2'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save
                    </button>
                </form>

                <div className="passwords mt-6 sm:mt-8 overflow-x-auto">
                    <h2 className='font-bold text-xl sm:text-2xl py-2 sm:py-4'>
                        Your Passwords
                    </h2>
                    {passwordArray.length === 0 && <div className="text-sm sm:text-base"> No Passwords to show </div>}

                    {passwordArray.length !== 0 &&

                        <table className="table-auto w-full min-w-[640px] rounded-xl overflow-hidden text-xs sm:text-sm">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2 px-2 sm:px-4'>Site</th>
                                    <th className='py-2 px-2 sm:px-4'>Username</th>
                                    <th className='py-2 px-2 sm:px-4'>Password</th>
                                    <th className='py-2 px-2 sm:px-4'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className='text-center py-2 px-2 sm:px-4 border border-white'>
                                                <div className='flex items-center justify-center max-w-[150px] sm:max-w-none break-all'>
                                                    <a href={item.site} target='_blank' rel="noreferrer">
                                                        {item.site}
                                                    </a>
                                                    <div
                                                        className='size-6 sm:size-7 cursor-pointer'
                                                        onClick={() => copyText(item.site)}
                                                    >
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                            style={{ width: "25px", height: "25px", paddingTop: "5px", paddingLeft: "6px" }}>
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className='text-center py-2 px-2 sm:px-4 border border-white'>
                                                <div className='flex items-center justify-center max-w-[150px] sm:max-w-none break-all'>
                                                    {item.username}
                                                    <div
                                                        className='size-6 sm:size-7 cursor-pointer'
                                                        onClick={() => copyText(item.username)}
                                                    >
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                            style={{ width: "25px", height: "25px", paddingTop: "5px", paddingLeft: "6px" }}>
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className='py-2 px-2 sm:px-4 border border-white'>
                                                <div className='flex items-center justify-center max-w-[150px] sm:max-w-none break-all'>
                                                    {item.password}
                                                    <div
                                                        className='size-6 sm:size-7 cursor-pointer'
                                                        onClick={() => copyText(item.password)}
                                                    >
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                            style={{ width: "25px", height: "25px", paddingTop: "5px", paddingLeft: "6px" }}>
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className='text-center py-2 px-2 sm:px-4 border border-white'>
                                                <span className="inline-flex justify-center cursor-pointer mx-1">
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/gwlusjdu.json"
                                                        trigger="hover"
                                                        style={{ width: "25px", height: "25px" }}
                                                        onClick={() => { editPassword(item.id) }}>
                                                    </lord-icon>
                                                </span>

                                                <span className="inline-flex justify-center cursor-pointer mx-1">
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/skkahier.json"
                                                        trigger="hover"
                                                        style={{ width: "25px", height: "25px" }}
                                                        onClick={() => { deletePassword(item.id) }}>
                                                    </lord-icon>
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    }

                </div>

            </div>
        </>
    )
}

export default Manager
