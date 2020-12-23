const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row mx-16  mt-8 bg-white md:py-8 px-8 py-4 space-x-0 space-y-4 md:space-x-6">
      <div className="w-1/3">
        <h3 className="text-xl font-bold mb-6">About Us</h3>
        <div className="flex flex-col space-y-4">
          <span>
            We are a team of nurses, doctors, tedhnologists and exectutives
            dedicated to help nurses find jobs that they love
          </span>
          <span>
            All copyright reservved @{new Date().getFullYear()} - Health Explore
          </span>
        </div>
      </div>
      <div className="w-1/3">
        <h3 className="text-xl font-bold mb-6">Sitemap</h3>
        <div className="flex flex-col space-y-4">
          <span>Nurses</span>
          <span>Employees</span>
          <span>Social networking</span>
          <span>Jobs</span>
        </div>
      </div>
      <div className="w-1/3">
        <h3 className="text-xl font-bold mb-6">Privacy</h3>
        <div className="flex flex-col space-y-4">
          <span>Terms of use</span>
          <span>Privacy policy</span>
          <span>Cookie policy</span>
        </div>
      </div>
    </div>
  );
};
export default Footer;
