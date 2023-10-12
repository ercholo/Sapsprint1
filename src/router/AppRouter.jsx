import { Route, Routes } from "react-router-dom"
import { TablaPrincipal } from "../components/TablaPrincipal"
import { Navbar } from "../ui/components/Navbar"
import { useKeycloak } from "@react-keycloak/web";
import { Backdrop, CircularProgress } from "@mui/material";
import { BrowserRouter } from 'react-router-dom'


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
                <BrowserRouter>
                    <Routes>
                        <Route path="/*" element={<TablaPrincipal />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )
}
