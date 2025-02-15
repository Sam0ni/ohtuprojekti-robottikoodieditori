import EditorView from "./components/editorview";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";  
import { LanguageProvider } from './contexts/languagecontext';
import Tokenpopup from "./components/popup"

function App() {


    return (
        <LanguageProvider>
            <div className="app">
                <div>
                    <Tokenpopup status={true} onClose={""}/>
                </div>
                <div className="navbar">
                    <Navbar/>
                </div>
                <div className="main-content">
                    <div>
                        <EditorView />
                    </div>  
                    <div className="sidebar">
                        <Sidebar/>
                    </div>
                </div>
            </div>
        </LanguageProvider>
    );
}

export default App;
