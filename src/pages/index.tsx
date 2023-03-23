import { Bars3Icon, ChatBubbleLeftEllipsisIcon, CheckIcon, Cog8ToothIcon, ExclamationTriangleIcon, GiftIcon, PencilSquareIcon, PlusCircleIcon, ShieldExclamationIcon, StarIcon, TrashIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { type NextPage } from "next";
import Head from "next/head";
import { MouseEventHandler, useEffect, useState } from "react";
import MainWindow from "~/components/ChatWindow/ChatWindow";
import ApiKeyModal from "~/components/modals/ApiKeyModal";
import ChangeModelModal from "~/components/modals/ChangeModelModal";
import useStore, { getProfile, getThread, loadData } from "~/store/store";
import type { Thread } from "~/types/appstate";

const Home: NextPage = () => {
  const setProfile = useStore((state) => state.setProfile);
  const setProfiles = useStore((state) => state.setProfiles);
  const setThreads = useStore((state) => state.setThreads);
  const selectedProfile = useStore((state) => state.selectedProfile);
  const setSelectedProfile = useStore((state) => state.setSelectedProfile);
  useEffect(() => {
    const data = loadData();
    if (!data) {
      return
    }
    if (data.selectedProfile) {
      setSelectedProfile(data.selectedProfile)
    }
    if (data.profile) {
      setProfile(data.profile)
    }
    if (data.profiles) {
      setProfiles(data.profiles)
    }
    if (data.threads) {
      setThreads(data.threads)
    }
  }, [setProfile, setProfiles, setThreads, setSelectedProfile]);

  useEffect(() => {
    if (selectedProfile) {
      const profile = getProfile(selectedProfile)
      if (profile) {
        setProfile(profile)
        if (profile.threadIds) {
          const threads = profile.threadIds.map((id) => {
            return getThread(id)
          }) as Thread[]
          setThreads(threads)
        }
      }
    }
  }, [selectedProfile, setProfile, setThreads]);
  return (
    <>
      <Head>
        <title>Better-GPT</title>
        <meta name="description" content="Open Source Interface for GPT APIs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Modals */}
      <ApiKeyModal />
      <ChangeModelModal />
      <div className="min-h-screen bg-white text-black dark:bg-zinc-800 dark:text-white transition-colors">
        {/* big scween */}
        <Sidebar />
        {/* small screen */}
        <div className="flex flex-1 flex-col lg:pl-80">
          <main className="relative">
            <TopBar />
            <MainWindow />
          </main>
        </div>
      </div>
    </>
  );
};
const Navbar = () => {
  const resetThread = useStore((state) => state.resetThread);
  const newChatHandler = () => {
    resetThread()
  }
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
      <div className="flex flex-1 flex-col overflow-y-auto pb-4">
        <div className="flex-1 space-y-2 bg-gray-800 flex flex-col">
          <div className="px-2 space-y-2 sticky z-30 top-0 bg-gray-800 py-2">
            <div className="flex items-center justify-center space-x-2">
              <button className="bg-gray-600 text-white group flex items-center justify-center rounded-md px-2 py-2 text-sm font-medium w-full hover:bg-gray-500 transition-all"
                onClick={newChatHandler}
              >
                <PlusCircleIcon className="text-gray-300 mr-2 h-6 w-6 flex-shrink-0" />
                New Chat
              </button>
              <button className="bg-gray-600 text-white group flex items-center justify-center rounded-md px-2 py-2 text-sm font-medium hover:bg-gray-500 transition-all w-12 shrink-0"
              >
                <Cog8ToothIcon className="text-gray-300 h-6 w-6 flex-shrink-0" />
              </button>
            </div>
            {/* Search for chats */}
            {/* <div className="relative flex items-center space-x-2">
              <div className="relative w-full">
                <input type="text" placeholder="Search chats..." className="bg-gray-700 text-white px-2 py-1 rounded-md w-full"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button className="text-gray-500 hover:text-white transiton-all flex items-center justify-center w-12 shrink-0"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" className="w-6 h-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M464,128H272L208,64H48A48,48,0,0,0,0,112V400a48,48,0,0,0,48,48H464a48,48,0,0,0,48-48V176A48,48,0,0,0,464,128ZM359.5,296a16,16,0,0,1-16,16h-64v64a16,16,0,0,1-16,16h-16a16,16,0,0,1-16-16V312h-64a16,16,0,0,1-16-16V280a16,16,0,0,1,16-16h64V200a16,16,0,0,1,16-16h16a16,16,0,0,1,16,16v64h64a16,16,0,0,1,16,16Z"></path></svg>
              </button>
            </div> */}
            <StarredChats />
          </div>
          {/* <CreateFolderForm /> */}
          <ThreadList />
          {/* Implement Drag n Drop for Chats */}
        </div>
      </div>
    </div>
  )
}
const LicenseCluster = () => {
  const setApiKeyModal = useStore((state) => state.setApiKeyModal)
  const profile = useStore((state) => state.profile)
  return (
    <div className="flex items-center justify-center">
      <div className="mb-2 grid grid-cols-2 gap-2">
        {/* <div className=" text-xs text-white font-semibold flex items-center justify-end">
          License Key
        </div>
        <div>
          <button className="bg-gray-600 text-white group flex items-center justify-center rounded-md px-2 py-1 text-xs font-medium w-full hover:bg-gray-500 transition-all">
            <ExclamationTriangleIcon className="text-yellow-500 mr-2 h-4 w-4 flex-shrink-0" />
            Unlicensed
          </button>
        </div> */}
        <div className="text-xs text-white font-semibold flex items-center justify-end">
          OpenAI API Key
        </div>
        <div className="flex items-center relative">
          <div className="">
            <button className="bg-gray-600 text-white group flex items-center justify-center rounded-md px-2 py-1 text-xs font-medium w-full hover:bg-gray-500 transition-all space-x-1"
              onClick={() => setApiKeyModal(true)}
            >
              {profile.key
                ? (<>
                  <CheckIcon className="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
                  <span>
                    { // parse as dollars, show hundredth thousandths
                      `$${(profile.cost / 1000).toFixed(5)}`
                    }
                  </span>
                </>)
                : (<>
                  <ExclamationTriangleIcon className="h-4 w-4 mr-2 text-yellow-500" />
                  <span>
                    {`Enter API Key`}
                  </span>
                </>)}
            </button>
          </div>
          {/* OpenAI Status Button */}
          <button className="flex items-center justify-center absolute left-full ml-2">
            <div className="h-3 w-3 rounded-full bg-green-500">
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
const AccountCorner = () => {
  return (
    <div className="flex flex-col flex-shrink-0 bg-gray-700 p-3 justify-center space-y-1">
      <LicenseCluster />
      <div className="border-t border-gray-500 py-1" />
      <Copyright />
      <PrivacyPolicy />
      <FeedbackThemeVolume />
    </div>
  )
}
const FeedbackThemeVolume = () => {
  return (
    <div className="text-center flex items-center justify-center pb-safe">
      <div>
        <button type="button" className="bg-gray-600 text-white group flex items-center justify-center rounded-md px-2 py-1 text-xs hover:bg-gray-500 transition-all space-x-2 mr-2">

          <ShieldExclamationIcon className="h-4 w-4" />
          <span>Send Feedback</span>
        </button>
      </div>
      {/* Dark mode toggle */}
      {/* <button type="button" className="bg-gray-600 text-white group flex items-center justify-center rounded-md px-2 py-1 text-xs hover:bg-gray-500 transition-all space-x-2 mr-2">
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
      </button> */}
      {/* <button type="button" className="bg-gray-600 text-white group flex items-center justify-center rounded-md px-2 py-1 text-xs hover:bg-gray-500 transition-all space-x-2 mr-2">
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" className="w-4 h-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z"></path></svg>
      </button> */}
    </div>
  )
}
const PrivacyPolicy = () => {
  return (
    <div className="text-xs text-gray-400 text-center flex gap-1 justify-center">
      <a href="/privacy" target="_blank" className="hover:underline">
        Privacy
      </a>
      |
      <a href="/terms" target="_blank" className="hover:underline">
        Terms
      </a>
      |
      <a href="/faqs" target="_blank" className="hover:underline">
        FAQs
      </a>
      |
      <a rel="noopener noreferrer" href="https://openai.com" target="_blank" className="hover:underline">
        Changelog
      </a>
    </div>
  )
}
const Copyright = () => {
  const website = "better-chat.vercel.app"
  return (
    <div className="text-xs text-gray-400 font-semibold text-center">
      <a href="https://openai.com" className="px-1">
        {website}
      </a>
      ©
      <span className="px-1">
        2023
      </span>
    </div>
  )
}
const Sidebar = () => {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-80 lg:flex-col z-40">
      <Navbar />
      <AccountCorner />
    </div>
  )
}
const StarredChats = () => {
  const threads = useStore((state) => state.threads)
  const selectedThread = useStore((state) => state.thread)
  return (
    <>
      <div className="max-h-[200px] overflow-auto">
        {threads.map((thread) => (
          <StarredChat  {...thread} key={thread.id} selected={selectedThread.id === thread.id} />
        ))}
      </div>
      {threads.length > 0 && (<hr className="border-gray-700"></hr>)}
    </ >
  )
}

const SidebarChatButton = (props: Thread & { selected: boolean }) => {
  const profile = useStore((state) => state.profile)
  const setProfile = useStore((state) => state.setProfile)
  const setThread = useStore((state) => state.setThread)
  const starThreadHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    setThread({ ...props, starred: !props.starred })
  }
  const deleteThread = useStore((state) => state.deleteThread)
  const [deleting, setDeleting] = useState(false)
  const deleteHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    deleteThread({ ...props })
    setProfile({ ...profile, threadIds: profile.threadIds.filter(id => id !== props.id) })
  }
  const selectHandler = () => {
    if (props.selected) return
    setThread({ ...props })
  }


  return (
    <div role="button" onClick={selectHandler}>
      <div className="select-none lg:select-auto touch-manipulation">
        <div className={classNames(props?.selected ? "bg-gray-900" : "hover:bg-gray-700 hover:text-white", " text-white group flex items-center text-sm font-medium w-full space-x-2 justify-between overflow-hidden")}>
          <div className="flex items-center justify-start gap-x-2 min-w-0 w-full px-2 py-2 text-sm group cursor-pointer">
            <ChatBubbleLeftEllipsisIcon className="text-gray-300 h-6 w-6 flex-shrink-0 hidden sm:block sm:group-hover:hidden" />
            <button className="flex-shrink-0  sm:hidden sm:group-hover:block"
              onClick={starThreadHandler} >
              <StarIconOutline className="h-6 w-6" />
            </button>
            <div className="space-y-1 text-left w-full min-w-0">
              <div className="text-gray-100 truncate w-full">
                {props.title}
              </div>
              <div className="text-xs text-gray-400 font-normal truncate w-full">
                {props.messages[props.messages.length - 1]?.content}
              </div>
            </div>
          </div>
          <div className="pr-2">
            <div className="flex items-center justify-center space-x-2">
              <button className="text-gray-500 hover:text-white transiton-all">
                <PencilSquareIcon className="w-6 h-6 sm:w-4 sm:h-4" />
              </button>
              <button className="text-gray-500 hover:text-white transiton-all"
              >
                {!deleting &&
                  <button className="text-gray-500 hover:text-white transiton-all"
                    onClick={() => setDeleting(true)}>
                    <TrashIcon className="w-6 h-6 sm:w-4 sm:h-4" />
                  </button>
                }
                {deleting &&
                  <button className="text-red-500 hover:text-white transiton-all"
                    onClick={deleteHandler}>
                    <TrashIcon className="w-6 h-6 sm:w-4 sm:h-4" />
                  </button>
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
const ThreadList = () => {
  const threads = useStore((state) => state.threads)
  const selectedThread = useStore((state) => state.thread)
  return (
    <div className="flex-1 pb-4">
      {threads.map((thread) => {
        return (
          <SidebarChatButton  {...thread} key={thread.id} selected={selectedThread.id === thread.id} />
        )
      })}
    </div>
  )
}
const CreateFolderForm = () => {
  const [editable, setEditable] = useState<boolean>(false)
  const [deleting, setDeleting] = useState<boolean>(false)
  return (
    <div>
      <div>
        <div className="focus-within:bg-gray-900 focus-within:text-white text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center text-sm font-medium w-full space-x-2 justify-between overflow-hidden" role="button" aria-disabled="false" aria-roledescription="sortable" aria-describedby="DndDescribedBy-0">
          <button className="flex items-center justify-start space-x-2 min-w-0 w-full px-2 py-2 text-sm">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" className="text-gray-300 h-6 w-6 flex-shrink-0" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <div className="space-y-1 text-left w-full min-w-0">
              <textarea className="bg-gray-900 h-5 text-white rounded-sm px-0 py-0 border-0 ring-blue-500 focus:ring-2 ring-2 sm:text-sm font-medium w-full text-base" defaultValue={'New Folder'}>

              </textarea>
            </div>
          </button>
          <div className="pr-2">
            <div className="flex items-center justify-center space-x-2">
              {!editable && <button className="text-gray-500 hover:text-white transiton-all"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" className="w-6 h-6 sm:w-4 sm:h-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
              </button>}
              {editable && <button className="text-gray-500 hover:text-white transiton-all"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" className="w-6 h-6 sm:w-4 sm:h-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32zm-622.3-84c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9z"></path></svg></button>}
              {!deleting && <button className="text-gray-500 hover:text-white transiton-all">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 352 512" className="w-6 h-6 sm:w-4 sm:h-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
              </button>}
              {deleting && <span className="text-red-500 text-xs hover:underline">Sure?</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const StarredChat = (props: Thread & { selected: boolean }) => {
  const profile = useStore((state) => state.profile)
  const setProfile = useStore((state) => state.setProfile)
  const setThread = useStore((state) => state.setThread)
  const threads = useStore((state) => state.threads)
  const setThreads = useStore((state) => state.setThreads)
  const starThreadHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    setThread({ ...props, starred: !props.starred })
    setThreads(threads.map(thread => thread.id === props.id ? { ...thread, starred: !thread.starred } : thread))
  }
  const deleteThread = useStore((state) => state.deleteThread)
  const [deleting, setDeleting] = useState(false)
  const deleteHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    deleteThread({ ...props })
    setProfile({ ...profile, threadIds: profile.threadIds.filter(id => id !== props.id) })
  }
  const selectHandler = () => {
    if (props.selected) return
    setThread({ ...props })
  }

  return (
    <div className={classNames(props.selected ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white", " group flex items-center text-sm font-medium w-full space-x-2 justify-between overflow-hidden")}
      onClick={selectHandler}
    >
      <div className="flex items-center justify-start gap-x-2 min-w-0 w-full px-2 py-2 text-sm group cursor-pointer">
        <button className="flex-shrink-0" onClick={starThreadHandler}>
          <StarIcon className="text-yellow-500 h-4 w-4" />
        </button>
        <div className="space-y-1 text-left w-full min-w-0">
          <div className="text-gray-100 truncate w-full">{props.title}</div>
        </div>
      </div>
      <div className="pr-2">
        <div className="flex items-center justify-center space-x-2">
          <button className="text-gray-500 hover:text-white transiton-all">
            <PencilSquareIcon className="w-6 h-6 sm:w-4 sm:h-4" />
          </button>
          {!deleting &&
            <button className="text-gray-500 hover:text-white transiton-all"
              onClick={() => setDeleting(true)}>
              <TrashIcon className="w-6 h-6 sm:w-4 sm:h-4" />
            </button>
          }
          {deleting &&
            <button className="text-red-500 hover:text-white transiton-all"
              onClick={deleteHandler}>
              <TrashIcon className="w-6 h-6 sm:w-4 sm:h-4" />
            </button>
          }
        </div>
      </div>
    </div>
  )
}


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}


const TopBar = () => {
  return (
    <div className="hide-when-print sticky top-0 z-30 bg-white dark:bg-zinc-700 backdrop-blur">
      <div className="flex lg:hidden absolute left-1 top-0 bottom-0 items-center justify-center">
        <button type="button" className="inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:hover:text-gray-100">
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon />
        </button>
      </div>
      <div className="absolute right-2 top-0 bottom-0 flex items-center justify-center" >
        <button className="inline-flex items-center justify-center rounded-md text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 py-2 px-2 space-x-2 text-sm">
          <GiftIcon className="h-6 w-6 text-red-500" />
        </button>
      </div>
      <div className="flex items-center justify-center w-full p-2 border-bottom-2 border-gray-200 shadow-bottom flex-col min-w-0">
        <div className="font-semibold truncate w-full text-center px-12 text-black dark:text-white">New Chat</div>
        <div className="text-xs text-gray-400">Start a new chat</div>
      </div>
    </div>
  )
}
export default Home;
