import { ethers } from "hardhat";

async function main() {

    const VotingContractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

    const VotingContract = await ethers.getContractAt("IVoting", VotingContractAddress);

    const pollCreationQuestion = "Who is your favorite Web3Bridge Cohort X Mentor?";
    const votersOption = ["Glory Praise", "Mr Mayowa", "Mr Goodness", "Mr Casweeney"];

    const creatingPoll = await VotingContract.createPoll(pollCreationQuestion, votersOption);
    await creatingPoll.wait();

    const pollIdentity = 0;

    const voteCasting = await VotingContract.vote(pollIdentity, 3);
    await voteCasting.wait();

    const pollResult = await VotingContract.getPoll(0);

    console.log(pollResult)
    console.log(`Best Web3Bridge Cohort X Mentor: ${pollCreationQuestion}`);
    console.log(`Candidates: ${votersOption.join(", ")}`);
}
main().catch(error => {
    console.error(error);
    process.exit(1);
});