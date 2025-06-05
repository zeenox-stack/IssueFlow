import React, { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";
import IssueModal from "../issueModal/IssueModal";
import { handleGetIssues } from "../../../Services/api";
import { getLayout } from "../../../Utils/Utils"; 

import Grid from "../../../assets/grid.svg"; 
import Flex from "../../../assets/flex.svg";

export interface PayloadIssueType {
    id: string, 
    title: string, 
    description: string, 
    status: string, 
    createdBy: string, 
    createdAt: string, 
    updatedAt: string
}

const RenderIssues: React.FC = React.memo(() => {
    const { projectId } = useParams(); 

    if (!projectId) {
        return <div>Something went wrong!</div>
    }; 

    const [issues, setIssues] = useState<PayloadIssueType[]>([]); 
    const [lIndex, setLIndex] = useState<number>(0); 

    useEffect(() => {
        const handleSetIssues = async () => {
            const issues = await handleGetIssues(projectId); 
            setIssues(issues);
        }; 

        handleSetIssues();
    }, [projectId])

    return (
        <section>
            <div className="flex justify-between items-center">
            <h2>Project Issues</h2> 
            <div>
                <button className="border-none rounded-full bg-gray-400 p-1" onClick={() => setLIndex(n => n === 1 ? 0 : 1)}>
                    {
                        lIndex === 1 ? (
                            <img src={Grid} alt="grid view icon" />
                        ) : (
                            <img src={Flex} alt="flex view icon" />
                        )
                    }
                </button>
            </div>
            </div>
            <div className={getLayout(lIndex)}>
            {issues.map(issue => {
                return (
                    <IssueModal issue={issue} projectId={projectId} key={issue.id}/>
                )
            })}
            </div>
        </section>
    )
}); 

export default RenderIssues;