"use client";

import { useRouter } from "next/navigation";
import axios from "axios";

export default function Home() {
  const router = useRouter();

  function handleLogout() {
    axios.post("http://localhost:3001/logout",
      {},
      {
        withCredentials: true
      },
    )
    .then((response) => {
        console.info(response.data);
        router.push("/login");
    })
    .catch((error) => {
        console.error(error.response?.data || error);
    });
  }
  return (
    <div>
      <h1>main page</h1>
      <button className="p-2 rounded-sm bg-btn hover:bg-hover" onClick={handleLogout}>logout</button>
    </div>
  );
}
