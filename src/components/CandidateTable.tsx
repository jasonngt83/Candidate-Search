import type Candidate from "../interfaces/Candidate.interface";

type TableProps = {
    candidateList: Candidate[];
    removeCandidate: (index: number) => void;
};

const CandidateTable = ({ candidateList, removeCandidate }: TableProps) => {
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Email</th>
                        <th>Company</th>
                        <th>Bio</th>
                        <th>Reject</th>
                    </tr>
                </thead>
                <tbody>
                    {candidateList.map((candidate, index) => (
                        <tr key={index}>
                            <td>
                                <img src={candidate.avatar_url} alt={candidate.login} />
                            </td>
                            <td>
                                {candidate.name
                                    ? (<>{candidate.name} <i>({candidate.login})</i></>)
                                    : (candidate.login)}
                            </td>
                            <td>{candidate.location || 'N/A'}</td>
                            <td>
                                {candidate.email
                                    ? (<a href={`mailto:${candidate.email}`}> {candidate.email}</a>)
                                    : ('N/A')}
                            </td>
                            <td>{candidate.company || 'N/A'}</td>
                            <td>{candidate.bio || 'N/A'}</td>
                            <td>
                                <button className="negative-button" onClick={() => removeCandidate(index)}>-</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CandidateTable