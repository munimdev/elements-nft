import React, { useState , useCallback } from "react";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaWallet } from "react-icons/fa";
import { useModal } from "../context/ModalContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import AccountDropdown from "./AccountDropdown";

const instagramIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#FFFFFF"
    width={24}
    height={24}
    viewBox="0 0 24 24"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const telegramIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#FFFFFF"
    width={24}
    height={24}
    viewBox="0 0 24 24"
  >
    <path d="m12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12c0-6.627-5.373-12-12-12zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
  </svg>
);

const twitterIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#FFFFFF"
    width={24}
    height={24}
    viewBox="0 0 24 24"
  >
    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
  </svg>
);

function Navbar({ transparent = false }) {
  const { account, disconnectWalletFromApp, connectWallet } = useModal();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // console.log("account", account);
  }, [account]);

  const notloggedin = [
    {
      name: "Home",
      description:
        "Get a better understanding of where your traffic is coming from.",
      href: "/",
    },
    {
      name: "info",
      description: "Connect with third-party tools that you're already using.",
      href: "info",
    },
    {
      name: "Collection",
      description: "Mint your own NFTs.",
      href: "mint",
    },
  ];

  const loggedIn = [
    {
      name: "Home",
      description:
        "Get a better understanding of where your traffic is coming from.",
      href: "/",
    },
    {
      name: "Info",
      description: "Connect with third-party tools that you're already using.",
      href: "info",
    },
    {
      name: "Collection",
      description: "Mint your own NFTs.",
      href: "mint",
    },
    {
      name: "Account",
      description: "Access your account settings and more.",
      href: "account",
    },
  ];

  //check if the route is signup and make the navbar links color black and white
  useEffect(() => {
    const isTrue = window.location.pathname !== "/";
    // window.location.pathname === "/signup" ||
    // window.location.pathname.startsWith("/collection") ||
    // window.location.pathname === "/about" ||
    // window.location.pathname === "/account" ||
    // window.location.pathname === "/dashboard" ||
    // window.location.pathname === "/policy" ||
    // window.location.pathname === "/imprint";

    setDark(false);
  }, [window.location.pathname]);

  return (
    <>
      <Popover
        className={
          transparent
            ? "relative font-medium"
            : "relative text-white font-medium"
        }
        style={{ zIndex: 100 }}
      >
        {({ close }) => (
          <>
        <div className="container text-white">
          <div className="flex items-center justify-between py-5 border-gray-100 md:space-x-6">
            <div className="flex items-center justify-start flex-grow space-x-0 sm:space-x-4 lg:space-x-8">
              <Link to="/" className="">
                <span className="font-bold text-white logo">Elements</span>
              </Link>
            </div>
            <Popover.Group as="nav" className="hidden space-x-0 md:flex">
              <Link
                to="/"
                className={`py-2 px-2 md:px-4 xl:px-5 inline-flex items-center rounded-full ${
                  dark
                    ? "text-black hover:bg-neutral-100"
                    : "text-white hover:text-black  hover:bg-neutral-100"
                }
                    `}
              >
                <span>Home</span>
              </Link>
              <Link
                to="/mint"
                className={`py-2 px-2 lg:px-4 xl:px-5 inline-flex items-center rounded-full ${
                  dark
                    ? "text-black hover:bg-neutral-100"
                    : "text-white hover:text-black  hover:bg-neutral-100"
                }
                    `}
              >
                <span>Collection</span>
              </Link>

              <Link
                to="/info"
                className={`py-2 px-2 lg:px-4 xl:px-5 inline-flex items-center rounded-full ${
                  dark
                    ? "text-black hover:bg-neutral-100"
                    : "text-white hover:text-black  hover:bg-neutral-100"
                }`}
              >
                <span>Info</span>
              </Link>
              {account != undefined ? (
                <Link
                  to="/account"
                  className={`py-2 px-2 lg:px-4 xl:px-5 inline-flex items-center rounded-full ${
                    dark
                      ? "text-black hover:bg-neutral-100"
                      : "text-white hover:text-black  hover:bg-neutral-100"
                  }`}
                >
                  <span>Account</span>
                </Link>
              ) : null}
            </Popover.Group>

            <div className="-my-2 -mr-2 md:hidden">
              <Popover.Button className="inline-flex items-center justify-center p-2 text-white bg-black rounded-md">
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="w-6 h-6" aria-hidden="true" />
              </Popover.Button>
            </div>

            <div className="items-center hidden md:flex">
              <div className="hidden h-10 lg:mr-3 border-l sm:block border-neutral-300 dark:border-neutral-6000"></div>
              {account !== undefined ? (
                <>
                  <button
                    // onClick={() => disconnectWalletFromApp()}
                    className="inline-flex items-center justify-center gap-1 px-4 py-2 ml-4 text-base font-medium text-white bg-black border border-white rounded-full shadow-sm whitespace-nowrap"
                  >
                    {/* <FaWallet className="w-4 " /> */}
                    {/* display first 6 and last 4 chaarcters of user's wallet address saved in: account[0] */}
                    {account[0].slice(0, 6) + "..." + account[0].slice(-4)}
                  </button>
                  {/* spacer div */}
                  <div className="hidden h-10 mr-3 sm:block border-neutral-300 dark:border-neutral-6000"></div>
                  <AccountDropdown />
                </>
              ) : (
                <>
                  <button
                    onClick={() => connectWallet()}
                    className="inline-flex items-center justify-center gap-1 px-4 py-2 ml-4 text-base font-medium text-white bg-black border border-white rounded-full shadow-sm whitespace-nowrap"
                  >
                    <FaWallet className="w-4 " />
                    Connect Wallet
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 p-2 transition origin-top-right transform md:hidden"
          >
            <div className="text-white bg-black divide-y-2 rounded-lg shadow-lg divide-gray-50 ring-1 ring-black ring-opacity-5">
              <div className="px-5 pt-5 pb-6 ">
                <div className="flex items-center justify-between ">
                  <div>
                    <img
                      className="w-auto h-8 sm:h-10"
                      src="/assets/ynation-logo.svg"
                      alt=""
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center p-2 text-white bg-black rounded-md">
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="py-2 mt-6">
                  <nav className="grid gap-y-8 ">
                    {account !== undefined && account.length > 0
                      ? loggedIn.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            onClick={
                              ()=>
                              close()

                            }
                            className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
                          >
                            <span className="block w-full">{item.name}</span>
                          </Link>
                        ))
                      : notloggedin.map((item) => (
                          <Link
                            key={item.name}
                            onClick={
                              ()=>
                              close()

                            }
                           
                            to={item.href}
                            className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
                          >
                            <span className="block w-full">{item.name}</span>
                          </Link>
                        ))}
                  </nav>
                </div>
              </div>

              <div className="px-5 py-6 space-y-6">
                <div className="flex items-center justify-center md:flex md:flex-1 lg:w-0">
                  {account !== undefined ? (
                    account.length > 0 ? (
                      <>
                        <button
                          onClick={() => disconnectWalletFromApp()}
                          className="inline-flex items-center justify-center gap-1 px-4 py-2 text-base font-medium text-white bg-black border border-white rounded-full shadow-sm whitespace-nowrap"
                        >
                          <FaWallet className="w-4 " />
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => connectWallet()}
                          className="inline-flex items-center justify-center gap-1 px-4 py-2 text-base font-medium text-white bg-black border border-white rounded-full shadow-sm whitespace-nowrap"
                        >
                          <FaWallet className="w-4 " />
                          Connect Wallet
                        </button>
                      </>
                    )
                  ) : (
                    <>
                      <button
                        onClick={() => connectWallet()}
                        className="inline-flex items-center justify-center gap-1 px-4 py-2 text-base font-medium text-white bg-black border border-white rounded-full shadow-sm whitespace-nowrap"
                      >
                        <FaWallet className="w-4 " />
                        Connect Wallet
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
        </>
        )}
      </Popover>
    </>
  );
}

export default Navbar;
