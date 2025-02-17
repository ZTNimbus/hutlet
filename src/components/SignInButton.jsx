import { signInAction } from "@/lib/actions";
import Image from "next/image";

function SignInButton() {
  return (
    <form action={signInAction}>
      <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
        <div className="relative size-7 items-center">
          <Image
            fill
            className={"object-cover"}
            src="https://authjs.dev/img/providers/google.svg"
            alt="Google logo"
          />
        </div>
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
