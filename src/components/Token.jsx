import { useKeycloak } from '@react-keycloak/web'

export const Token = () => {

    const { keycloak } = useKeycloak();
    const expTimestamp = keycloak.tokenParsed.exp * 1000; 
    const expirationDate = new Date(expTimestamp);

    return (
        <>
          <h1>Datos Token Usuario AD</h1>
          <h2>Token válido hasta {JSON.stringify(new Date(expTimestamp))}</h2>
          <h3>Token válido hasta {expirationDate.toLocaleTimeString()}</h3>
          <pre> {JSON.stringify(keycloak, null, 2)}</pre>
        </>
      )
}
