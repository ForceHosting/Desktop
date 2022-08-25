import React, { useEffect, useState } from "react";
import Nav from 'components/Nav';
import { useNavigate } from "react-router-dom";
import { siteName } from "config";
import MinecraftBackground from 'assets/minecraft-img.jpg';
import axios from "axios";
import {Buffer} from 'buffer';
import { createWebHostingAccountRoute, getWebHostingAccountRoute } from "utils/APIRoutes";

export default function WebHosting(currentUser, socket) {

    useEffect(()=>{
        document.title = siteName+ " - Web Hosting"
    })

    const navigate = useNavigate();
    const [username, setUsername] = useState(undefined)
    //const [userUid, setUid] = useState(undefined)
    const [panelUser, setPanelUser] = useState(undefined)
    const [panelPwd, setPanelPwd] = useState(undefined)
    const [getDomain, setDomain] = useState(undefined)
    const [getPlan, setPlan] = useState(undefined)
    const [userEmail, setEmail] = useState(undefined)
    const [showModal, setShowModal] = useState(false)
    const [discordLink, setLinkId] = useState(undefined)
    const [values, setValues] = useState({
        domain: ""
      });

    useEffect(() => {
        (async function() {
          
      if (!localStorage.getItem(process.env.USER_KEY)) {
        navigate("/login");
      } else {
        const data = await JSON.parse(localStorage.getItem(process.env.USER_KEY));
        setUsername(data.username)
        setEmail(data.email)
        //setUid(data._id)
      }
    })();
    }, [navigate]);

    const handleGenerate = async (event) => {
        event.preventDefault()
        const data = await JSON.parse(localStorage.getItem(process.env.USER_KEY));
        setLinkId(data._id)
        setShowModal(true)
    }
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
      };
      const handleWebCreation = async (event) => {
        event.preventDefault();
        const { domain } = values;
        const userdata = await JSON.parse(localStorage.getItem(process.env.USER_KEY));
        const userId = userdata._id
          const { data } = await axios.post(createWebHostingAccountRoute, {
            domain,
            userEmail,
            userId,
            username
          });
    
          if (data.status === false) {
            console.log(data.msg)
          }
          if (data.status === true) {
            const { webData } = await axios.get(getWebHostingAccountRoute+`/${userId}`)
            let base64ToString = Buffer.from(webData.panelPwd, "base64").toString();
            setPanelUser(webData.panelUser)
            setPanelPwd(base64ToString)
            setDomain(webData.planDomain)
            setPlan(webData.planType)
            setShowModal(false)
            console.log(data)
          }
      };

    return (
        <>
        <Nav username={username} />
        <main className="container mx-w-6xl mx-auto py-4">

      <div className="w-full p-6 mx-auto">
        <div className="flex flex-wrap -mx-3">
          <div className="w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-0">
            <div className="relative flex flex-col min-w-0 break-words bg-gray-700 border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div className="border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6 pb-0">
                <div className="flex items-center">
                  <p className="mb-0 text-xl dark:text-white/80">Your Web Hosting InhtmlFormation</p>
                 </div>
              </div>
              <div className="flex-auto p-6">
                <p className="leading-normal uppercase text-white opacity-60 text-size-sm">User InhtmlFormation</p>
                <div className="flex flex-wrap -mx-3">
                  <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                    <div className="mb-4">
                      <label htmlFor="username" className="inline-block mb-2 ml-1 font-bold text-size-xs text-white/80">Domain</label>
                      <input type="text" name="username" value={'test.test.test'} className="focus:shadow-primary-outline bg-gray-600 dark:text-white text-size-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-clip-padding px-3 py-2 font-normal text-white outline-none transition-all placeholder:text-white focus:border-blue-500 focus:outline-none" />
                    </div>
                  </div>
                  <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                    <div className="mb-4">
                      <label htmlFor="email" className="inline-block mb-2 ml-1 font-bold text-size-xs text-white/80">Plan</label>
                      <input type="email" name="email" value={"Free"} className="focus:shadow-primary-outline dark:bg-slate-850 text-size-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-gray-600 bg-clip-padding px-3 py-2 font-normal text-white outline-none transition-all placeholder:text-white focus:border-blue-500 focus:outline-none" />
                    </div>
                  </div>
                </div>
                <hr className="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent " />
                
                <p className="leading-normal uppercase dark:text-white dark:opacity-60 text-size-sm"></p>
                <div className="flex flex-wrap -mx-3">
                  <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                    <div className="mb-4">
                      <label htmlFor="city" className="inline-block mb-2 ml-1 font-bold text-size-xs text-slate-700 dark:text-white/80">Panel Username</label>
                      <button className="focus:shadow-primary-outline text-white text-size-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-gray-600 bg-clip-padding px-3 py-2 font-normal outline-none transition-all placeholder:text-white focus:border-blue-500 focus:outline-none" onClick={() => navigator.clipboard.writeText(panelUser)}>{panelUser}</button>
                    </div>
                  </div>
                  <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                    <div className="mb-4">
                      <label htmlFor="postal code" className="inline-block mb-2 ml-1 font-bold text-size-xs text-slate-700 dark:text-white/80">Panel Password</label>
                      <button className="focus:shadow-primary-outline text-white text-size-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-gray-600 bg-clip-padding px-3 py-2 font-normal outline-none transition-all placeholder:text-white focus:border-blue-500 focus:outline-none" onClick={() => navigator.clipboard.writeText(panelPwd)}>************</button>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full max-w-full px-3 mt-6 shrink-0 md:w-4/12 md:flex-0 md:mt-0">
            <div className="relative flex flex-col min-w-0 break-words bg-gray-700 border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <img className="w-full rounded-t-2xl" src={MinecraftBackground} alt="background"/>

              <div className="border-black/12.5 rounded-t-2xl p-6 text-center pt-0 pb-6 lg:pt-2 lg:pb-4">
                <h2 className="text-white font-bold text-lg text-center">Discord Account</h2>
                <p className="mt-1 pl-7 text-lg md:text-md text-gray-50 font-light leading-tight max-w-sm">Want to view your resources, manage your account, and even look at the queue from Discord? If so just press the link account button below and a unique code will be generated.</p>
              </div>

              <div className="flex flex-auto items-center p-6 pt-0">
              <button onClick={(event) => handleGenerate(event)}
                            className="bg-blue-600 px-4 py-3 rounded-lg text-white text-xs tracking-wider font-semibold mx-auto hover:bg-blue-600 hover:text-white">
                            Generate Code
                        </button>
              </div>
            </div>
          </div>
          </div>
          </div>
          </main>
          {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none bg-gray-700">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-white">
                    How to Link
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-lg leading-relaxed text-white">
                    To link your account to Discord, please run the following command in one of our channels.
                  </p>
                  <code className="text-lg leading-relaxed rounded bg-slate-800 text-red-600 text-bold">
                       /acclink {discordLink}
                    </code>
                    <p className="my-4 text-lg leading-relaxed text-white">
                        Once you've ran this command, you're all set! You can run commands such as <code className="text-lg leading-relaxed rounded bg-slate-800 text-red-600 text-bold">
                       /resources
                    </code> to view your current resources.
                    </p>
                    <form action="" onSubmit={(event) => handleWebCreation(event)}>
                <div className="mb-6">
    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your Domain</label>
    <input type="domain" name="domain" onChange={(e) => handleChange(e)} id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="contact@example.com" required/>
  </div>
  <div className="flex items-start mb-6">
  </div>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
    )
}