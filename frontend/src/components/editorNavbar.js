import { useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LanguageContext } from "../contexts/languagecontext";
import {  getUserFiles, hideFile, saveExisting, saveNew } from '../reducers/commsReducer';
import { setFileName, setContent, setFileId, resetFile } from "../reducers/editorReducer";
import '../css/editornavbar.css';
import '../css/button.css'
import FileSelectionScreen from "./editorNavbarFileSelectionScreen";
import NewFileScreen from "./editorNavbarNewFileScreen";

/**
 * `EditorNavbar` component provides a navigation bar for the code editor within the application.
 * It includes functionalities for creating new files, saving existing files, opening file selection,
 * and hiding (deleting) files. The component uses React state to manage the visibility of different screens
 * and integrates with Redux for state management and backend services for file operations.
 * Internationalization is supported through the `LanguageContext`.
 *
 * @component
 * @example
 * return <EditorNavbar />
 *
 * @param {Object} props - Props for EditorNavbar
 * - No explicit props are passed to this component as it utilizes Redux for state and context for translations.
 */

const EditorNavbar = () => {
    const dispatch = useDispatch()
    const { translations } = useContext(LanguageContext)
    const fileObject = useSelector(state => state.editor.fileObject)
    const userObject = useSelector(state => state.comms.userObject)
    const [isFileSelectOpen, setisFileSelectOpen] = useState(false);
    const [isNewFileOpen, setisNewFileOpen] = useState(false);


    // useEffect to fetch user files when the username changes.
    useEffect(() => {
        getData()
    }, [userObject.username])

    // Function to fetch user files and update the fileList state.
    async function getData() {
        if (userObject.username !== '') {
            dispatch(getUserFiles(userObject.token))
            /*const data = await commService.getUserFiles(userObject.token)
            if (data) {
                dispatch(setUserFiles(data))
            }
        } else {
            dispatch(setUserFiles({}))*/
        }
    }

    // Function to create a new file.
    // Clears all editor data related to the current file and fetches updated file list.      
    const handleNewFile = async () => {
        if (fileObject.filename === '') dispatch(setFileName(null))
        // Ensure editor content is reset and file data is updated asynchronously.
        setTimeout(() => {
            dispatch(resetFile())
            getData()
        }, 1)
    }

    // Function to handle saving a new file.
    // Dispatches action to save the new file with the provided filename.  
    const handleSaveNew = async (event) => {
        if (userObject.username) {
            await dispatch(saveNew(fileObject.textContent, event.target.elements.newFileNameInput.value, userObject.token))
            setisNewFileOpen(false)           
            getData()      
        }
    }

    // Function to handle saving an existing file.
    // If no filename is set, opens the New File Screen; otherwise, saves the current file.    
    const handleSaveExisting = () => {

        const saveConfirmedMessage = translations?.adminView.saveConfirmedMessage

        const formattedMessage = saveConfirmedMessage
            ? saveConfirmedMessage.replace('{filename}', fileObject.filename)
            : ""

        if (!fileObject.filename) {
            setisNewFileOpen(true) 
            return
        }
        
        if (userObject.username) {
            dispatch(saveExisting(fileObject.textContent, fileObject.filename, userObject.token))
            alert(formattedMessage)
            getData() 
        }
    }

    // Function to handle file selection from the file list.
    // Sets the editor content, filename, and file ID based on the selected file.
    const handleFileSelection = (file) => {
        dispatch(setContent(file.textContent))
        dispatch(setFileName(file.filename))
        dispatch(setFileId(file.file_id))
        setisFileSelectOpen(false) 
    }

    // Function to handle hiding (deleting) a file.
    // Asks for confirmation before hiding the file and updates the file list accordingly.    
    const handleFileHiding = async (file) => {
        const confirmMessage = translations?.editorNavbar.confirmDeleteMessage;

        const formattedMessage = confirmMessage
            ? confirmMessage.replace('{filename}', file.filename)
            : ""

        const confirmDelete = window.confirm(formattedMessage)
    
        if (confirmDelete) {
            if (fileObject.filename === file.filename) {
                dispatch(hideFile(file.file_id, userObject.token))
                handleNewFile()
            } else {
                dispatch(hideFile(file.file_id, userObject.token))
                getData()
            }
            setisFileSelectOpen(false)
        }
    }

    // Component rendering with buttons for file operations and conditional rendering
    // of the File Selection Screen and New File Screen based on state.
    return (
        <div className='editornavbar' id='editornavbar'>
            <button className='button' onClick={handleNewFile}>{translations?.editorNavbar.newFile}</button>
            <button className="button" onClick={handleSaveExisting}>{translations?.editorNavbar.saveFile}</button>
            { isNewFileOpen && 
                <NewFileScreen
                    isNewFileOpen={isNewFileOpen}
                    setisNewFileOpen={setisNewFileOpen}
                    handleSaveNew={handleSaveNew}
                />
            }

            <button className="button" onClick={() => setisFileSelectOpen(true)}>{translations?.editorNavbar.openFile}</button>
            { isFileSelectOpen &&
                <FileSelectionScreen
                    isFileSelectOpen={isFileSelectOpen}
                    setisFileSelectOpen={setisFileSelectOpen}
                    handleFileSelection={handleFileSelection}
                    handleFileHiding={handleFileHiding}
                    fileList={userObject.userFiles}
                />
            }
            <p tabIndex="0">{translations?.editorNavbar.file}{fileObject.filename}</p>
        </div>
    )
}

export default EditorNavbar