
const actionsCore = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios').default;

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
    axios.post("https://hooks.slack.com/services/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",
        {
            text: "hello"
        },
        {
            headers: {
                'Content-type': 'application/json'
            }
        }
    )
}

const comment = github.context.payload.comment.body;
const args = comment.split(' ');

if (args.includes('!sailbot') && args.includes('autodeploy')) {
    console.log('Received autodeploy command');
    const links = generateLinks();
    slackSend(links);
} else {
    console.log('Did not find magic deploy command');
    // temp
    console.log(args);
}
