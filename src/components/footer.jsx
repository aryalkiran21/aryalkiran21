const Footer = () => {
  return (
    <footer className="bg-gray-100 text-black py-8 px-4 sm:px-8 md:px-20 rounded-lg drop-shadow-md">
      <div className="text-center mb-4">
        <p>Copyright © 2024 Apple Inc. All rights reserved.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-4 text-sm font-normal">
        <p className="hover:text-blue-600 cursor-pointer">Privacy Policy</p>
        <p className="hover:text-blue-600 cursor-pointer">Terms of Use</p>
        <p className="hover:text-blue-600 cursor-pointer">Sales and Refund</p>
        <p className="hover:text-blue-600 cursor-pointer">Legal</p>
        <p className="hover:text-blue-600 cursor-pointer">Site Map</p>
      </div>
    </footer>
  );
};

export default Footer;
