import VerifyDev from "./VerifyDev";
import VerifyProd from "./VerifyProd";

export default process.env.NODE_ENV === "development" ? VerifyDev : VerifyProd;
