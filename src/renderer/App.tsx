import "./styles/index.css"
import {RefObject, useEffect, useRef, useState} from "react";
import {createTab, setBoundingBox, showTab} from "./electronApi/browserApi";

export function App() {
    const browserRef = useRef<HTMLDivElement>(null)
    const [tabs, setTabs] = useState<number[]>([])
    const [activeTab, setActiveTab] = useState<number|null>(null)

    const handleCreateTab = async () => {
        const tabId = await createTab({
            url: 'https://www.google.com'
        })
        setTabs([...tabs, tabId])
        handleShowTab(tabId)
    }

    const handleUpdateBBox = () => {
        if (browserRef.current) {
            const bbox = browserRef.current.getBoundingClientRect()
            setBoundingBox({
                bbox: {height: bbox.height+1, width: bbox.width, x: bbox.x, y: bbox.y-1}
            })
        }
    }

    const handleShowTab = (tabId:number) => {
        setActiveTab(tabId)
        showTab({id:tabId})
    }

    useEffect(() => {
        handleUpdateBBox()
        window.addEventListener('resize', handleUpdateBBox)
    }, [browserRef.current]);

    return (
        <div style={{height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex'}}>
                <button onClick={handleCreateTab}>Create Tab</button>
                {
                    tabs.map((tab) => (
                        <button style={{backgroundColor:activeTab == tab ? 'blue': undefined}} onClick={() => handleShowTab(tab)} key={tab}>Tab {tab+1}</button>
                    ))
                }
            </div>
            <div ref={browserRef as RefObject<HTMLDivElement>} style={{flexGrow: 1, height: '100%', backgroundColor: 'red'}}></div>
        </div>
    )
}