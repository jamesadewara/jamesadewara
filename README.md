<div align="center">

# James Adewara
### DevOps Engineer · Access Bank (SIWES) · AltSchool Africa · Lagos, Nigeria

*I provision infrastructure, containerize workloads, and automate everything in between.*

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/james-adewara)
[![Linktree](https://img.shields.io/badge/Linktree-43E55E?style=flat&logo=linktree&logoColor=white)](https://linktr.ee/jamesadewara)
[![Medium](https://img.shields.io/badge/Medium-000000?style=flat&logo=medium&logoColor=white)](https://medium.com/@jamesadewara1)
[![Email](https://img.shields.io/badge/Email-EA4335?style=flat&logo=gmail&logoColor=white)](mailto:jamesadewara1@gmail.com)

</div>

## About

I'm a Cloud DevOps Engineer currently completing my SIWES internship at **Access Bank** as a DevOps Engineer, alongside my training at **AltSchool Africa**. My work spans AWS, Kubernetes, Terraform, and CI/CD pipelines — and I write about it too.

I've shipped production-grade infrastructure across real projects: multi-service EKS clusters, serverless architectures, containerized deployment pipelines, and secure private-subnet deployments with Ansible automation. I also build the applications that run on that infrastructure, which means I understand both sides of a deployment.

## Core Stack

<div align="center">

**Cloud & Infrastructure**

![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat&logo=amazon-aws&logoColor=white)
![Terraform](https://img.shields.io/badge/Terraform-623CE4?style=flat&logo=terraform&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=flat&logo=kubernetes&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![Ansible](https://img.shields.io/badge/Ansible-EE0000?style=flat&logo=ansible&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=flat&logo=cloudflare&logoColor=white)

**CI/CD & Automation**

![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=flat&logo=linux&logoColor=black)
![Bash](https://img.shields.io/badge/Bash-4EAA25?style=flat&logo=gnu-bash&logoColor=white)

**Languages & Backends**

![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Go](https://img.shields.io/badge/Go-00ADD8?style=flat&logo=go&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white)
![Django](https://img.shields.io/badge/Django-092E20?style=flat&logo=django&logoColor=white)

**Databases & Messaging**

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/RabbitMQ-FF6600?style=flat&logo=rabbitmq&logoColor=white)

</div>

## Featured Projects

### ☁️ Cloud Resume Challenge
**Serverless · AWS · Terraform · GitHub Actions · OIDC**

A production-grade resume platform built on AWS with zero long-lived credentials. The frontend is served via S3 + Cloudflare CDN; the backend is a FastAPI app running on AWS Lambda (via Mangum) with a MongoDB Atlas visitor counter. Infrastructure is fully automated with modular Terraform and deployed through three separate GitHub Actions pipelines using AWS OIDC authentication.

`Terraform` `AWS Lambda` `API Gateway` `S3` `Cloudflare` `FastAPI` `MongoDB Atlas` `GitHub Actions OIDC`

🔗 [cloud-resume-challenge](https://github.com/jamesadewara/cloud-resume-challenge) · [IaC](https://github.com/jamesadewara/cloud-resume-challenge-iac) · [Backend](https://github.com/jamesadewara/cloud-resume-challenge-backend) · [Frontend](https://github.com/jamesadewara/cloud-resume-challenge-resume)

---

### 🏗️ Project Bedrock — EKS Microservices Platform
**Kubernetes · AWS EKS · Terraform · DevSecOps**

A full production-grade microservices deployment on AWS EKS. Modular Terraform provisions the VPC, EKS cluster, node groups, RDS MySQL (catalog), RDS PostgreSQL (orders), and DynamoDB (shopping carts with IRSA). In-cluster RabbitMQ handles async checkout workflows; Redis handles caching. Traffic enters through an AWS ALB with ACM certificates and automatic HTTP→HTTPS redirect. CI/CD pipeline runs tfsec and Checkov security scans before every apply, and auto-commits infrastructure outputs back to the repo.

`EKS` `Terraform` `RDS` `DynamoDB` `RabbitMQ` `Redis` `ALB` `ACM` `tfsec` `Checkov` `IRSA` `GitHub Actions`

🔗 [project-bedrock-karatu-2025-capstone](https://github.com/jamesadewara/project-bedrock-karatu-2025-capstone)

---

### 🔧 StartTech Infrastructure
**Terraform Modules · AWS · CloudWatch · CI/CD**

Modular Terraform infrastructure for a full-stack application: networking (VPC, subnets, NAT Gateway), compute (ASG, ALB, IAM roles, security groups), storage (S3 + CloudFront CDN), and monitoring (CloudWatch dashboards, metric alarms for CPU/Memory/Disk, Log Insights queries, ElastiCache Redis). Remote state stored in S3 with DynamoDB locking. Pipeline enforces `terraform fmt`, `tflint`, `validate`, and `plan` before applying to production.

`Terraform` `AWS VPC` `ASG` `ALB` `CloudFront` `CloudWatch` `ElastiCache` `S3` `DynamoDB`

🔗 [starttech-infra](https://github.com/jamesadewara/starttech-infra)

---

### 🐳 Container Assessment — MuchToDo
**Docker BuildKit · Kubernetes · Kind**

Containerized a Golang REST API with multi-stage Docker builds and BuildKit cache mounts (subsequent builds complete in seconds). Full local orchestration via Docker Compose with health checks and service dependencies. Kubernetes deployment on Kind with dedicated namespaces, PVCs for MongoDB, resource limits, liveness/readiness probes, and NodePort exposure — all automated via shell scripts.

`Docker BuildKit` `Docker Compose` `Kubernetes` `Kind` `Go` `MongoDB` `Shell`

🔗 [container-assessment](https://github.com/jamesadewara/container-assessment)

---

### 🔐 AWS Secure Web Deployment
**Bastion Host · Ansible · Private Subnet Architecture**

Deploys web servers into a private subnet with no public internet exposure. A Bastion Host acts as the only SSH entry point; Ansible uses ProxyJump to reach the private EC2 instances and configure Nginx with Jinja2 templates. Traffic to users flows through an AWS Classic Load Balancer. Wrote a full technical article on Medium documenting the architecture and implementation.

`AWS VPC` `EC2` `ALB` `Ansible` `Nginx` `Jinja2` `Bash`

🔗 [aws-secure-web-deployment](https://github.com/jamesadewara/aws-secure-web-deployment) · [Read the article →](https://medium.com/@jamesadewara1/secure-web-application-deployment-on-aws-using-ansible-and-load-balancing-c1fc718db461)

---

### 🛠️ CIA Backend — Containerized Django API
**Docker · Ansible · GitHub Actions → EC2**

A 3-tier Django REST Framework API with PostgreSQL, containerized with Docker Compose and deployed to AWS EC2 via a GitHub Actions CI/CD pipeline that uses Ansible for configuration management. Includes OpenAPI 3.0 documentation via drf-spectacular.

`Django` `DRF` `PostgreSQL` `Docker` `Ansible` `GitHub Actions` `AWS EC2` `OpenAPI`

🔗 [CIA-BACKEND-TODO](https://github.com/jamesadewara/CIA-BACKEND-TODO)

---

### 🤖 Reko AI — Nigerian-Localised Recommendation Engine
**FastAPI · FAISS · spaCy · LiteLLM · Hackathon**

Built for the **DSN x BCT LLM Agent Challenge** (Team: Agentic Engineers). An AI-powered review generation and recommendation system localized for the Nigerian market. Uses Tavily for deep user profile search, spaCy with a custom EntityRuler (Yoruba, Hausa, Igbo geography + Pidgin markers), Sentence Transformers + FAISS for vector search, and DeepSeek/Groq via LiteLLM for generation. Async task processing via Taskiq + RabbitMQ. Deployed with Docker + Ansible.

`FastAPI` `FAISS` `spaCy` `LiteLLM` `DeepSeek` `Groq` `RabbitMQ` `Taskiq` `MongoDB` `Docker` `Ansible`

🔗 [reko-ai-recommendation-system](https://github.com/jamesadewara/reko-ai-recommendation-system)

---

### 🖥️ Linux Health Dashboard
**Next.js · SSH · Agentless Monitoring**

An agentless server monitoring dashboard that connects to remote Linux machines (cloud VPS or local Vagrant) via SSH key-pair auth, executes lightweight Bash scripts to collect system metrics, and displays them in a real-time Next.js UI — no agent software required on the target machine.

`Next.js` `TypeScript` `node-ssh` `Bash` `Linux`

🔗 [Linux-Health-Dashboard](https://github.com/jamesadewara/Linux-Health-Dashboard) · [Live demo →](https://james-remote-server-dashboard.netlify.app/)

---

## Writing

I document what I build.

- [Secure Web Application Deployment on AWS using Ansible and Load Balancing](https://medium.com/@jamesadewara1/secure-web-application-deployment-on-aws-using-ansible-and-load-balancing-c1fc718db461)
- [Why Ansible? Ansible is an agentless automation tool…](https://medium.com/@jamesadewara/why-ansible-ansible-is-an-agentless-automation-tool-0f461664154c)


## GitHub Stats

<div align="center">

![James's GitHub Stats](https://github-readme-stats.vercel.app/api?username=jamesadewara&show_icons=true&theme=dark&hide_border=true&count_private=true)
![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=jamesadewara&layout=compact&theme=dark&hide_border=true&langs_count=8)

</div>

---

<div align="center">

**DevOps Engineer @ Access Bank · AltSchool Africa Cloud Engineering Track**

[LinkedIn](https://www.linkedin.com/in/james-adewara) · [Linktree](https://linktr.ee/jamesadewara) · [Medium](https://medium.com/@jamesadewara1)

</div>
