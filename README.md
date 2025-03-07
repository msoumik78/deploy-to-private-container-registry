First build docker image locally and then push to docker hub:
=================================================
docker build -t msoumik78/express-app-soumik .
docker login
docker push  msoumik78/express-app-soumik


Steps to setup local K8 cluster :
==================================
1) First install docker daemon 

2) Use k3d which is feather weight and install it as per instructions mentioned here : https://k3d.io/stable/#install-script
   This installation should modify the kube config of kubectl which is normally stored at /User/msoumik/.kube/config file.  

3) Deploy mongodb server & client pods from local
   kubectl apply -f mongo.yaml
   kubectl apply -f redis.yaml
   kubectl apply -f mongo-client.yaml  

4) Check if deployments are fine
    kubectl get pods
    kubectl get services    

5) How to connect to mongod client pod from local :
    kubectl exec deployment/mongo-client -it -- /bin/bash

  Once within the mongo client pod, how can we use the bash command : 
    mongosh --host soumik-local-mongo --port 27017

6) In order to test in local with a NodePort, forward local port 8080 to Nodeport service 80
    kubectl port-forward service/soumik-express-svc 8080:80

7) Delete service
    kubectl delete service soumik-express-svc2 

8) How to change / switch namespaces :
    kubectl config set-context --current --namespace=my-redis

9) How to get all namespaces :
         kubectl get ns 

10) How to get all stateful sets:
    kubectl get statefulsets



Steps to setup us managed K8 cluster of DO:
===========================================

1) Setup cluster from control panel

2) Create container registry from control panel

3) Connect from local to k8 of DO ():
   For any kubectl command, use this argument : --kubeconfig=/Users/msoumik/Downloads/k8s-1-32-1-do-0-blr1-1741266206337-kubeconfig.yaml 

  So the kubectl command will be like :
   kubectl apply --kubeconfig=<DO's config file downloaded local path> apply -f mongo.yml

4) We need to upload images to private container registry and the DO k8 cluster should be able to download the image from the private container registry.
   For this, integration needs to be done at both ends from the control panel.
   Then a secret needs to be created using this command : 
   kubectl create secret generic do-registry --from-file=.dockerconfigjson=/Users/msoumik/Downloads/docker-config.json --type=kubernetes.io/dockerconfigjson

5) Then see if the github action of this repo works or not



