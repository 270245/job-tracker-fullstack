const API = "PASTE_RENDER_LINK_HERE/jobs";

async function fetchJobs() {
  const res = await fetch(API);
  const data = await res.json();

  const list = document.getElementById("jobs");
  list.innerHTML = "";

  data.forEach(job => {
    const li = document.createElement("li");
    li.textContent = job.company + " - " + job.role;
    list.appendChild(li);
  });
}

async function addJob() {
  const company = document.getElementById("company").value;
  const role = document.getElementById("role").value;

  await fetch(API, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      company,
      role,
      status: "Applied"
    })
  });

  fetchJobs();
}

fetchJobs();
