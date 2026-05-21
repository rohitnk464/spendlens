async function check() {
  const headers = { 'User-Agent': 'Node.js' };
  const res = await fetch('https://api.github.com/repos/rohitnk464/spendlens/actions/runs', { headers });
  const runs = (await res.json()).workflow_runs;
  const latest = runs[0];
  
  const res2 = await fetch(`https://api.github.com/repos/rohitnk464/spendlens/actions/runs/${latest.id}/jobs`, { headers });
  const jobs = (await res2.json()).jobs;
  
  const failedJob = jobs.find(j => j.conclusion === 'failure');
  if (!failedJob) return console.log("No failed jobs found");
  
  const logRes = await fetch(`https://api.github.com/repos/rohitnk464/spendlens/actions/jobs/${failedJob.id}/logs`, { headers });
  const text = await logRes.text();
  console.log(text);
}
check();
