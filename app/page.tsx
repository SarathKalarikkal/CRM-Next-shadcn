import { redirect } from "next/navigation";

export default function Home(){
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  if(!currentUser.email){
    return redirect('/auth/signIn')
  } else {
    return redirect('/auth/signIn')
  }
} 