
const actionsCore = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios').default;

const deployBuild = () => {
    actionsCore.
}

const generateLinks = () => {
    console.log('Generating links...');
    const title = github.context.payload.issue.title;
    const prUrl = github.context.payload.issue.html_url;
    const jiraId = title.split(':')[0];
    return [`https://sailpoint.atlassian.net/browse/${jiraId}`, prUrl, 'www.demo.com/1', title]
}

const slackSend = (links) => {
    console.log(links);
    console.log('Sending Slack Notification');
    axios.post("postman.fmning.com/api/proxy",
        { "text": "Hello Hackamania!" },
        {
            headers: {
                'Content-type': 'application/json'
            }
        }
    ).catch(error => console.log(error))
}

const comment = github.context.payload.comment.body;
const args = comment.split(' ');

if (args.includes('!sailbot') && args.includes('autodeploy')) {
    console.log('Received autodeploy command');
    deployBuild();
    const links = generateLinks();
    slackSend(links);
} else {
    console.log('Did not find autodeploy command. Halting workflow.');
}
