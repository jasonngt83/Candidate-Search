import { useState, useEffect } from 'react';
import Candidate from '../interfaces/Candidate.interface';
import CandidateTable from '../components/CandidateTable';

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const storedCandidates = localStorage.getItem('potentialCandidates');
    if (storedCandidates) {
      setCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  function removeCandidate(index: number) {
    const updatedCandidates = candidates.filter((_, i) => i !== index);
    setCandidates(updatedCandidates);
    localStorage.setItem('potentialCandidates', JSON.stringify(updatedCandidates));
  }

  return (
    <div>
      <h1>Potential Candidates</h1>
      {candidates.length > 0
        ? (<CandidateTable candidateList={candidates} removeCandidate={removeCandidate}></CandidateTable>)
        : (<h2>No Potential Candidates Yet</h2>)}
    </div>
  );

};

export default SavedCandidates;