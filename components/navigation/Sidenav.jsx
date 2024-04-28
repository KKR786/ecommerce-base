'use client'

import {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {useRouter} from "next/navigation";
import {toast} from "react-hot-toast";

function Sidenav() {
  const router = useRouter()
  const [userId, setUserId] = useState('');

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const userId = JSON.parse(localStorage.getItem('user')).userId;
      setUserId(userId);
    }
  }, [])
  
  const logout = async () => {
    try {
        await fetch('/api/users/auth/logout')
        toast.success('Logout successful')
        router.push('/admin/login')
    } catch (err) {
      console.log(err.message);
      toast.error(err.message)
    }
}
  return (
    <aside className="fixed inset-y-0 block w-full p-0 my-4 overflow-y-auto transition-transform duration-200 -translate-x-full border-0 shadow-none bg-slate-850 max-w-64 ease-nav-brand z-990 xl:ml-6 rounded-2xl xl:left-0 xl:translate-x-0">
      <div className="h-[4.75rem]">
        <span className="absolute top-0 right-0 p-4 opacity-50 cursor-pointer text-white xl:hidden">x</span>
        <Link className="block px-8 py-6 m-0 text-sm whitespace-nowrap text-white" href="/admin" target="_blank">
          <Image src="" className="hidden h-full max-w-full transition-all duration-200 dark:inline ease-nav-brand max-h-8" alt="main_logo" />
          <span className="ml-1 font-semibold transition-all duration-200 ease-nav-brand">Admin Dashboard</span>
        </Link>
      </div>

      <hr className="h-px mb-[1rem] border-0 opacity-[0.25] mt-0 bg-transparent to-transparent bg-gradient-to-r from-transparent via-white" />

      <div className="items-center block w-auto max-h-screen overflow-auto h-sidenav grow basis-full">
        <ul className="flex flex-col pl-0 mb-0">
          <li className="mt-0.5 w-full">
            <Link className="text-white bg-blue-500/13 opacity-80 text-sm my-0 mx-2 py-[0.675rem] flex items-center whitespace-nowrap rounded-lg px-4 font-semibold transition-colors" href="/admin">
              <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                <span className="material-symbols-outlined relative top-0 text-sm leading-normal text-blue-500">
                  dashboard
                </span>
              </div>
              <span className="duration-300 opacity-100 pointer-events-none ease">Dashboard</span>
            </Link>
          </li>

          <li className="mt-0.5 w-full">
            <Link className="text-white opacity-80 text-sm my-0 mx-2 py-[0.675rem] flex items-center whitespace-nowrap rounded-lg px-4 font-semibold transition-colors" href="/admin">
              <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                <span className="material-symbols-outlined relative top-0 text-sm leading-normal text-yellow-500">
                  account_box
                </span>
              </div>
              <span className="duration-300 opacity-100 pointer-events-none ease">User</span>
            </Link>
          </li>

          <li className="mt-0.5 w-full">
            <Link className="text-white opacity-80 text-sm my-0 mx-2 py-[0.675rem] flex items-center whitespace-nowrap rounded-lg px-4 font-semibold transition-colors" href="/admin">
              <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                <span className="material-symbols-outlined relative top-0 text-sm leading-normal text-emerald-500">
                  admin_panel_settings
                </span>
              </div>
              <span className="duration-300 opacity-100 pointer-events-none ease">Role</span>
            </Link>
          </li>

          <li className="w-full mt-4">
            <h6 className="pl-6 ml-2 text-xs font-bold leading-tight uppercase text-white opacity-60">Account pages</h6>
          </li>

          <li className="mt-0.5 w-full">
            <Link className="text-white opacity-80 text-sm my-0 mx-2 py-[0.675rem] flex items-center whitespace-nowrap rounded-lg px-4 font-semibold transition-colors" href={`/admin/profile/${userId}`}>
              <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                <span className="material-symbols-outlined relative top-0 text-sm leading-normal text-[#42c4cf]">
                  person
                </span>
              </div>
              <span className="duration-300 opacity-100 pointer-events-none ease">Profile</span>
            </Link>
          </li>

          <li className="mt-0.5 w-full">
            <button className="text-white opacity-80 text-sm my-0 mx-2 py-[0.675rem] flex items-center whitespace-nowrap rounded-lg px-4 font-semibold transition-colors" onClick={logout}>
              <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                <span className="material-symbols-outlined relative top-0 text-sm leading-normal text-red-500">
                  logout
                </span>
              </div>
              <span className="duration-300 opacity-100 pointer-events-none ease">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default Sidenav
