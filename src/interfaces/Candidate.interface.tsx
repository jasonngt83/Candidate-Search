// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
    readonly avatar_url: string;
    readonly login: string;
    readonly name: string;
    readonly location: string;
    readonly email: string;
    readonly company: string;
    readonly bio: string;
}

export default Candidate;