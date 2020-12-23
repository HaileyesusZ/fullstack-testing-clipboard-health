import Link from 'next/link';

const NavBar = () => {
  return (
    <div className="flex justify-between py-3 px-12 items-center bg-white">
      <div className="text-blue-500 uppercase text-xl">
        <img className="inline-block mr-4 md:hidden w-8 h-8" src="/menu.svg" />
        <span>Health Explore</span>
      </div>
      <div className="md:flex  sm:hidden hidden">
        <ul className="flex justify-center items-center space-x-16 font-medium text-md text-gray-900 uppercase">
          <li>
            <Link href="/">
              <a className="hover:text-blue-500">Profile</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a className="hover:text-blue-500">Jobs</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a className="hover:text-blue-500">Professional Network</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a className="hover:text-blue-500">Lounge</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a className="hover:text-blue-500">Salary</a>
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex items-center space-x-6 ">
        <button
          type="button"
          className="border border-blue-500 border-solid rounded text-blue-500 px-2 py-1 uppercase font-medium text-sm hover:bg-blue-500 hover:text-white h-10 md:block hidden"
        >
          Create Job
        </button>
        <div className="relative bg-blue-500 rounded-full w-10 h-10 flex justify-center items-center uppercase">
          <span className="text-white font-medium">JO</span>

          <div className="bg-red-500 absolute w-6 h-6 text-white text-xs flex justify-center items-center rounded-full -top-1 -right-2 border-2 border-white">
            <span>2</span>
          </div>
        </div>
        <button
          type="button"
          className="text-gray-900 uppercase text-sm font-medium hidden md:block"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavBar;
