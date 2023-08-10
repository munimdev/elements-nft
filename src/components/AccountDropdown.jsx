import { Popover } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/20/solid";
import { useModal } from "../context/ModalContext";
import { Link } from "react-router-dom";

export default function AccountDropdown() {
  const { account, disconnectWalletFromApp } = useModal();

  return (
    <Popover className="relative">
      <Popover.Button>
        <div class="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full w-8 h-8 sm:w-9 sm:h-9 ring-1 ring-white hover:bg-neutral-500">
          {/* <img
            class="absolute inset-0 w-full h-full object-cover rounded-full"
            src="/assets/default.webp"
            alt="John Doe"
          ></img> */}
          <UserIcon class="h-7 w-7" />
          <span class="wil-avatar__name"></span>
        </div>
      </Popover.Button>

      <Popover.Panel className="absolute z-10 w-screen max-w-[260px] px-4 mt-3 -right-10 sm:right-0 sm:px-0 opacity-100 translate-y-0">
        <div class="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
          <div class="relative grid grid-cols-1 gap-6 bg-neutral-900 py-7 px-6">
            <div class="flex items-center space-x-3">
              {/* <div class="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full w-8 h-8 sm:w-9 sm:h-9 ring-1 ring-white">
                <img
                  class="absolute inset-0 w-full h-full object-cover rounded-full"
                  src="https://yemnation.com/static/media/default.cbfb423ae240750383e1.webp"
                  alt="John Doe"
                ></img>
                <span class="wil-avatar__name">J</span>
              </div> */}
              <div class="flex-grow">
                {/* <h4 class="font-semibold">{username}</h4> */}
                <p class="text-xs mt-0.5 text-start">
                  {account[0].slice(0, 6) + "..." + account[0].slice(-4)}
                </p>
              </div>
            </div>
            <div class="w-full border-b border-neutral-700"></div>
            <Link
              to="/account"
              class="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
            >
              <div class="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                <div class="flex items-center justify-center flex-shrink-0 text-neutral-300">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium ">My Account</p>
                </div>
              </div>
            </Link>
            <div class="w-full border-b border-neutral-700"></div>
            {account &&
            (account[0].toLowerCase() ===
              "0x5470bfdf7ce31b221e4eb001dab10ba798ccf6a1" ||
              account[0].toLowerCase() ===
                "0x7db5cb3d1945b6b2afdf93a6aa48f3698d87f254" ||
              account[0].toLowerCase() ===
                "0x4926ef65a449b95c04ef590eac68eaed36df40f1") ? (
              <a
                class="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                href="/admin"
              >
                <div class="flex items-center justify-center flex-shrink-0 text-neutral-300">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.97 22C17.4928 22 21.97 17.5228 21.97 12C21.97 6.47715 17.4928 2 11.97 2C6.44715 2 1.97 6.47715 1.97 12C1.97 17.5228 6.44715 22 11.97 22Z"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5Z"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M4.89999 4.92993L8.43999 8.45993"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M4.89999 19.07L8.43999 15.54"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M19.05 19.07L15.51 15.54"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M19.05 4.92993L15.51 8.45993"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium ">Admin Panel</p>
                </div>
              </a>
            ) : null}

            <div class="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 cursor-pointer">
              <div class="flex items-center justify-center flex-shrink-0 text-neutral-300">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  color="red"
                >
                  <path
                    d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M15 12H3.62"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M5.85 8.6499L2.5 11.9999L5.85 15.3499"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </div>
              <div class="ml-4">
                {/* <p class="text-sm font-medium ">Disconnect</p> */}
                <button
                  class="text-sm font-medium text-red-600 hover:text-red-500"
                  onClick={disconnectWalletFromApp}
                >
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="grid grid-cols-2">
          <a href="/analytics">Analytics</a>
          <a href="/engagement">Engagement</a>
          <a href="/security">Security</a>
          <a href="/integrations">Integrations</a>
        </div>

        <img src="/solutions.jpg" alt="" /> */}
      </Popover.Panel>
    </Popover>
  );
}
