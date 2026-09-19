// Illustrative provision → verify → tear down cycle for the terminal demo —
// representative of how these roles actually get shipped, not a transcript
// of one specific client system. Loops forever in Terminal.jsx.
export const terminalScript = [
  {
    cmd: "terraform init",
    out: ["Initialized backend: s3", "Terraform has been successfully initialized"],
  },
  {
    cmd: "terraform apply -auto-approve",
    out: [
      "aws_lambda_function.api: Creating...",
      "aws_apigatewayv2_api.gateway: Creating...",
      "aws_cloudfront_distribution.cdn: Creating... [4m12s]",
      "Apply complete! 3 added, 0 changed, 0 destroyed",
    ],
  },
  {
    cmd: "curl -s https://api.prod.internal/health",
    out: ['{ "status": "ok", "region": "eu-west-1" }'],
  },
  {
    cmd: "terraform destroy -auto-approve",
    out: [
      "aws_cloudfront_distribution.cdn: Destroying...",
      "aws_apigatewayv2_api.gateway: Destroying...",
      "aws_lambda_function.api: Destroying...",
      "Destroy complete! 3 destroyed",
    ],
  },
];

export const roles = [
  "DevOps & Cloud Engineer",
  "Tree Hugger",
  "AWS builder",
  "Triathlete",
  "Infrastructure automator",
  "Dungeon Master",
  "Security-minded engineer",
  "Beer Brewer",
];

export const stats = [
  { value: 4, suffix: "+", label: "years in cloud & security" },
  { value: 6, suffix: "", label: "certifications" },
];

export const hobbies = [
  { name: "Hiking", icon: "mountain" },
  { name: "Triathlon", icon: "stopwatch" },
  { name: "Dungeons & Dragons", icon: "dice" },
  { name: "Beer making", icon: "mug" },
  { name: "Freediving", icon: "wave" },
];

export const stack = [
  {
    name: "AWS",
    items: [
      { name: "AWS", level: "advanced" },
      { name: "Serverless architectures", level: "advanced" },
      { name: "CDK", level: "intermediate" },
      { name: "CloudFormation", level: "intermediate" },
      { name: "CloudOps Engineer", level: "cert pending" },
      { name: "Cloud Practitioner", level: "certified" },
    ],
  },
  {
    name: "DevOps & delivery",
    items: [
      { name: "Terraform / IaC", level: "advanced" },
      { name: "CI/CD", level: "expert" },
      { name: "GitLab Pipelines", level: "intermediate" },
      { name: "Jenkins", level: "advanced" },
      { name: "Docker", level: "expert" },
      { name: "Azure DevOps", level: "expert" },
    ],
  },
  {
    name: "Systems & networking",
    items: [
      { name: "Linux", level: "advanced" },
      { name: "Networking", level: "expert" },
      { name: "Active Directory", level: "advanced" },
      { name: "System administration", level: "expert" },
      { name: "Azure", level: "intermediate" },
    ],
  },
  {
    name: "Security",
    items: [
      { name: "QRadar SIEM", level: "advanced" },
      { name: "Penetration testing", level: "certified" },
      { name: "Threat intel & IR", level: "" },
      { name: "Stellar Cyber", level: "certified associate" },
      { name: "Cybersecurity foundations", level: "certified" },
    ],
  },
];

// Empty for now — real case studies go here.
export const projects = [];

// Practical write-ups pending — abstracts are seeded for structure; swap in
// your own voice, specifics, and worked examples.
export const guides = [
  {
    title: "Terraform state, without the 3am page",
    tags: ["Terraform", "IaC", "AWS"],
    body: [
      "Keep state in a remote backend (S3 + DynamoDB lock table) from day one — local state is how two people clobber each other's infra.",
      "One state file per environment, not per team. Blast radius should match your rollback plan.",
      "Run `plan` in CI and require a human to read the diff before `apply` — the diff is the code review.",
    ],
  },
  {
    title: "CI/CD pipelines that survive a rollback",
    tags: ["CI/CD", "GitLab", "Jenkins"],
    body: [
      "Build the artifact once, promote the same artifact through environments — never rebuild per stage.",
      "Make rollback a pipeline stage, not a manual SSH session at 2am.",
      "Fail fast: lint and unit tests before anything that touches real infrastructure.",
    ],
  },
  {
    title: "Serverless on AWS: when to reach for it",
    tags: ["AWS", "Serverless", "CDK"],
    body: [
      "Good fit for spiky, event-driven workloads — bad fit for steady-state traffic where a container is cheaper and simpler to reason about.",
      "CDK over hand-written CloudFormation once a stack has more than a handful of resources — you get real loops and types.",
      "Budget for cold starts and IAM policy sprawl before you budget for the Lambda code itself.",
    ],
  },
  {
    title: "Turning SIEM noise into signal",
    tags: ["SIEM", "QRadar", "SOAR"],
    body: [
      "Tune detection rules against your own traffic baseline before trusting vendor defaults — most alert fatigue starts there.",
      "Route every high-confidence alert through a SOAR playbook so response is consistent, not tribal knowledge.",
      "Review closed tickets monthly for false-positive patterns and feed them back into the rules.",
    ],
  },
];

export const experience = [
  {
    company: "NN (Nationale-Nederlanden)",
    linkedin: "https://www.linkedin.com/company/nationale-nederlanden",
    role: "DevOps & Cloud Engineer",
    dates: "Oct 2025 — present",
    place: "Netherlands · financial services",
    live: true,
    bullets: [
      "Design, maintain, and upgrade cloud infrastructure and DevOps pipelines at large scale",
      "Implement infrastructure as code and continuous delivery to support business operations",
      "Keep supported services current against the company's evolving security standards",
    ],
  },
  {
    company: "VASS",
    linkedin: "https://www.linkedin.com/company/vass",
    role: "DevOps and Cloud Engineer",
    dates: "May 2023 — present",
    place: "EU-funded projects · serverless & AI",
    live: true,
    bullets: [
      "Delivered serverless architectures and AI-driven features for EU-funded projects, on schedule",
      "Built automation tooling and deployment pipelines that measurably cut deployment time",
      "Managed AWS infrastructure, serverless and traditional, for scalable workloads",
      "Designed and maintained CI/CD pipelines in GitLab and Jenkins",
      "Found and closed critical bugs before they became security vulnerabilities",
    ],
  },
  {
    company: "Encode (Obrela Security Ind.)",
    linkedin: "https://gr.linkedin.com/company/encode-sa",
    role: "Cyber Security Analyst",
    dates: "Sep 2022 — May 2023",
    place: "",
    live: false,
    bullets: [
      "Ran network security, threat intelligence, and incident response, hands-on with firewalls, IDS/IPS, and SIEM",
      "Investigated malware, phishing, and social engineering, scripting in Python and Bash",
    ],
  },
  {
    company: "Alphaomegazed Ltd.",
    role: "IT & Security Engineer",
    dates: "Mar 2022 — Aug 2022",
    place: "",
    live: false,
    bullets: [
      "Ran vulnerability assessments and incident response for clients pursuing ISO 27001 / 27701 compliance",
      "Deployed an OpenXDR SOAR SIEM integrated with client network HDLs, and trained the client's team on it",
    ],
  },
  {
    company: "Computer Science Department, Army",
    role: "IT Manager — Lieutenant",
    dates: "Nov 2020 — Jan 2022",
    place: "",
    live: false,
    bullets: [
      "Ran IT operations and training, wrote governing policy, and built the island's camp VoIP network",
      "Hired, trained, and mentored staff; led network design and optimization as the department grew",
    ],
  },
];
