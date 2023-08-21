"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "../ui/input";

function Searchbar({ routerType }: { routerType: string }) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  //query after 0.3 seconds of no input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        router.push(`/${routerType}?q=` + search);
      } else {
        router.push(`/${routerType}`);
      }
    });

    return () => clearTimeout(delayDebounceFn);
  }, [search, routerType]);
  return (
    <div className="searchbar">
      <Image
        src="/assets/search-gray.svg"
        alt="Search"
        width={24}
        height={24}
        className="object-contain"
      />
      <Input
        id="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`${
          routerType !== "search" ? "Search Communities" : "Search Users"
        }`}
        className="no-focus searchbar_input"
      />
    </div>
  );
}

export default Searchbar;
