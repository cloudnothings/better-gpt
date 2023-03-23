import { Dialog, Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'
import { Fragment, useEffect, useState } from 'react'
import useStore from '~/store/store'
import type { Model, Thread } from '~/types/appstate'
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
const ChangeModelModal = () => {
  const thread = useStore((state) => state.thread)
  const setThread = useStore((state) => state.setThread)
  const modelModal = useStore((state) => state.modelModal)
  const setModelModal = useStore((state) => state.setModelModal)

  const models = useStore((state) => state.models)
  const [selectedModel, setSelectedModel] = useState<Model>(thread.model)
  useEffect(() => {
    setSelectedModel(thread.model)
  }, [thread.model])
  const [systemInstruction, setSystemInstruction] = useState<string>(thread.initialSystemInstruction)
  const confirmationHandler = () => {
    setThread(({ ...thread, model: selectedModel, initialSystemInstruction: systemInstruction }) as Thread)
    setModelModal(false)
  }
  const cancelHandler = () => {
    setModelModal(false)
    setSelectedModel(thread.model)
    setSystemInstruction(thread.initialSystemInstruction)
  }
  return (
    <Transition.Root show={modelModal} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setModelModal(false)}>
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
              <Dialog.Panel className="inline-block w-full align-bottom bg-white dark:bg-zinc-900 rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:p-6 overflow-hidden sm:max-w-lg opacity-100 translate-y-0 sm:scale-100">
                <div>
                  <div className="mt-2 text-gray-800 dark:text-white text-left text-sm">
                    <Dialog.Title as="h2" className="text-center text-xl font-semibold">
                      Model Settings
                    </Dialog.Title>
                    <div className="space-y-4 mt-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <Advertisement />
                          <OpenAILink />
                        </div>

                        <Listbox value={selectedModel} onChange={setSelectedModel}>
                          {({ open }) => (
                            <>
                              <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Assigned to</Listbox.Label>
                              <div className="relative mt-2">
                                <Listbox.Button className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 dark:text-white dark:bg-zinc-700 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6">
                                  <span className="block truncate">{selectedModel.name}</span>
                                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                  </span>
                                </Listbox.Button>

                                <Transition
                                  show={open}
                                  as={Fragment}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md text-gray-900 dark:text-white dark:bg-zinc-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {models.map((model) => (
                                      <Listbox.Option
                                        key={model.id}
                                        className={({ active }) =>
                                          classNames(
                                            active ? 'bg-indigo-600 text-white' : 'text-gray-900 dark:text-white',
                                            'relative cursor-default select-none py-2 pl-3 pr-9'
                                          )
                                        }
                                        value={model}
                                      >
                                        {({ selected, active }) => (
                                          <>
                                            <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                              {model.name}
                                            </span>

                                            {selected ? (
                                              <span
                                                className={classNames(
                                                  active ? 'text-white' : 'text-indigo-600',
                                                  'absolute inset-y-0 right-0 flex items-center pr-4'
                                                )}
                                              >
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                              </span>
                                            ) : null}
                                          </>
                                        )}
                                      </Listbox.Option>
                                    ))}
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </>
                          )}
                        </Listbox>
                      </div>
                      {selectedModel && <DescriptionBox {...selectedModel} />}
                      <div>
                        <div className="flex items-center justify-between">
                          <label className="block text-sm font-medium leading-6">
                            Initial System Instruction
                            <button className="text-blue-500 hover:underline text-xs pl-1">
                              (Reset to default)
                            </button>
                          </label>
                          {/* OpenAI Link */}
                          <a className="text-xs hover:underline text-blue-500" target="_blank" rel="noreferrer noopener" href="https://platform.openai.com/docs/guides/chat/instructing-chat-models">
                            Learn more →
                          </a>
                        </div>
                        <textarea className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-zinc-700 dark:text-white"
                          placeholder="You are ChatGPT, a large language model trained by OpenAI."
                          value={systemInstruction}
                          onChange={(e) => setSystemInstruction(e.target.value)}
                        />
                      </div>
                      {/* <div>
                        <label className="flex items-center justify-start">
                          <button className="bg-blue-600 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2" id="headlessui-switch-:r5l:" role="switch" type="button" aria-checked="true" data-headlessui-state="checked">
                            <span aria-hidden="true" className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out">
                            </span>
                          </button>
                          <div>
                            <div className="ml-2">
                              Remember settings for all future chats
                            </div>
                            <div className="ml-2 text-gray-500 text-xs"></div>
                          </div>
                        </label>
                      </div>
                      <label className="flex items-center justify-start">
                        <button className="bg-gray-200  dark:bg-zinc-700 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2" id="headlessui-switch-:r5m:" role="switch" type="button" aria-checked="false" data-headlessui-state="">
                          <span aria-hidden="true" className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out">
                          </span>
                        </button>
                        <div>
                          <div className="ml-2">
                            Stream AI responses word by word
                          </div>
                          <div className="ml-2 text-gray-500 text-xs">
                            {"Cost estimation doesn't work when stream response is enabled."}
                          </div>
                        </div>
                      </label> */}
                      <div className="my-2 text-center space-x-2 flex items-center justify-center">
                        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-default transition-colors whitespace-nowrap space-x-1"
                          onClick={confirmationHandler}
                        >
                          <CheckIcon className="h-4 w-4" aria-hidden="true" />
                          <span>Apply</span>
                        </button>
                        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-default transition-colors whitespace-nowrap space-x-1 dark:text-gray-200"
                          onClick={cancelHandler}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={cancelHandler}
                  >
                    Go back to dashboard
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
const DescriptionBox = (props: Model) => {
  return (
    <div className="bg-green-100 p-4 rounded-lg dark:bg-green-800">
      <div className="flex items-center justify-start flex-wrap gap-2 mb-2"><div>
        <b>Model</b>: {props.name}</div><div><b>Max tokens</b>: {props.maxTokens}</div>
      </div>
      <div>
        {props.description}
      </div>
      <div className="mt-2">
        <b>Training data</b>: {props.description}</div>
    </div>
  )
}
const OpenAILink = () => {
  return (
    <a className="text-xs hover:underline text-blue-500" target="_blank" rel="noreferrer noopener" href="https://platform.openai.com/docs/guides/chat" >
      Learn more →
    </a>
  )
}
const Advertisement = () => {
  return (
    <label className="block text-sm font-medium leading-6">
      Model
      <span className="bg-green-500 px-2 py-1 rounded-full text-white ml-1">
        GPT-4 Available!
      </span>
    </label>
  )
}

export default ChangeModelModal