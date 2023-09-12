import React from 'react';
import './App.scss';
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Characters from "./pages/Characters/Characters";
import DetailedCharacter from "./pages/DetailedCharacter/DetailedCharacter";

function App() {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <div className='header'><Header /></div>
                <div className='content'>
                    <Routes>
                        <Route path="/" element={<Characters />} />
                        <Route path="/:id" element={<DetailedCharacter />} />
                        <Route path="/404" element={<NotFoundPage />} />
                        <Route path="*" element={<Navigate to="/404" replace />} />
                    </Routes>
                </div>
                <div className='footer'><Footer/></div>
            </div>
        </BrowserRouter>
    );
}

export default App;
