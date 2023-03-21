import { useState } from "react"
import { BookOpenIcon, Cog6ToothIcon, CogIcon, DocumentIcon, UserIcon } from "@heroicons/react/24/solid"
import useStore from "~/store/store"

export const ChatFeatureBody = () => {
  return (
    <div className="resize-container relative" >
      <ResizeColumn />
      <MainBody />
      <ChatBar />
    </div>
  )
}
const LanguageButton = () => {
  return (
    <button className="shrink-0 text-gray-500 dark:text-zinc-500 transition-colors  p-1.5 rounded-lg relative hover:text-gray-900 dark:hover:text-zinc-200">
      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="w-6 h-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path fill="none" d="M0 0h24v24H0z">
        </path>
        <circle cx="9" cy="9" r="4">
        </circle>
        <path d="M9 15c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm7.76-9.64l-1.68 1.69c.84 1.18.84 2.71 0 3.89l1.68 1.69c2.02-2.02 2.02-5.07 0-7.27zM20.07 2l-1.63 1.63c2.77 3.02 2.77 7.56 0 10.74L20.07 16c3.9-3.89 3.91-9.95 0-14z">
        </path>
      </svg>
    </button>
  )
}

const ChatBar = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")
  return (
    <div className="fixed z-30 bottom-0 left-0 right-0 lg:pl-80 ">
      <div className="mx-auto w-full hide-when-print transition-all max-w-3xl">
        <div className="transition-all">
          <div className="my-4 text-center w-full flex items-center justify-center flex-wrap gap-2 px-4"></div>
          <div className="px-4 pb-4 pt-0 bg-white dark:bg-zinc-800 transition-colors">
            <div className="pb-safe">
              <div className="flex items-end justify-center space-x-2 mb-2">
                <div className="w-full space-y-2 pt-2">
                  <div className={classNames(showMenu ? "flex" : "hidden", "items-center justify-center flex-col sm:flex-row space-x-0 gap-2 sm:gap-0")} >
                  </div>
                  <div className="w-full flex items-end justify-center gap-2">
                    <LanguageButton />
                    <div className="relative w-full">
                      <textarea
                        placeholder="Your message here..."
                        className="relative block w-full h-10 rounded-md p-2 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:py-1.5 sm:text-sm sm:leading-6 min-h-[36px] max-h-[500px] resize-none dark:bg-zinc-600 dark:text-white dark:ring-gray-500 dark:focus:ring-blue-500"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      >
                      </textarea>
                    </div>
                    {message && (
                      <button type="button" className="inline-flex items-center h-10 px-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-default transition-colors whitespace-nowrap space-x-1">
                        → Send
                      </button>
                    )}
                    {!message && (
                      <div className="flex items-center space-x-2 group">
                        <button className="rounded-full w-10 h-10 bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 p-2 flex items-center justify-center transition-all hover:bg-gray-200 space-x-2 shrink-0" ><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 352 512" className="w-5 h-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M176 352c53.02 0 96-42.98 96-96V96c0-53.02-42.98-96-96-96S80 42.98 80 96v160c0 53.02 42.98 96 96 96zm160-160h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38C96.71 376.89 48 317.11 48 250.3V208c0-8.84-7.16-16-16-16H16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69V464H96c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77C285.71 418.47 352 344.9 352 256v-48c0-8.84-7.16-16-16-16z"></path></svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

const ResizeColumn = () => {
  // Transitions width of chatbar between 3 sizes
  return (
    <div className="fixed top-0 right-0 bottom-0 z-10 items-center justify-between w-12 bg-gray-50 dark:bg-zinc-700/20 hover:bg-gray-200 dark:hover:bg-zinc-700 cursor-pointer transition-colors grid-cols-1 grid-rows-5 text-center group active:bg-gray-300 dark:active:bg-zinc-600 hidden xl:flex flex-col">
      <RightArrows />
      <RightArrows />
      <RightArrows />
      <RightArrows />
      <RightArrows />
    </div>
  )
}
const RightArrows = () => {
  return (
    <div className="hidden items-center justify-center text-gray-500 group-hover:flex">
      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd">
        </path><path fill-rule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd">
        </path>
      </svg>
    </div>
  )
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
const Logo = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      {/* random filler pic */}
      <svg className="h-12 w-12"
        width="76"
        height="65"
        viewBox="0 0 76 65"
        fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="#ffffff" />
      </svg>
      {/* Logo Text */}
      <div className="font-semibold text-4xl sm:text-5xl text-black dark:text-white">
        Better
        <span className="text-blue-500">
          GPT
        </span>
      </div>
      {/* Feature Ad */}
      <span className="bg-gradient-to-r from-green-500 to-cyan-500 px-3 py-1 text-xs font-semibold text-white text-center rounded-xl inline-block ">
        GPT-4 Supported!
      </span>
    </div>
  )
}
const MainBody = () => {
  const styles = ["transition-all z-20 relative max-w-full mx-12", "transition-all z-20 relative max-w-3xl mx-auto ", "transition-all z-20 relative max-w-5xl mx-auto px-12"]
  const [style, setStyle] = useState<string>(styles[0] as string)
  return (
    <div className={classNames(style, 'pb-96')}>
      <div className="py-8">
        <div className="p-6 sm:p-10 flex items-center justify-center">
          <div>
            {/* Logo  */}
            <Logo />
            {/* Message */}
            <div className="text-center font-light text-base sm:text-xl my-4 sm:my-6 text-black dark:text-white">
              An open source UI for ChatGPT
            </div>
            {/* List of features */}
            <FeatureList />
            {/* Premium Features Button */}
            <PremiumFeaturesButton />
            {/* Get Started */}
            <GetStartedAPIKeyEntry />
          </div>
        </div>
        <FeatureButtonRow />
        <Warnings />
      </div>
      <div>
      </div>
    </div >
  )
}
const Warnings = () => {
  return (
    <div className="text-red-500 text-center text-sm px-4">
      Please enter your own OpenAI API key to get started.
    </div>
  )
}
const FeatureButton = (props: { featureName: string, icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>, color: string, onClick: () => void }) => {
  return (
    <button className={classNames(props.color, "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm shadow-md text-white transition-all group space-x-2")} onClick={props.onClick}>
      <props.icon className="h-5 w-5" />
      <span>{props.featureName}</span></button>
  )
}
const ChangeModelButton = () => {
  const setModelModal = useStore(state => state.setModelModal)
  const [model, setModel] = useState<string>("GPT-3.5" as string)
  // Open modal to change model

  return (
    <FeatureButton featureName={`Model: ${model}`} icon={Cog6ToothIcon} color="bg-gradient-to-r from-green-500 to-cyan-500 active:bg-cyan-600" onClick={() => setModelModal(true)} />
  )
}
const SelectCharacterButton = () => {
  const [character, setCharacter] = useState<string>("Aiden" as string)
  // Open modal to change character
  const clickHandler = () => {
    console.log("Clicked")
  }
  return (
    <FeatureButton featureName={`Select Character`} icon={UserIcon} color="bg-indigo-600 active:bg-indigo-600 hover:bg-indigo-500" onClick={clickHandler} />
  )
}
const PromptLibraryButton = () => {
  const [prompt, setPrompt] = useState<string>("" as string)
  // Open modal to change prompt
  const clickHandler = () => {
    console.log("Clicked")
  }
  return (
    <FeatureButton featureName={`Prompt Library`} icon={BookOpenIcon} color="bg-gradient-to-r from-yellow-500 to-yellow-600 active:bg-yellow-700" onClick={clickHandler} />
  )
}
const UploadButton = () => {
  const [upload, setUpload] = useState<string>("" as string)
  // Open modal to change upload
  const clickHandler = () => {
    console.log("Clicked")
  }
  return (
    <FeatureButton featureName={`Upload Document`} icon={DocumentIcon} color="bg-gradient-to-r from-red-500 to-red-600 active:bg-red-700" onClick={clickHandler} />
  )
}

const FeatureButtonRow = () => {
  return (
    <div className="my-4 text-center flex items-center justify-center flex-wrap gap-2 px-4">
      <ChangeModelButton />
      <SelectCharacterButton />
      <PromptLibraryButton />
      <UploadButton />
    </div>
  )
}
const GetStartedAPIKeyEntry = () => {
  return (
    <div className="mt-10 ">
      <div className="text-sm mt-10 text-center space-y-4">
        <div>
          <div>
            To get started, enter your OpenAI API key below.
          </div>
          <div className="text-xs">
            Your API Key is stored locally on your browser and never sent anywhere else.
          </div>
        </div>
        <div>
          <button id="enter-api-key-btn" className="inline-flex items-center justify-center rounded-full px-4 py-3 text-sm shadow-md bg-blue-600 text-white hover:bg-blue-500 transition-all active:bg-blue-600 group font-semibold disabled:bg-gray-400 space-x-2"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" className="w-5 h-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M218.1 167.17c0 13 0 25.6 4.1 37.4-43.1 50.6-156.9 184.3-167.5 194.5a20.17 20.17 0 00-6.7 15c0 8.5 5.2 16.7 9.6 21.3 6.6 6.9 34.8 33 40 28 15.4-15 18.5-19 24.8-25.2 9.5-9.3-1-28.3 2.3-36s6.8-9.2 12.5-10.4 15.8 2.9 23.7 3c8.3.1 12.8-3.4 19-9.2 5-4.6 8.6-8.9 8.7-15.6.2-9-12.8-20.9-3.1-30.4s23.7 6.2 34 5 22.8-15.5 24.1-21.6-11.7-21.8-9.7-30.7c.7-3 6.8-10 11.4-11s25 6.9 29.6 5.9c5.6-1.2 12.1-7.1 17.4-10.4 15.5 6.7 29.6 9.4 47.7 9.4 68.5 0 124-53.4 124-119.2S408.5 48 340 48s-121.9 53.37-121.9 119.17zM400 144a32 32 0 11-32-32 32 32 0 0132 32z">
            </path>
          </svg>
            <span>
              Enter API Key
            </span>
          </button>
        </div>
        <div className="text-center">
          <a className="text-blue-500 text-xs hover:underline" target="_blank" rel="noopener noreferrer" href="https://platform.openai.com/account/api-keys">
            → Get your API key from Open AI dashboard.
          </a>
        </div>
      </div>
    </div>
  )
}
const PremiumFeaturesButton = () => {
  return (
    <div className="text-center">
      <button type="button" className="inline-flex items-center justify-center rounded-md border-gray-500 border dark:hover:bg-zinc-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 py-2 px-2 space-x-2 text-sm"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" className="h-6 w-6 text-red-500" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M160 894c0 17.7 14.3 32 32 32h286V550H160v344zm386 32h286c17.7 0 32-14.3 32-32V550H546v376zm334-616H732.4c13.6-21.4 21.6-46.8 21.6-74 0-76.1-61.9-138-138-138-41.4 0-78.7 18.4-104 47.4-25.3-29-62.6-47.4-104-47.4-76.1 0-138 61.9-138 138 0 27.2 7.9 52.6 21.6 74H144c-17.7 0-32 14.3-32 32v140h366V310h68v172h366V342c0-17.7-14.3-32-32-32zm-402-4h-70c-38.6 0-70-31.4-70-70s31.4-70 70-70 70 31.4 70 70v70zm138 0h-70v-70c0-38.6 31.4-70 70-70s70 31.4 70 70-31.4 70-70 70z">
        </path>
      </svg>
        <span>
          View Premium Features
        </span>
      </button>
    </div>
  )
}
const FeatureList = () => {
  const features = ["GPT-4 Support", "Better UI", "More Features", "Chat History Search", "More to come..."]
  return (
    <div className="flex items-center justify-center">
      <div className="my-4 grid sm:grid-cols-2 gap-y-2 gap-x-6">
        {features.map((feature, index) => {
          return (
            <Feature featureName={feature} key={index} />
          )
        })}
      </div>
    </div>
  )
}
const Feature = (props: { featureName: string }) => {
  return (
    <div className="flex items-center justify-start space-x-1">
      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" className="text-green-500 w-4 h-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z">
        </path>
      </svg>
      <div className="text-sm">
        {props.featureName}
      </div>
    </div>
  )
}

export default ChatFeatureBody