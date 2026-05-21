const https = require('https');

https.get({
  hostname: 'api.github.com',
  path: '/repos/rohitnk464/spendlens/actions/runs',
  headers: { 'User-Agent': 'Node.js' }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const runs = JSON.parse(data).workflow_runs;
    const latest = runs[0];
    console.log("Latest Run ID:", latest.id);
    console.log("Status:", latest.status);
    console.log("Conclusion:", latest.conclusion);
    
    https.get({
      hostname: 'api.github.com',
      path: `/repos/rohitnk464/spendlens/actions/runs/${latest.id}/jobs`,
      headers: { 'User-Agent': 'Node.js' }
    }, (res2) => {
      let data2 = '';
      res2.on('data', chunk => data2 += chunk);
      res2.on('end', () => {
        const jobs = JSON.parse(data2).jobs[0];
        console.log("Steps:");
        jobs.steps.forEach(step => {
          console.log(`- ${step.name}: ${step.conclusion}`);
        });
      });
    });
  });
});
