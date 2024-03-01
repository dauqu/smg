export default function Header(params) {
  return (
    <div className="navbar shadow-sm bg-[#0C0E2C] border-b-[1px] border-slate-500 px-2 justify-between fixed h-[6vh] z-50">
      {/* Left */}
      <div className="flex space-x-10">
        <div className="flex">
          <img className="w-10 h-10" src="/logo.png" />
          <a className="btn btn-ghost no-animation text-xl text-white" href="/">
            Lion Exchange
          </a>
        </div>
        <div className="space-x-2">
          <button className="btn btn-sm rounded-md">Live</button>
          <button className="btn btn-sm rounded-md btn-outline btn-active">Upcoming</button>
        </div>
      </div>
      {/* Center */}
      <div></div>
      {/* Menu ICON */}
      <div></div>
    </div>
  );
}
