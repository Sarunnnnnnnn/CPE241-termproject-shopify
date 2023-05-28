import kbank from '../../assets/kasikornLogo.jpg';
import scb from '../../assets/scbLogo.jpg';
import krungsri from '../../assets/krungsriLogo.jpg';
import ktb from '../../assets/krungthaiLogo.jpg';
import bbl from '../../assets/bualuangLogo.jpg';
import ktc from '../../assets/ktcLogo.jpg';
import visa from '../../assets/visaLogo.jpg';
import mastercard from '../../assets/masterCardLogo.jpg';
import jcb from '../../assets/jcbLogo.jpg';
import jandt from '../../assets/jtLogo.jpg';
import dhl from '../../assets/dhlLogo.jpg';
import flashexpress from '../../assets/flashLogo.jpg';
import kerry from '../../assets/kerryLogo.jpg';
import thaiPost from '../../assets/thaiPostLogo.jpg';

const Footer = () => {
    return (
        <div className="mb-[30px]">
            <div className="border-b border-[#48466D] mx-[200px] mb-[30px]"></div>
            <div>
                <div className="grid grid-cols-4 gap-[90px] mx-[250px] justify-center font-heavygray font-medium text-[15px]">
                    <div>
                        <div className="mb-[12px]">CUSTOMER SERVICE</div>
                        <div className="grid grid-rows-4 gap-[7px] font-lightgray font-normal text-[14px]">
                            <div>How To Buy</div>
                            <div>How To Sell</div>
                            <div>Payment Methods</div>
                            <div>Contact Us</div>
                        </div>
                    </div>
                    <div>
                        <div className="mb-[12px]">ABOUT SHOPIFY</div>
                        <div className="grid grid-rows-4 gap-[7px] font-lightgray font-normal text-[14px]">
                            <div>About Us</div>
                            <div>Seller Center</div>
                            <div>Privacy Policy</div>
                            <div>Shopify Policies</div>
                        </div>
                    </div>
                    <div>
                        <div className="mb-[15px]">PAYMENT</div>
                        <div className="grid grid-cols-3 gap-y-[15px] items-center justify-items-center">
                            <img src={kbank} alt="kasikorn" />
                            <img src={scb} alt="scb" />
                            <img src={krungsri} alt="krungsri" />
                            <img src={ktb} alt="krungthai" />
                            <img src={bbl} alt="bualuang" />
                            <img src={ktc} alt="ktc" />
                            <img src={visa} alt="visa" />
                            <img src={mastercard} alt="mastercard" />
                            <img src={jcb} alt="jcb" />
                        </div>
                    </div>
                    <div>
                        <div className="mb-[15px]">LOGISTICS</div>
                        <div className="grid grid-cols-2 gap-y-[15px] items-center">
                            <img src={jandt} alt="j&t" />
                            <img src={dhl} alt="dhl" />
                            <img src={flashexpress} alt="flashexpress" />
                            <img src={kerry} alt="kerry" />
                            <img src={thaiPost} alt="thaipost" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
