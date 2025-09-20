export default function Navbar() {
  return (
    <div className="absolute top-3 left-10 bg-white text-black w-[95%] h-[100px] p-6 font-sans">
      <div className="flex justify-between w-full h-full items-center">
        {" "}
        <div className="w-[25%]">
          {" "}
          <ul className="flex justify-between">
            <li>About</li>
            <li>News</li>
            <li>Services</li>
            <li>Our Team</li>
            <li>Make Enquiry</li>
          </ul>
        </div>
        <div>
          <button className="border-1 px-4 py-1 cursor-pointer">
            Contact us &#8594;
          </button>
        </div>
      </div>
    </div>
  );
}
