# devfest-node-demo

Tiny Express app for the DevFest Ado-Ekiti 2026 session "Taking your Node.js app to Google Cloud".

- `GET /`      returns JSON with the instance ID and Cloud Run revision
- `GET /heavy` burns CPU and holds the request ~500 ms, so load tests trigger autoscaling

## Run locally
    npm install
    npm start        # http://localhost:8080

## Deploy (no Dockerfile)
1. Push this repo to GitHub.
2. Google Cloud Console > Cloud Run > Create service > Continuously deploy from a repository.
3. Set up Cloud Build, connect GitHub, pick the repo and branch.
4. Build type: Node.js via Google Cloud buildpacks.
5. Choose a region, allow unauthenticated invocations, Create.

## Autoscaling demo
Before the test, edit the service: Max instances = 5, Max concurrent requests per instance = 10.

    npx autocannon -c 100 -d 30 https://<your-service-url>/heavy

Watch Metrics > Instance count, and refresh `/` to see different instance IDs.
