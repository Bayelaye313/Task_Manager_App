import { useParams } from "react-router-dom";
import { useUserContext } from "../../../context/UserContext";

function PageEmailverif() {
  const { verificationToken } = useParams(); // Utiliser useParams pour accéder au token

  const { verifyUser } = useUserContext();

  return (
    <div className="auth-page flex flex-col justify-center items-center">
      <div className="bg-white flex flex-col justify-center gap-[1rem] px-[4rem] py-[2rem] rounded-md">
        <h1 className="text-[#999] text-[2rem]">Verify Your Account</h1>
        <button
          className="px-4 py-2 self-center bg-blue-500 text-white rounded-md"
          onClick={() => {
            if (verificationToken) {
              verifyUser(verificationToken); // Utiliser le token pour vérifier l'utilisateur
            } else {
              toast.error("Invalid verification token");
            }
          }}
        >
          Verify
        </button>
      </div>
    </div>
  );
}

export default PageEmailverif;
