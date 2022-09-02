import RepoUser from './userRepository.js';
const repoUser = new RepoUser();
 
export default class User {
 
    async getUserById(req, res) {
        const data = await repoUser.selectById(req.params.id);
        return res.send(data);
    }
}
