import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Dashboard = (props) => {
    const gitData = props.data;
    const [gitRepos, setGitRepos] = useState([]);

    useEffect(() => {
        let url = gitData.repos_url
        axios.get(url).then(response => {
            console.log('--------------- REPOS ---------------');
            console.log(response.data);
            setGitRepos(response.data)
        })
    }, [gitData.repos_url, setGitRepos]);

    let repoList = gitRepos.map((repo, index) => {
        return (
            <ul key={index}>
                <Link to={{pathname: '/repositories', state: repo}} key={repo.full_name}>{repo.full_name}</Link>
            </ul>
        )
    })

    return (
        <div>
            <p>Username: {gitData.login} </p>
            {repoList}
        </div>
    )
}


export default Dashboard;