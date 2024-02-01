import { Link } from "react-router-dom";
import { Star } from "../assets/icons";
import { Anthony, Yifei, kaori } from "../assets/images";

const Testimonials = () => {
  return (
    <>
      <div className="flex flex-col gap-10 px-8">
       
        <Link to='/hotels' className="flex items-center justify-center mt-10">
           <button className="bg-[#605DEC] text-[#FAFAFA] px-5 py-3 border-2 border-[#605DEC] rounded hover:text-[#605DEC] hover:bg-white hover:border-2 hover:border-[#605DEC] transition-all duration-200">Explore more stays</button>
        </Link>
      </div>
    </>
  );
};

export default Testimonials;
