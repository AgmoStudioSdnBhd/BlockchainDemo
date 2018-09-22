contract BestLecturerVotingContract {
    struct Lecturer {
        string name;
        string phone;
    }
    
    struct LecturerChoice {
        Lecturer lecturer;
        uint voteCount;
    }
    
    address owner;
    mapping(address => bool) votedAddresses;
    address[] votedAddressList;
    LecturerChoice[] lecturerChoices;
    
    constructor() public {
        owner = msg.sender;
    }
    
    function addLecturer(string _name, string _phone) public ownerOnly {
        lecturerChoices.push(LecturerChoice(Lecturer(_name, _phone), 0));
    }
    
    function getLecturer(uint _index) public view returns (string){
        return lecturerChoices[_index].lecturer.name;
    }
    
    function addVote(uint _index) public newVoterOnly {
        lecturerChoices[_index].voteCount++;
        votedAddresses[msg.sender] = true;
        votedAddressList.push(msg.sender);
    }
    
    function getVotedList() public view returns (address[]){
        return votedAddressList;
    }
    
    function getVoteCount(uint _index) public view returns (uint){
        return lecturerChoices[_index].voteCount;
    }
    
    modifier newVoterOnly {
        require(!votedAddresses[msg.sender]);
        _;
    }
    
    modifier ownerOnly {
        require(msg.sender == owner);
        _;
    }
}