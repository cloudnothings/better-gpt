import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, } from '@heroicons/react/24/solid'
import { Fragment, useState } from 'react'

import useStore from '~/store/store'
import { api } from '~/utils/api'

const ApiKeyModal = () => {
  // generate uuid
  const uuid = () => {
    let dt = new Date().getTime()
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (dt + Math.random() * 16) % 16 | 0
      dt = Math.floor(dt / 16)
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
    return uuid
  }


  const profile = useStore((state) => state.profile)
  const addProfile = useStore((state) => state.addProfile)
  const setProfile = useStore((state) => state.setProfile)
  const showModal = useStore((state) => state.apiKeyModal)
  const setShowModal = useStore((state) => state.setApiKeyModal)
  const setSelectedProfile = useStore((state) => state.setSelectedProfile)
  const [value, setValue] = useState<string>('')
  const [editMode, setEditMode] = useState<boolean>(false)
  const closeModalHandler = () => {
    setValue('')
    setEditMode(false)
    setShowModal(false)
  }
  const editModeHandler = () => {
    setValue('')
    setEditMode(true)
  }
  const { mutate } = api.gpt.post.useMutation()
  const submitHandler = () => {
    if (!value.startsWith('sk-')) {
      alert('Invalid API Key')
      return
    }
    mutate({
      apiKey: value, messages: [
        {
          role: 'user',
          content: 'Hello',
        }],
      model: 'gpt-3.5-turbo',
    }, {
      onSuccess: () => {
        const id = uuid()
        if (editMode) {
          setProfile({ ...profile, key: value, id })
        }
        else {
          addProfile({ ...profile, key: value, id })
        }
        setSelectedProfile(id)
        closeModalHandler()
      },
      onError: (e) => {
        alert(e.message)
      },
    })
    closeModalHandler()
  }

  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModalHandler}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="inline-block w-full align-bottom bg-white dark:bg-zinc-900 rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:p-6 overflow-hidden sm:max-w-sm opacity-100 translate-y-0 sm:scale-100">
                <div>
                  <div className="mt-2 text-gray-800 dark:text-white text-left text-sm">
                    <Dialog.Title as="h2" className="text-center text-xl font-semibold">
                      {`🔑 Enter Your OpenAI API Key:`}
                    </Dialog.Title>
                    <div className="my-4">
                      {`Your API Key is stored locally on your browser and never sent anywhere else.`}
                    </div>
                    {/* OpenAI Link */}
                    <div className="my-4 text-center">
                      <a className="text-xs hover:underline text-blue-500" target="_blank" rel="noreferrer noopener" href="https://platform.openai.com/docs/guides/chat/instructing-chat-models">
                        {`→ Get your API key from Open AI dashboard.`}
                      </a>
                    </div>
                    <div className='my-4'>
                      {profile.key && !editMode && (
                        <div className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-zinc-700 text-right flex items-center justify-end gap-4'>
                          <span>{`*************************${profile.key.slice(-4)}`}
                          </span>
                          <button className='text-blue-500 hover:underline' onClick={editModeHandler}>Change</button>
                        </div>
                      )}
                      {profile.key && editMode && (
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-zinc-700"
                          type="text"
                          placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                        />
                      )}
                    </div>
                    <div className="space-y-4 mt-4">
                      <div>
                        <div className="flex items-center justify-between">
                        </div>
                        {!profile.key && (
                          <input className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-zinc-700"
                            type="text"
                            placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                          />
                        )}
                      </div>
                      <div className="my-2 text-center space-x-2 flex items-center justify-center">
                        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-default transition-colors whitespace-nowrap space-x-1"
                          onClick={submitHandler}
                        >
                          <CheckIcon className="h-4 w-4" aria-hidden="true" />
                          <span>Save</span>
                        </button>
                        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-default transition-colors whitespace-nowrap space-x-1 dark:text-gray-200"
                          onClick={closeModalHandler}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ApiKeyModal