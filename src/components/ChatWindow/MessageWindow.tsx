import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
const AIResponse = (props: { message: string }) => {
  return (
    <></>
  );
};
const MessageContainer = (props: { message: string; image?: string; response: boolean }) => {
  return (
    <div className="px-4 rounded-lg mb-2">
      <div className="pl-14 relative response-block scroll-mt-32 rounded-md hover:bg-gray-50 dark:hover:bg-zinc-900 pb-2 pt-2 pr-2 group min-h-[52px]">
        <div className="absolute top-2 left-2">
          <div className='w-9 h-9 bg-gray-200 rounded-md  flex-none flex items-center justify-center text-gray-500 hover:bg-gray-300 transition-all active:bg-gray-200'>
            {props.image
              ? (<Image src={props.image} alt="Avatar" width={20} height={20} />)
              : (<Cog6ToothIcon className="w-5 h-5" />)
            }
          </div>
        </div>
        <div className="w-full">
          {props.response
            ? <AIResponse message={props.message} />
            : (
              <div>
                <div className="text-sm whitespace-pre-wrap space-y-2 w-fit text-white px-4 py-2 rounded-lg max-w-full overflow-auto highlight-darkblue focus:outline bg-blue-500">
                  {props.message}
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};



export default MessageContainer;
