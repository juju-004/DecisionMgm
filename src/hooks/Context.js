"use client";

import React, { createContext } from "react";
import { useState } from "react";

export const UserContext = createContext(null);

function UserContextProvider({ children }) {
  const [user, setUser] = useState("");
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
