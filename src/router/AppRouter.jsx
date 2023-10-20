import { Route, Routes } from "react-router-dom"
import { TablaSantomera, TablaCartagena, Token } from "../components/"
import { Navbar } from "../ui/components/Navbar"
import { useKeycloak } from "@react-keycloak/web";
import { Backdrop, CircularProgress } from "@mui/material";
import { PaginaPrincipal } from "../pages/PaginaPrincipal";

export const AppRouter = () => {

    const { initialized } = useKeycloak();

    if (!initialized) {
        return (
            <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    return (
        <>
            <Navbar />
            <div className='container'>                
                    <Routes>
                        <Route path="/*" element={<PaginaPrincipal />} />
                        <Route path="/santomera" element={<TablaSantomera />} />
                        <Route path="/cartagena" element={<TablaCartagena />} />
                        <Route path="/token" element={<Token />} />
                    </Routes>               
            </div>
        </>
    )
}
