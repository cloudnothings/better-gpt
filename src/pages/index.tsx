import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";


const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Better-GPT</title>
        <meta name="description" content="Better Interface for GPT-4" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-full bg-white text-black dark:bg-zinc-800 dark:text-white transition-colors">

        {/* small screen */}
        <div className="flex flex-1 flex-col lg:pl-80">
          <main className="relative">
            <TopBar />
            <ChatFeatureBody />
          </main>
        </div>
      </div>
    </>
  );
};
const ChatFeatureBody = () => {
  return (
    <div className="resize-container relative" >
      <ResizeColumn />
      <ProductBody />
    </div>
  )
}
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
const ProductBody = () => {
  const styles = ["transition-all z-20 relative max-w-full mx-12", "transition-all z-20 relative max-w-3xl mx-auto ", "transition-all z-20 relative max-w-5xl mx-auto px-12"]
  const [style, setStyle] = useState<string>(styles[0] as string)
  return (
    <div className={classNames(style, 'pb-[162px] sm:pb-[158px]')}>
      <div className="py-8">
        <div className="p-6 sm:p-10 flex items-center justify-center">
          <div>
            {/* Logo  */}
            <div className="flex items-center justify-center space-x-2">
              {/* random filler pic */}
              <img src="https://pbs.twimg.com/profile_images/1362643372746305536/UPgcdZyX_400x400.jpg" alt="Typing Mind" className="rounded-lg w-12 h-12" />
              <div className="font-semibold text-4xl sm:text-5xl text-black dark:text-white ">Typing
                <span className="text-blue-500">
                  Mind
                </span>
              </div>
              <span className="bg-gradient-to-r from-green-500 to-cyan-500 px-3 py-1 text-xs font-semibold text-white text-center rounded-xl inline-block ">
                GPT-4 Supported!
              </span>
            </div>
            {/* Message */}
            <div className="text-center font-light text-base sm:text-xl my-4 sm:my-6 text-black dark:text-white">
              A better UI for ChatGPT
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
      </div>
      <div>
      </div>
    </div >
  )
}
const FeatureButton = (props: { featureName: string }) => {
  const purpleButton = "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm shadow-md bg-indigo-600 text-white hover:bg-indigo-500 transition-all active:bg-indigo-600 group space-x-2"
  const orangeButton = "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm shadow-md bg-orange-600 text-white hover:bg-orange-500 transition-all active:bg-orange-600 group space-x-2"
  const yellowButton = "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm shadow-md bg-yellow-500 text-white hover:bg-brown-500 transition-all active:bg-brown-600 group space-x-2"
  return (
    <button className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm shadow-md text-white bg-gradient-to-r from-green-500 to-cyan-500 transition-all active:bg-cyan-600 group space-x-2">
      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" className="w-4 h-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M859.3 569.7l.2.1c3.1-18.9 4.6-38.2 4.6-57.3 0-17.1-1.3-34.3-3.7-51.1 2.4 16.7 3.6 33.6 3.6 50.5 0 19.4-1.6 38.8-4.7 57.8zM99 398.1c-.5-.4-.9-.8-1.4-1.3.7.7 1.4 1.4 2.2 2.1l65.5 55.9v-.1L99 398.1zm536.6-216h.1l-15.5-83.8c-.2-1-.4-1.9-.7-2.8.1.5.3 1.1.4 1.6l15.7 85zm54 546.5l31.4-25.8 92.8 32.9c17-22.9 31.3-47.5 42.6-73.6l-74.7-63.9 6.6-40.1c2.5-15.1 3.8-30.6 3.8-46.1s-1.3-31-3.8-46.1l-6.5-39.9 74.7-63.9c-11.4-26-25.6-50.7-42.6-73.6l-92.8 32.9-31.4-25.8c-23.9-19.6-50.6-35-79.3-45.8l-38.1-14.3-17.9-97a377.5 377.5 0 0 0-85 0l-17.9 97.2-37.9 14.3c-28.5 10.8-55 26.2-78.7 45.7l-31.4 25.9-93.4-33.2c-17 22.9-31.3 47.5-42.6 73.6l75.5 64.5-6.5 40c-2.5 14.9-3.7 30.2-3.7 45.5 0 15.2 1.3 30.6 3.7 45.5l6.5 40-75.5 64.5c11.4 26 25.6 50.7 42.6 73.6l93.4-33.2 31.4 25.9c23.7 19.5 50.2 34.9 78.7 45.7l37.8 14.5 17.9 97.2c28.2 3.2 56.9 3.2 85 0l17.9-97 38.1-14.3c28.8-10.8 55.4-26.2 79.3-45.8zm-177.1-50.3c-30.5 0-59.2-7.8-84.3-21.5C373.3 627 336 568.9 336 502c0-97.2 78.8-176 176-176 66.9 0 125 37.3 154.8 92.2 13.7 25 21.5 53.7 21.5 84.3 0 97.1-78.7 175.8-175.8 175.8zM207.2 812.8c-5.5 1.9-11.2 2.3-16.6 1.2 5.7 1.2 11.7 1 17.5-1l81.4-29c-.1-.1-.3-.2-.4-.3l-81.9 29.1zm717.6-414.7l-65.5 56c0 .2.1.5.1.7l65.4-55.9c7.1-6.1 11.1-14.9 11.2-24-.3 8.8-4.3 17.3-11.2 23.2z"></path><path d="M935.8 646.6c.5 4.7 0 9.5-1.7 14.1l-.9 2.6a446.02 446.02 0 0 1-79.7 137.9l-1.8 2.1a32 32 0 0 1-35.1 9.5l-81.3-28.9a350 350 0 0 1-99.7 57.6l-15.7 85a32.05 32.05 0 0 1-25.8 25.7l-2.7.5a445.2 445.2 0 0 1-79.2 7.1h.3c26.7 0 53.4-2.4 79.4-7.1l2.7-.5a32.05 32.05 0 0 0 25.8-25.7l15.7-84.9c36.2-13.6 69.6-32.9 99.6-57.5l81.2 28.9a32 32 0 0 0 35.1-9.5l1.8-2.1c34.8-41.1 61.5-87.4 79.6-137.7l.9-2.6c1.6-4.7 2.1-9.7 1.5-14.5z"></path><path d="M688 502c0-30.3-7.7-58.9-21.2-83.8C637 363.3 578.9 326 512 326c-97.2 0-176 78.8-176 176 0 66.9 37.3 125 92.2 154.8 24.9 13.5 53.4 21.2 83.8 21.2 97.2 0 176-78.8 176-176zm-288 0c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390c29.9 0 58 11.6 79.2 32.8A111.6 111.6 0 0 1 624 502c0 29.9-11.7 58-32.8 79.2A111.6 111.6 0 0 1 512 614c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 0 1 400 502z"></path><path d="M594.1 952.2a32.05 32.05 0 0 0 25.8-25.7l15.7-85a350 350 0 0 0 99.7-57.6l81.3 28.9a32 32 0 0 0 35.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l.9-2.6c1.7-4.6 2.2-9.4 1.7-14.1-.9-7.9-4.7-15.4-11-20.9l-65.3-55.9-.2-.1c3.1-19 4.7-38.4 4.7-57.8 0-16.9-1.2-33.9-3.6-50.5-.3-2.2-.7-4.4-1-6.6 0-.2-.1-.5-.1-.7l65.5-56c6.9-5.9 10.9-14.4 11.2-23.2.1-4-.5-8.1-1.9-12l-.9-2.6a443.74 443.74 0 0 0-79.7-137.9l-1.8-2.1a32.12 32.12 0 0 0-35.1-9.5l-81.3 28.9c-30-24.6-63.4-44-99.6-57.6h-.1l-15.7-85c-.1-.5-.2-1.1-.4-1.6a32.08 32.08 0 0 0-25.4-24.1l-2.7-.5c-52.1-9.4-106.9-9.4-159 0l-2.7.5a32.05 32.05 0 0 0-25.8 25.7l-15.8 85.4a351.86 351.86 0 0 0-99 57.4l-81.9-29.1a32 32 0 0 0-35.1 9.5l-1.8 2.1a446.02 446.02 0 0 0-79.7 137.9l-.9 2.6a32.09 32.09 0 0 0 7.9 33.9c.5.4.9.9 1.4 1.3l66.3 56.6v.1c-3.1 18.8-4.6 37.9-4.6 57 0 19.2 1.5 38.4 4.6 57.1L99 625.5a32.03 32.03 0 0 0-9.3 35.2l.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1c4.9 5.7 11.4 9.4 18.5 10.7 5.4 1 11.1.7 16.6-1.2l81.9-29.1c.1.1.3.2.4.3 29.7 24.3 62.8 43.6 98.6 57.1l15.8 85.4a32.05 32.05 0 0 0 25.8 25.7l2.7.5c26.1 4.7 52.8 7.1 79.5 7.1h.3c26.6 0 53.3-2.4 79.2-7.1l2.7-.5zm-39.8-66.5a377.5 377.5 0 0 1-85 0l-17.9-97.2-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5 0-15.3 1.2-30.6 3.7-45.5l6.5-40-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2 31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3 17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97 38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8 92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L781.8 426l6.5 39.9c2.5 15.1 3.8 30.6 3.8 46.1s-1.3 31-3.8 46.1l-6.6 40.1 74.7 63.9a370.03 370.03 0 0 1-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3-17.9 97z"></path></svg>
      <span>{props.featureName}</span></button>
  )
}
const FeatureButtonRow = () => {
  const features = ["Model: GPT-3.5", "Select Character", "Prompt Library", "Upload Document"]
  return (
    <div className="my-4 text-center flex items-center justify-center flex-wrap gap-2 px-4">
      {features.map((feature, index) => {
        return (
          <FeatureButton key={index} featureName={feature} />
        )
      })}
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
const TopBar = () => {
  return (
    <div className="hide-when-print sticky top-0 z-30 bg-white dark:bg-zinc-700 backdrop-blur">
      <div className="flex lg:hidden absolute left-1 top-0 bottom-0 items-center justify-center">
        <button type="button" className="inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:hover:text-gray-100">
          <span className="sr-only">Open sidebar</span>
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      <div className="absolute right-2 top-0 bottom-0 flex items-center justify-center" >
        <button className="inline-flex items-center justify-center rounded-md text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 py-2 px-2 space-x-2 text-sm">
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" className="h-6 w-6 text-red-500" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M160 894c0 17.7 14.3 32 32 32h286V550H160v344zm386 32h286c17.7 0 32-14.3 32-32V550H546v376zm334-616H732.4c13.6-21.4 21.6-46.8 21.6-74 0-76.1-61.9-138-138-138-41.4 0-78.7 18.4-104 47.4-25.3-29-62.6-47.4-104-47.4-76.1 0-138 61.9-138 138 0 27.2 7.9 52.6 21.6 74H144c-17.7 0-32 14.3-32 32v140h366V310h68v172h366V342c0-17.7-14.3-32-32-32zm-402-4h-70c-38.6 0-70-31.4-70-70s31.4-70 70-70 70 31.4 70 70v70zm138 0h-70v-70c0-38.6 31.4-70 70-70s70 31.4 70 70-31.4 70-70 70z"></path></svg>
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
