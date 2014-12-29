# Cavalcade

Node.js and Express app demonstrating message queue/worker architecture using Amazon SQS

### Prerequisites

You must have an AWS account and have created an SQS queue. See
[http://aws.amazon.com/sqs/](http://aws.amazon.com/sqs/) for more
information.

### Installation

Clone the git repo and install dependencies.

```
git clone 'https://github.com/brentertz/cavalcade.git'
cd cavalcade
npm install
```

### Configuration

Configuration options are stored in `config/default.js`. To override values,
add a gitignored `config/local.js` file.  Note that you can alternatively
override these values with ENV variables. See
[node-config](https://github.com/lorenwest/node-config) for more information.

### Start

```
PORT=3000 nf start
```

You can easily create multiple worker processes.

```
PORT=3000 nf start server=1,worker=2
```

Use the following commands to easily send sample messages to the queue.

```
curl -X POST -H "Content-Type: application/json" -d '{ "body": "hello" }' http://127.0.0.1:3000/api/messages
curl -X POST -H "Content-Type: application/json" -d '{ "type": "type-specific", "body": "hello" }' http://127.0.0.1:3000/api/messages
```
