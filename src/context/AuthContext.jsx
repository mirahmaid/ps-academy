import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(undefined);

function readTokenFromStorage() {
  return localStorage.getItem("accessToken");
}

function readUserFromStorage() {
  const savedUser = localStorage.getItem("userData");

  if (!savedUser) return null;

  try {
    return JSON.parse(savedUser);
  } catch {
    return null;
  }
}

function readSelectedBranchFromStorage() {
  const savedBranch = localStorage.getItem("selectedBranch");

  if (!savedBranch) return null;

  try {
    return JSON.parse(savedBranch);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  // القراءة من localStorage synchronous أصلاً (مش async)، فما في
  // أي حالة "تحميل" حقيقية لازم ننتظرها. خليناها false ثابتة
  // بس تضل موجودة بالـ context حتى ما ننكسر أي مكان تاني بيستخدمها.
  const isLoading = false;
  const [token, setToken] = useState(readTokenFromStorage);
  const [user, setUser] = useState(readUserFromStorage);
  const [selectedBranch, setSelectedBranch] = useState(
    readSelectedBranchFromStorage
  );

  const loadFromStorage = useCallback(() => {
    setToken(readTokenFromStorage());
    setUser(readUserFromStorage());
    setSelectedBranch(readSelectedBranchFromStorage());
  }, []);

  // نستمع لتغييرات localStorage القادمة من تابات/نوافذ أخرى فقط.
  // هاد subscription لنظام خارجي، مش تحميل أولي، فما في مشكلة
  // نستدعي setState جوا الـ callback هون.
  useEffect(() => {
    window.addEventListener("storage", loadFromStorage);

    return () =>
      window.removeEventListener("storage", loadFromStorage);
  }, [loadFromStorage]);

  const isLoggedIn = !!token;

  // مزامنة بيانات المستخدم مع الباك اند
  useEffect(() => {
    if (!isLoggedIn) return;

    let cancelled = false;

    async function syncProfile() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) return;

        const data = await res.json();

        if (cancelled) return;

        const newUser = {
          name: data.name,
          avatarUrl: data.avatar ?? undefined,
        };

        localStorage.setItem(
          "userData",
          JSON.stringify(newUser)
        );

        setUser(newUser);

        if (data.branch) {
          const newBranch = {
            id: data.branch.id,
            name: data.branch.name,
          };

          localStorage.setItem(
            "selectedBranch",
            JSON.stringify(newBranch)
          );

          // نخلي selectedBranchId متزامن أيضًا
          localStorage.setItem(
            "selectedBranchId",
            data.branch.id
          );

          setSelectedBranch(newBranch);
        } else {
          localStorage.removeItem("selectedBranch");
          localStorage.removeItem("selectedBranchId");

          setSelectedBranch(null);
        }
      } catch (error) {
        console.error(
          "تعذر مزامنة بيانات المستخدم:",
          error
        );
      }
    }

    syncProfile();

    return () => {
      cancelled = true;
    };
  }, [isLoggedIn, token]);

  const login = useCallback(
    (newToken, userData, refreshToken) => {
      localStorage.setItem(
        "accessToken",
        newToken
      );

      if (userData) {
        localStorage.setItem(
          "userData",
          JSON.stringify(userData)
        );
      }

      if (refreshToken) {
        localStorage.setItem(
          "refreshToken",
          refreshToken
        );
      }

      setToken(newToken);

      if (userData) {
        setUser(userData);
      }
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("selectedBranch");
    localStorage.removeItem("selectedBranchId");

    setToken(null);
    setUser(null);
    setSelectedBranch(null);
  }, []);

  const setSelectedBranchFn = useCallback(
    (branch) => {
      localStorage.setItem(
        "selectedBranch",
        JSON.stringify(branch)
      );

      if (branch?.id) {
        localStorage.setItem(
          "selectedBranchId",
          branch.id
        );
      }

      setSelectedBranch(branch);
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        selectedBranch,
        login,
        logout,
        setSelectedBranch: setSelectedBranchFn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error(
      "useAuth لازم يستخدم جوا AuthProvider"
    );
  }

  return ctx;
}