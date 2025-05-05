import type Candidate from "../interfaces/Candidate.interface";

type CandidateProps = {
    currentCandidate: Candidate;
};

const CandidateCard = ({ currentCandidate }: CandidateProps) => {
    return (
        <div className="candidate-card">
            <img src={currentCandidate.avatar_url} alt={`${currentCandidate.login} Avatar`}></img>
            <div className="card-content">
                <h2>
                    {currentCandidate.name
                        ? (<>{currentCandidate.name} <i>({currentCandidate.login})</i></>)
                        : (currentCandidate.login)}
                </h2>
                <p><strong>Location:</strong> {currentCandidate.location || `N/A`}</p>
                <p><strong>Email:</strong>
                    {currentCandidate.email
                        ? (<a href={`mailto:${currentCandidate.email}`}> {currentCandidate.email}</a>)
                        : ('N/A')}
                </p>
                <p><strong>Company:</strong> {currentCandidate.company || `N/A`}</p>
                <p><strong>Bio:</strong> {currentCandidate.bio || `N/A`}</p>
            </div>
        </div >
    )
}

export default CandidateCard;