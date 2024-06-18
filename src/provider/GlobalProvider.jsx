
import UserAuthProvider from "./UserAuthProvider";
import TanstackQueryProvider from "./TanstackQueryProvider";

const GlobalProvider = ({ children }) => {
  return (
    <TanstackQueryProvider>
      <UserAuthProvider>{children}</UserAuthProvider>
    </TanstackQueryProvider>
  );
};

export default GlobalProvider;
