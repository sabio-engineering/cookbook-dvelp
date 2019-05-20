# Kubectl

Kubectl is a command line interface for running commands against Kubernetes clusters. `kubectl` looks for a file named config in the $HOME/.kube directory.

## Clusters, Users & Contexts
Suppose you have two clusters, one for your development environment and one for your staging environment. In the `development` cluster, you work in a namespace called `app-dev`. In your `staging` cluster, developers work in the `app-staging` namespace. Access to both clusters requires authentication by certificate. 

Create or Edit the `config` file in the $HOME/.kube directory with the following content:

```
apiVersion: v1
kind: Config
preferences: {}

clusters:
- cluster:
  name: development
- cluster:
  name: staging

contexts:
- context:
  name: development-env
- context:
  name: staging-env

users:
- name: development-user
- name: staging-user
```

A configuration file describes clusters, users, and contexts. Your `config` file has the framework to describe two clusters, two users, and two contexts.  

Add cluster details to your configuration file:

```
kubectl config set-cluster development --server=https://fake.dev.server --certificate-authority=fake-ca-dev-file
kubectl config set-cluster staging --server=https://fake.stage.server --certificate-authority=fake-ca-stage-file
```

Add user details to your config file:

```
kubectl config set-credentials development-user --token=fake-dev-token
kubectl config set-credentials staging-user --token=fake-stage-token
```

Add context details to your config file:

```
kubectl config set-context development-env --cluster=development --namespace=app-dev --user=development-env
kubectl config set-context staging-env --cluster=staging --namespace=app-staging --user=staging-env
```

Now, you can open your `config` file to see the added configuration details or you can also use the `config view` command.

`$ kubectl config view`

```
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: fake-ca-dev-file
    server: https://fake.dev.server
  name: development
- cluster:
    certificate-authority-data: fake-ca-stage-file
    server: https://fake.stage.server
  name: staging
contexts:
- context:
    cluster: development
    namespace: app-dev
    user: development-env
  name: development-env
- context:
    cluster: staging
    namespace: app-staging
    user: staging-env
  name: staging-env
current-context: development-env
kind: Config
preferences: {}
users:
- name: development-user
  user:
    token: fake-dev-token
- name: staging-user
  user:
    token: fake-stage-token
```

Change through different contexts:

`$ kub config use-context staging-env`
(Switched to context "staging-env")

`$ kub config use-context development-env`
(Switched to context "development-env")
  
To see only the configuration associated with the current context, use the `--minify` flag.

`$ kubectl config view --minify`

Finally, to check a list of all available pods for your current cluster environment:

`$ kubectl get pod`