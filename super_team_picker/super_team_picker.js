module.exports = (members, method, quantity) => {
    super_teams = {}
    if (method === "team-count") {
        let unshuffled = members.split(",");
        for (let i = 1; i <= quantity; i++) {
            super_teams[i] = [];
        }
        while (unshuffled.length !== 0) {
            for (let team in super_teams) {
                super_teams[team].push(unshuffled.splice(Math.floor(Math.random() * unshuffled.length), 1)[0]);
                if (unshuffled.length === 0) break;
            }
        }
        return super_teams;
    }
    if (method === "number-per-team") {
        let unshuffled = members.split(",");
        for (let i = 1; i <= Math.ceil(unshuffled.length / quantity); i++) {
            super_teams[i] = [];
        }
        while (unshuffled.length !== 0) {
            for (let team in super_teams) {
                super_teams[team].push(unshuffled.splice(Math.floor(Math.random() * unshuffled.length), 1)[0]);
                if (unshuffled.length === 0) break;
            }
        }
        return super_teams;
    }
}