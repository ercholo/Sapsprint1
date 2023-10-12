import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: 'https://keycloak.hefame.es',
    realm: 'hefame-ldap',
    clientId: 'front-sapsprint'
});


export default keycloak;