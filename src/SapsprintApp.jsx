import { ReactKeycloakProvider } from "@react-keycloak/web";
import { AppRouter } from "./router/AppRouter";
import keycloak from "./keycloak";

export const SapsprintApp = () => {
  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{ onLoad: "check-sso" }}
    >
      <AppRouter />
    </ReactKeycloakProvider>
  );
};

export default SapsprintApp;