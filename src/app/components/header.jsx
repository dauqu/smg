export default function Header(params) {
  return (
    <div className="navbar shadow-sm bg-[#0C0E2C] border-b-[1px] border-slate-500 px-2 justify-between fixed h-[6vh] z-50">
      {/* Left */}
      <div className="flex space-x-10">
        <div className="flex">
          <img className="w-10 h-10" src="/logo.png" />
          <a className="btn btn-ghost no-animation text-xl text-white hidden sm:block" href="/">
            Lion Exchange
          </a>
        </div>
        <div className="space-x-2">
          <button className="btn btn-sm rounded-md bg-[#5671F5] text-white hover:bg-[#5671F5] no-animation outline-none border-none">
            Live
          </button>
          <button className="btn btn-sm rounded-md btn-outline hover:bg-[#5671F5] outline-white text-white">
            Upcoming
          </button>
        </div>
      </div>
      {/* Center */}
      <div></div>
      {/* Menu ICON */}
      <div className="hidden items-center space-x-5 sm:flex">
        <span className="text-white">Home</span>
        <select className="select select-bordered select-sm bg-slate-900 text-white">
          <option>Cricket</option>
          <option>Football</option>
          <option>Tennis</option>
          <option>More</option>
        </select>
        {/* Login Button */}
        <button className="btn btn-sm rounded-md btn-outline bg-white hover:bg-[#ffffff] outline-white text-black hover:text-black no-animation border-none">
          Login
        </button>
        {/* SignUp */}
        <button className="btn btn-sm rounded-md bg-[#5671F5] text-white hover:bg-[#5671F5] no-animation border-none">
          Sign Up
        </button>
      </div>
    </div>
  );
}
