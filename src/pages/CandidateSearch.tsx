import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';
import CandidateCard from '../components/CandidateCard';


const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
    avatar_url: '',
    login: '',
    name: '',
    location: '',
    email: '',
    company: '',
    bio: '',
  });



  useEffect(() => {
    fetchCandidateList();
  }, []);

  useEffect(() => {
    if (candidates.length > 0) {
      fetchCandidateDetails(currentIndex);
    }
  }, [candidates, currentIndex]);

  const fetchCandidateList = async () => {
    const data = await searchGithub();
    const usernames = data.map((user: { login: string }) => user.login);
    setCandidates(usernames);
  };

  const fetchCandidateDetails = async (index: number) => {
    const username = candidates[index];
    const userDetail: Candidate = await searchGithubUser(username);
    if (Object.keys(userDetail).length === 0 || !userDetail.login) {
      nextCandidate();
      return;
    }
    setCurrentCandidate(userDetail);
  };

  const nextCandidate = () => {
    if (currentIndex < candidates.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
      fetchCandidateList();
    }
  };

  const addToPotentialCandidatesList = () => {
    let parsedPotentialCandidates: Candidate[] = [];
    const storedPotentialCandidates = localStorage.getItem('potentialCandidates');
    if (typeof storedPotentialCandidates === 'string') {
      parsedPotentialCandidates = JSON.parse(storedPotentialCandidates);
    }
    parsedPotentialCandidates.push(currentCandidate);
    localStorage.setItem('potentialCandidates', JSON.stringify(parsedPotentialCandidates));
  };

  return (
    <div>
      <a href='/SavedCandidates'>Potential Candidate</a>
      <h1>Candidate Search</h1>
      <CandidateCard currentCandidate={currentCandidate}></CandidateCard>
      <div className='candidate-buttons'>
        <button className="negative-button" onClick={nextCandidate}>-</button>
        <button className="positive-button" onClick={() => {
          addToPotentialCandidatesList();
          nextCandidate();
        }}>+</button>
      </div>
    </div>
  );
};

export default CandidateSearch;